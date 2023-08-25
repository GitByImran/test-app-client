import React, { useState } from 'react';
import { RxUpdate } from 'react-icons/rx'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsEyeSlash } from 'react-icons/bs'
import axios from 'axios';
import GetProducts from '../hooks/GetProducts';
import Swal from 'sweetalert2';
import UpdateProductModal from './UpdateProductModal';


const AllProducts = ({ showData, sortOrder }) => {

    const [products, isLoading, isError, refetch] = GetProducts();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleUpdateProduct = (item) => {
        setSelectedProduct(item);
        setShowModal(true);
    };

    const handleDeleteProduct = (productId) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'delete!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`${import.meta.env.VITE_URL}${productId}`);
                    // console.log(response)
                    refetch()
                    if (response.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                }
            })

            // console.log('deleted : ', productId)
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    if (isLoading) {
        return <div className='my-3'>Wait, data is laoding...</div>
    }

    if (isError) {
        return <div className='my-3'>Error occured when data was laoding</div>
    }

    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else if (sortOrder === 'desc') {
            return b.price - a.price;
        }
        return 0;
    });

    if (!showData) {
        return (
            <div className='my-3'>
                <button className='flex flex-row items-center gap-2'>Data is in hidden mode
                    <BsEyeSlash style={{ fontSize: "20px" }} />
                </button>
            </div>
        );
    }
    return (
        <div className='my-3'>
            <div>
                <table>
                    <thead>
                        <tr className='text-center'>
                            <th>Index</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {sortedProducts.map((item, index) =>
                        <tbody key={index}>
                            <tr className='text-center'>
                                <td className='px-5 py-2 border'>{index + 1}</td>
                                <td className='px-5 py-2 truncate border' style={{ maxWidth: "300px" }}>{item.productName}</td>
                                <td className='px-5 py-2 border'>{item.category}</td>
                                <td className='px-5 py-2 border'>{item.price}</td>
                                <td className='px-5 py-2 border'>{item.tax}</td>
                                <td className='px-5 py-2 border'>{item.availablity}</td>
                                <td className='flex gap-2 px-5 py-2 border'>
                                    {/**this is for delete */}  <button
                                        onClick={() => handleDeleteProduct(item._id)}
                                        style={{ background: '#c90202', color: '#fff', padding: "5px", borderRadius: '100%' }}>
                                        <FaRegTrashAlt />
                                    </button>
                                    {/**this is for delete */}   <button
                                        onClick={() => handleUpdateProduct(item)}
                                        style={{ background: '#02abc9', color: '#fff', padding: '5px', borderRadius: '100%', }}>
                                        <RxUpdate />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            {showModal && (
                <UpdateProductModal
                    product={selectedProduct}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedProduct(null);
                        refetch();
                    }}
                />
            )}
        </div>
    );
};

export default AllProducts;
