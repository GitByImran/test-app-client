import React, { useState } from 'react';
import Actions from './components/Actions';
import AddProducts from './components/AddProducts';
import AllProducts from './components/AllProducts';
import './index.css'

const Product = () => {
    const [showData, setShowData] = useState(true);
    const [sortOrder, setSortOrder] = useState('normal');

    const handleToggleData = () => {
        setShowData(!showData);
    };

    return (
        <div className='container grid grid-cols-3 gap-4 px-4 mx-auto'>
            <div className='right-contents md:col-span-1'>
                <Actions
                    toggleData={handleToggleData}
                    showData={showData}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder} />
                <AddProducts />
            </div>
            <div className='col-span-3 overflow-auto sm:h-screen left-contents md:col-span-2'>
                <AllProducts
                    showData={showData}
                    sortOrder={sortOrder}
                />
            </div>
        </div>
    );
};

export default Product;
