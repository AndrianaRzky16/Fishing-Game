import React from 'react';

const GameStatus = ({ gold }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-xs text-center">
            <h3 className="text-lg font-semibold">Status Pemain:</h3>
            <p className="text-gray-700">Emas: {gold}</p>
        </div>
    );
};

export default GameStatus;
