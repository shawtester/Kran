import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function Cart() {
  const Navigate = useNavigate();
  const context = useContext(myContext);
  const { mode } = context;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20; // Static shipping for example

  // Sync cartItems with localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    // Validation
    if (name.trim() === "" || address.trim() === "" || pincode.trim() === "" || phoneNumber.trim() === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
      paymentId: "", // This will be filled after payment
      status: "Processing",
    };

    // Integrate PhonePe payment
    const options = {
      amount: (totalPrice + shipping) * 100, // Amount in paise
      currency: "INR",
      order_id: `order_${Date.now()}`, // Unique Order ID
      receipt: `receipt_${Date.now()}`,
      callback_url: "https://your-callback-url.com", // Your callback URL here
    };

    try {
      const response = await fetch("https://your-server-url.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      const orderData = await response.json();
      if (orderData && orderData.orderId) {
        const paymentOptions = {
          order_id: orderData.orderId,
          merchantId: "your-merchant-id", // Your Merchant ID
          callback_url: "https://your-callback-url.com", // Your callback URL here
          key: "your-phonepe-key", // Your PhonePe Key
          theme: {
            color: "#3399cc",
          },
          handler: function (response) {
            const paymentId = response.paymentId;

            orderInfo.paymentId = paymentId;
            addDoc(collection(fireDB, "orders"), orderInfo)
              .then(() => {
                toast.success('Payment Successful');
                Navigate('/order');
              })
              .catch((error) => {
                console.error("Error storing order in Firebase:", error);
                toast.error("Error storing order details.");
              });
          },
        };

        // Trigger PhonePe Payment
        const pay = new window.PhonePe(paymentOptions);
        pay.open();
      } else {
        toast.error("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Payment process failed.");
    }
  };

  return (
    <Layout>
      <div className={`h-screen pt-5 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className={`mb-6 rounded-lg border drop-shadow-xl p-6 sm:flex sm:justify-start ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <img src={item.imageUrls[0] || 'https://dummyimage.com/400x400'} alt={item.title} className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="mt-1 text-xs font-semibold">₹{item.price}</p>
                      <p>Weight: {item.weight} kg</p>
                      <p>Flavour: {item.flavour}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center">
                        <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
                        <p className="px-2">{item.quantity}</p>
                        <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-4 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className={`mt-6 h-full rounded-lg border p-6 shadow-md md:mt-0 md:w-1/3 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="mt-4">
              <p className="font-semibold">Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-lg border p-2"
                placeholder="Enter your name"
              />
              <p className="font-semibold mt-4">Address</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full rounded-lg border p-2"
                placeholder="Enter your address"
              />
              <p className="font-semibold mt-4">Pincode</p>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 block w-full rounded-lg border p-2"
                placeholder="Enter your pincode"
              />
              <p className="font-semibold mt-4">Phone Number</p>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full rounded-lg border p-2"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between font-bold">
              <p>Total</p>
              <p>₹{totalPrice + shipping}</p>
            </div>
            <button
              onClick={buyNow}
              className={`mt-6 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cartItems.length === 0}
            >
              Checkout with PhonePe
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
