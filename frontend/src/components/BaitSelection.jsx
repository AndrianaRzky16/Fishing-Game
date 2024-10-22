import React from 'react';

const BaitSelector = ({ bait, setBait, gold, setGold, hasFished }) => {
    const buyBait = (type, price) => {
        if (bait) {
            alert('Anda sudah memilih umpan. Tidak bisa memilih lagi.');
            return;  
        }

        if (gold >= price) {
            setBait([type]);
            setGold(gold - price);
        } else {
            alert('Emas tidak cukup!');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Beli Umpan:</h3>
            <div className="space-y-2">
                <button
                    onClick={() => buyBait('red', 1)}
                    className={`bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 ${bait ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={bait || hasFished}
                >
                    Umpan Red - 1 emas
                </button>
                <button
                    onClick={() => buyBait('blue', 2)}
                    className={`bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 ${bait ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={bait || hasFished}
                >
                    Umpan Blue - 2 emas
                </button>
                <button
                    onClick={() => buyBait('green', 3)}
                    className={`bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 ${bait ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={bait || hasFished}
                >
                    Umpan Green - 3 emas
                </button>
            </div>
            <p className="mt-4">Umpan yang dipilih: {bait || 'Tidak ada umpan yang dipilih'}</p>
        </div>
    );
};

export default BaitSelector;
