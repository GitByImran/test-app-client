import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProductModal = ({ product, onClose }) => {
    const [updatedData, setUpdatedData] = useState({
        productName: product.productName,
        category: product.category,
        price: product.price,
        tax: product.tax,
        availablity: product.availablity

    });

    const handleUpdate = async () => {
        try {
            const updatedFields = {};
            if (updatedData.productName !== product.productName) {
                updatedFields.productName = updatedData.productName;
            }
            if (updatedData.category !== product.category) {
                updatedFields.category = updatedData.category;
            }
            if (updatedData.price !== product.price) {
                updatedFields.price = updatedData.price;
            }
            if (updatedData.tax !== product.tax) {
                updatedFields.tax = updatedData.tax;
            }
            if (updatedData.availablity !== product.availablity) {
                updatedFields.availablity = updatedData.availablity;
            }

            const response = await axios.patch(`${import.meta.env.VITE_URL}${product._id}`, updatedFields);
            if (response.status === 200) {
                onClose();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Product data updated',
                    showConfirmButton: true,
                    // timer: 3000
                })
            }
        } catch (error) {
            // console.error('Error updating product:', error);
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Product data cannot be updated',
                showConfirmButton: true,
                // timer: 3000
            })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center text-center modal"
            style={{ height: "100%", width: "100%", background: "rgba(0,0,0,75%)" }}
        >
            <div className="p-5 bg-white rounded-lg modal-content">
                <div className='text-right'>
                    <span className="text-4xl font-bold text-black cursor-pointer close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <h2 className='my-5 text-2xl font-bold text-emerald-700'>Update Product</h2>
                <form>
                    <div className='flex flex-col items-start gap-3'>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input
                                className='px-2 mx-2 border'
                                type="text"
                                name="productName"
                                value={updatedData.productName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                className='px-2 mx-2 border'
                                type="number"
                                name="price"
                                value={updatedData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tax">Tax</label>
                            <input
                                className='px-2 mx-2 border'
                                type="number"
                                name="tax"
                                value={updatedData.tax}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                name="category"
                                id="category"
                                className="px-2 py-1 border"
                                value={updatedData.category}
                                onChange={handleChange}
                            >
                                <option value="watches">Watches</option>
                                <option value="cameras">Cameras</option>
                                <option value="electronics">Electronics</option>
                                <option value="smartphones">Smartphones</option>
                                <option value="books">Books</option>
                                <option value="outdoors">Outdoors</option>
                                <option value="toys">Toys</option>
                                <option value="crafts">Crafts</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="availablity">Availablity</label>
                            <select
                                name="availablity"
                                id="availablity"
                                className="px-2 py-1 border"
                                value={updatedData.availablity}
                                onChange={handleChange}
                            >
                                <option value="inStock">In Stock</option>
                                <option value="outOfStock">Out of Stock</option>
                            </select>
                        </div>

                        <button type="button" onClick={handleUpdate}
                            className='px-4 py-2 font-normal text-white bg-blue-500 rounded hover:bg-blue-700'
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
