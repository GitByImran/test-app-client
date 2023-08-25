import React, { useState } from 'react';
import GetProducts from '../hooks/GetProducts';
import { Toaster, toast } from 'react-hot-toast';

const AddProducts = () => {
    const [availablity, setAvailablity] = useState('');
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productTax, setProductTax] = useState(null);
    const [products, isLoading, isError, refetch] = GetProducts();

    const handleAvailablity = (selectedAvailablity) => {
        setAvailablity(selectedAvailablity);
    }

    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let productName = document.getElementById('productName').value;
        let productPrice = parseFloat(document.getElementById('productPrice').value);
        let productTax = parseFloat(document.getElementById('productTax').value);
        const newProduct = {
            productName,
            category,
            price: productPrice,
            tax: productTax,
            availablity
        };

        const res = await fetch(`${import.meta.env.VITE_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (res.status === 200) {
            refetch()
            console.log('product has been added')
            toast.success('Successful! Product has been added')
            setProductName('');
            setProductPrice('');
            setProductTax('');
            setCategory('');
            setAvailablity('');
        } else {
            console.log('failed to add product')
        }
    }

    return (
        <div className='my-5'>
            <h2 className='mb-2 font-semibold'>Add new product :</h2>
            <form className='p-4 my-4 border' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder='Enter the product name' value={productName} id='productName' className='px-2 py-1 border' style={{ width: "100%" }} />
                    <select name="category" id="category" className='px-2 py-1 border' value={category} onChange={(e) => handleCategory(e.target.value)}>
                        <option value="" disabled>Select category</option>
                        <option value="watches">Watches</option>
                        <option value="cameras">Cameras</option>
                        <option value="electronics">Electronics</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="books">Books</option>
                        <option value="outdoors">Outdoors</option>
                        <option value="toys">Toys</option>
                        <option value="crafts">Crafts</option>
                    </select>
                    <input type="number" placeholder='Enter the product price' value={productPrice} id='productPrice' className='px-2 py-1 border' style={{ width: "100%" }} />
                    <input type="number" placeholder='Enter the product tax' value={productTax} id='productTax' className='px-2 py-1 border' style={{ width: "100%" }} />
                    <select name="product" id="product" className='px-2 py-1 border' value={availablity} onChange={(e) => handleAvailablity(e.target.value)}>
                        <option value="" disabled>Select availablity</option>
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </div>
                <button className="px-4 py-2 my-4 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100">
                    Submit
                </button>
            </form>
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </div>
    );
};

export default AddProducts;