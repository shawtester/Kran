import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig"; // Ensure correct import path
import Layout from '../../components/layout/Layout';

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const getOrderData = async (userId) => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "orders"), where("userid", "==", userId));
      const result = await getDocs(q);
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.user && storedUser.user.uid) {
      const userId = storedUser.user.uid;
      setUserId(userId);

      getOrderData(userId);
    } else {
      console.log("User not logged in or ID not found in local storage");
    }
  }, []);

  // Status Step Mapping
  const getStatusIndex = (status) => {
    const statusMap = {
      "Processing": 1,
      "Shipped": 2,
      "Delivered": 3,
    };
    return statusMap[status] || 1; // Default to 'Processing'
  };

  const renderStatusSteps = (status) => {
    const currentStep = getStatusIndex(status);
    
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`relative flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
            <span className="text-white font-bold">1</span>
          </div>
          <span className="ml-2 text-gray-700">Processing</span>
        </div>

        <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div className="flex items-center">
          <div className={`relative flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}>
            <span className="text-white font-bold">2</span>
          </div>
          <span className="ml-2 text-gray-700">Shipped</span>
        </div>

        <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div className="flex items-center">
          <div className={`relative flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}>
            <span className="text-white font-bold">3</span>
          </div>
          <span className="ml-2 text-gray-700">Delivered</span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : (
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Orders</h2>
          {orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order, orderIndex) => (
                <div key={orderIndex} className="bg-white shadow-md rounded-lg p-6">
                  {/* Address Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
                    <p className="text-gray-600"><strong>Name:</strong> {order.addressInfo.name}</p>
                    <p className="text-gray-600"><strong>Address:</strong> {order.addressInfo.address}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {order.addressInfo.phoneNumber}</p>
                    <p className="text-gray-600"><strong>Pincode:</strong> {order.addressInfo.pincode}</p>
                  </div>

                  {/* Order Status Progress */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Status</h3>
                    {renderStatusSteps(order.status)}
                  </div>

                  {/* Cart Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Details</h3>
                    {order.cartItems.length > 0 ? (
                      <div className="space-y-6">
                        {order.cartItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                              <p className="text-gray-800 font-semibold">{item.title}</p>
                              <p className="text-gray-600"><strong>Flavour:</strong> {item.flavour}</p>
                              <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                              <p className="text-gray-600"><strong>Price:</strong> ${item.price}</p>
                              <p className="text-gray-600"><strong>Weight:</strong> {item.weight} kg</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No items found in this order.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found for this user.</p>
          )}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default OrdersComponent;
