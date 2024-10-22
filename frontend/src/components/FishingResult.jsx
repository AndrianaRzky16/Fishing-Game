import React from 'react';

const FishResults = ({ fishResult }) => {
    if (!fishResult || fishResult.length === 0) { 
        return <p className="text-gray-600">Tidak ada ikan yang ditangkap.</p>;
    }

    console.log('Fish result received in FishResults component:', fishResult);

    return (
        <div className="mt-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Hasil Tangkap Ikan</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                {fishResult.map((fish, index) => (
                    <div key={index} className="border-b last:border-none py-2 flex justify-between items-center">
                        <span className="text-lg text-gray-700">Warna: {fish.color}</span>
                        <br />
                        <span className="text-blue-500 font-semibold">Size: {fish.size}</span>
                        <br />
                        <span className="text-blue-500 font-semibold">Price: {fish.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FishResults;
