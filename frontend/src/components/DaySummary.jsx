import React from 'react';

const DaySummary = ({ forecast }) => {
    return (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ramalan Hari Ini:</h3>
            <p className="text-sm">
                {forecast.small} ikan kecil, {forecast.medium} ikan sedang, {forecast.large} ikan besar.
            </p>
            <p className="text-sm">
                {forecast.red} ikan Red, {forecast.blue} ikan biru, {forecast.green} ikan hijau.
            </p>
        </div>
    );
};

export default DaySummary;
