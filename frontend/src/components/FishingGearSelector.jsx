import React from 'react';

const FishingGearSelector = ({ gear, setGear, gold, setGold, hasFished }) => {
    const selectGear = (type, price) => {
        if (gear) {
            alert('Anda sudah memilih pancing. Tidak bisa memilih lagi.');
            return;  
        }

        if (gold >= price) {
            setGear(type);
            setGold(gold - price);
        } else {
            alert('Emas tidak cukup untuk membeli pancing ini.');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pilih Pancing:</h3>
            <div className="space-y-2">
                <button 
                    onClick={() => selectGear('small', 5)} 
                    className={`bg-blue-300 text-white px-3 py-2 rounded-md hover:bg-blue-400 ${gear ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={gear || hasFished}
                >
                    Pancing Small - 5 emas
                </button>
                <button 
                    onClick={() => selectGear('medium', 10)} 
                    className={`bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 ${gear ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={gear || hasFished}
                >
                    Pancing Medium - 10 emas
                </button>
                <button 
                    onClick={() => selectGear('large', 15)} 
                    className={`bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-800 ${gear ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={gear || hasFished}
                >
                    Pancing Big - 15 emas
                </button>
            </div>
            <p className="mt-4">Pancing yang dipilih: {gear || 'Belum memilih pancing'}</p>
        </div>
    );
};

export default FishingGearSelector;
