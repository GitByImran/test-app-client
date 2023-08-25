import React, { useState } from 'react';

const Actions = ({ toggleData, showData, sortOrder, setSortOrder }) => {

    const handleRadioChange = (event) => {
        // console.log(event.target.value);
        setSortOrder(event.target.value);
    };

    return (
        <div className='my-4'>
            <div className='flex flex-row gap-4'>
                <button
                    className='px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100'
                    onClick={toggleData}
                >
                    {showData ? 'Hide data' : 'Show data'}
                </button>
            </div>
            <div className='mt-4'>
                <p className='mb-2 font-semibold'>Sort Order by price :</p>
                <label className='inline-flex items-center'>
                    <input
                        type='radio'
                        value='normal'
                        checked={sortOrder === 'normal'}
                        onChange={handleRadioChange}
                    />
                    <span className='ml-2'>Without sorting</span>
                </label>
                <br />
                <label className='inline-flex items-center'>
                    <input
                        type='radio'
                        value='asc'
                        checked={sortOrder === 'asc'}
                        onChange={handleRadioChange}
                    />
                    <span className='ml-2'>Low to High</span>
                </label>
                <br />
                <label className='inline-flex items-center'>
                    <input
                        type='radio'
                        value='desc'
                        checked={sortOrder === 'desc'}
                        onChange={handleRadioChange}
                    />
                    <span className='ml-2'>High to Low</span>
                </label>
            </div>
        </div>
    );
};

export default Actions;