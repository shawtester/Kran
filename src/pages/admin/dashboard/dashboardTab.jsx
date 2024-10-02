import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillDelete } from 'react-icons/ai';







function DashboardTab() {
    const context = useContext(myContext);
    const { mode, product, deleteProduct, edithandle,order,user} = context;
    const navigate = useNavigate();

    const addProduct = () => {
        navigate('/addproduct');
    };
    
    const updateProductHandler = (item) => {
        navigate('/updateproduct', { state: { product: item } });
      };
  
    return (
        <div className="container mx-auto">
            <Tabs defaultIndex={0} className="mb-10">
                <TabList className="md:flex md:space-x-8 bg-gray-100 text-center gap-4 md:justify-center">
                    <Tab>
                        <button type="button" className="font-medium border-b-2 border-purple-500 text-purple-500 rounded-lg text-xl px-5 py-1.5 bg-gray-200 hover:shadow-md">
                            <div className="flex gap-2 items-center">
                                <MdOutlineProductionQuantityLimits /> Products
                            </div>
                        </button>
                    </Tab>
                    <Tab>
                        <button type="button" className="font-medium border-b-2 border-pink-500 text-pink-500 rounded-lg text-xl px-5 py-1.5 bg-gray-200 hover:shadow-md">
                            <div className="flex gap-2 items-center">
                                <AiFillShopping /> Orders
                            </div>
                        </button>
                    </Tab>
                    <Tab>
                        <button type="button" className="font-medium border-b-2 border-green-500 text-green-500 rounded-lg text-xl px-5 py-1.5 bg-gray-200 hover:shadow-md">
                            <div className="flex gap-2 items-center">
                                <FaUser /> Users
                            </div>
                        </button>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="px-4 md:px-0 mb-16">
                        <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Product Details
                        </h1>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={addProduct}
                                className="focus:outline-none text-white bg-pink-600 border hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                            >
                                <div className="flex gap-2 items-center">
                                    Add Product <FaCartPlus size={20} />
                                </div>
                            </button>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs border text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                    <tr>
                                        <th className="px-6 py-3">S.No</th>
                                        
                                        <th className="px-6 py-3">Image</th>
                                        <th className="px-6 py-3">Title</th>
                                        <th className="px-6 py-3">Price 1</th>
                                        <th className="px-6 py-3">Price 2</th>
                                        <th className="px-6 py-3">Weight 1</th>
                                        <th className="px-6 py-3">Weight 2</th>
                                        <th className="px-6 py-3">Category</th>
                                        <th className="px-6 py-3">Flavour 1</th>
                                        <th className="px-6 py-3">Flavour 2</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Action</th>
                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((item, index) => {
                                        const { title, price1, price2, weight1, weight2, imageUrls, category, date, flavour1, flavour2 } = item;
                                        return (
                                            <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }} key={index}>
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <th className="px-6 py-4 font-medium">
                                                    <img className="w-16" src={imageUrls[0]} alt="Product" />
                                                </th>
                                                <td className="px-6 py-4">{title}</td>
                                                <td className="px-6 py-4">₹{price1}</td>
                                                <td className="px-6 py-4">₹{price2}</td>
                                                <td className="px-6 py-4">{weight1}</td>
                                                <td className="px-6 py-4">{weight2}</td>
                                                <td className="px-6 py-4">{category}</td>
                                                <td className="px-6 py-4">{flavour1}</td>
                                                <td className="px-6 py-4">{flavour2}</td>
                                                <td className="px-6 py-4">{date}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <div onClick={() => deleteProduct(item)} className="cursor-pointer text-black">
                                                            <AiFillDelete className="w-6 h-6" />
                                                        </div>
                                                        <Link to={'/updateProduct'}>
                                                            <div onClick={()=>edithandle(item)

} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </div>
                                                            </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
             
                    {/* Implement order details here */}
                    <TabPanel>
                    <div className="relative overflow-x-auto mb-16">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
                               
                                {order.map((allorder, index) => {
                                    return (
                                        <div className="overflow-x-scroll">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                            <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <tr>
                                               

                                                    <th scope="col" className="px-6 py-3">
                                                        S.No.
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Payment Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Title
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                  
                                                    <th scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Address
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Pincode
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Phone Number
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                   
                                                    <th scope="col" className="px-6 py-3">
    <Link 
        to="/ordertracking0102" 
        className="text-blue-500 hover:underline"
    >
        Status
    </Link>
</th>

                                                  
                                                   
                                                </tr>
                                            </thead>
                                            {allorder.cartItems.map((item, index) => {
                                                const {title,description,category,imageUrl,price} = item;
                                                console.log(item)
                                                return (
                                                    <tbody>
                                                        <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {index + 1}.
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.paymentId}
                                                            </td>
                                                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                                <img className='w-16' src={imageUrl} alt="img" />
                                                            </th>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {title}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                ₹{price}
                                                            </td>
                                                         

                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                               {allorder.addressInfo.name}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.address}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.pincode}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.phoneNumber}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.email}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.date}
                                                            </td>
                                                        
                                 
                                
                                {/* Dropdown to Update Status */}
                             


                                                        </tr>

                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                        </div>
                                    )
                                })}
                                </div>

                            
                        
                  </TabPanel>
                  <TabPanel>
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Uid
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    {user.map((item, index) => {
                                        const {name,uid,email,date} = item;
                                        return (
                                            <tbody>
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {name}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {uid}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {date}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}

                                </table>
                            </div>
                        </TabPanel>
            </Tabs>
        </div>
    );
}

export default DashboardTab;
