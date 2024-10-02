import React, { useState, useContext, useEffect } from 'react';
import myContext from '../../../context/data/myContext';
import { storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [imageUploaded, setImageUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        if (state && state.product) {
            setProducts(state.product);
            setFlavors(state.product.flavors || []);
        }
    }, [state, setProducts]);

    const handleInputChange = (e) => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value || ""
        });
    };

    // Handle image upload for a specific index (for replacing images)
    const handleImageUpload = (file, index) => {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress((prevProgress) => ({
                    ...prevProgress,
                    [index]: progress
                }));
            },
            (error) => {
                setErrorMessage("Image upload failed. Please try again.");
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Replace the image URL at the specific index
                    const updatedImageUrls = [...products.imageUrls];
                    updatedImageUrls[index] = downloadURL;

                    setProducts({ ...products, imageUrls: updatedImageUrls });
                    setImageUploaded(true);
                    setUploading(false);
                    setErrorMessage('Image successfully uploaded!');
                });
            }
        );
    };

    const handleUpdateProduct = () => {
        console.log('Products:', products);

        if (!products.title || !products.price1 || !products.category || !products.description || !products.weight1) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (!products.imageUrls || products.imageUrls.length === 0) {
            setErrorMessage("Please provide at least one image.");
            return;
        }

        const updatedProduct = { ...products, flavors };

        updateProduct(updatedProduct).then(() => {
            setSuccessMessage('Product successfully updated!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        }).catch((error) => {
            console.error('Error updating product:', error);
            setErrorMessage('Failed to update product.');
        });
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 px-6 py-8 rounded-xl w-full max-w-lg shadow-lg'>
                <h1 className='text-center text-white text-2xl mb-6 font-semibold'>Update Product</h1>
                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
                <form className='space-y-4'>
                    <div>
                        <input
                            type="text"
                            name='title'
                            onChange={handleInputChange}
                            value={products.title || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product Name'
                        />
                    </div>

                    {/* Other product fields */}
                    <div>
                        <input
                            type="text"
                            name='price1'
                            onChange={handleInputChange}
                            value={products.price1 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product price 1'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='price2'
                            onChange={handleInputChange}
                            value={products.price2 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product price 1'
                        />
                    </div>
                    
                    
                    {/* Display existing images with option to replace */}
                    <div className='mt-4'>
                        <h2 className='text-white font-semibold mb-2'>Product Images</h2>
                        {products.imageUrls && products.imageUrls.map((imageUrl, index) => (
                            <div key={index} className='mb-4'>
                                <img src={imageUrl} alt={`Product ${index + 1}`} className='w-full h-40 object-cover rounded-md mb-2' />
                                <input
                                    type="file"
                                    onChange={(e) => handleImageUpload(e.target.files[0], index)}
                                    className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                                />
                                {uploading && uploadProgress[index] && (
                                    <div className="text-yellow-500 mt-2">Uploading image {index + 1}... {uploadProgress[index].toFixed(0)}%</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleImageUpload(e.target.files[0])} // Handle multiple uploads if needed
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                        />
                    </div>
                    <input
type="text" // Using text type to allow for number + unit
name="weight1"
onChange={handleInputChange}
value={products.weight1 || ""}
className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
placeholder="e.g. 100g, 1kg" // Give users an example of expected input
/>

           <input
type="text" // Using text type to allow for number + unit
name="weight2"
onChange={handleInputChange}
value={products.weight2 || ""}
className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
placeholder="e.g. 100g, 1kg" // Give users an example of expected input
/>

<input
  type="text"
  name='category'
  onChange={handleInputChange}
  value={products.category || ""}
  className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
  placeholder='Product category'
/>
</div>
<div>
<textarea
  cols="30"
  rows="5"
  name='description'
  onChange={handleInputChange}
  value={products.description || ""}
  className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
  placeholder='Product Description'>
</textarea>
</div>
                    <div>
<input
  type="text"
  name='flavour1'
  onChange={handleInputChange}
  value={products.flavour1 || ""}
  className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
  placeholder='Product flavour1'
/>
<input
  type="text"
  name='flavour2'
  onChange={handleInputChange}
  value={products.flavour2 || ""}
  className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
  placeholder='Product flavour2'
/>

</div>

                    {/* Add more images (optional) */}
                  

                    <button
                        type='button'
                        onClick={handleUpdateProduct}
                        className='bg-green-600 px-4 py-3 w-full rounded-lg text-white font-semibold'>
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
