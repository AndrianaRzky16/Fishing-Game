import React, { useState, useEffect } from 'react';
import FishingGearSelector from './components/FishingGearSelector.jsx';
import BaitSelector from './components/BaitSelection.jsx';
import DaySummary from './components/DaySummary.jsx';
import GameStatus from './components/GameStatus.jsx';
import FishResult from './components/FishingResult.jsx'; // Import the FishResult correctly
import './App.css';

const App = () => {
    const [gold, setGold] = useState(100);
    const [bait, setBait] = useState('');
    const [gear, setGear] = useState('');
    const [forecast, setForecast] = useState(null);
    const [gameStatus, setGameStatus] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [fishResult, setFishResult] = useState(null);
    const [hasFished, setHasFished] = useState(false); 

    useEffect(() => {
        const fetchForecast = async () => {
            const response = await fetch('http://localhost:8000/api/fish');
            const data = await response.json();
            setForecast(data);
        };
        fetchForecast();
    }, []);

   const handleFishing = async () => {
    console.log('Gear selected:', gear);
    console.log('Bait selected:', bait);

    if (!gear) {
        alert('Silakan pilih pancing terlebih dahulu!');
        return;
    }

    if (bait.length === 0) {
        alert('Silakan beli umpan terlebih dahulu!');
        return;
    }

    const response = await fetch('http://localhost:8000/api/fish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gear, bait }),
    });

    const data = await response.json();
    console.log('Response data:', data);

    const newGold = data.newGold;
    setGold(newGold);

    setGameStatus(data.gameStatus);
    setFishResult(data.fishCaught);
    setGameOver(true);
    setHasFished(true);

    switch (data.gameStatus) {
        case 'win':
            alert('You win!');
            break;
        case 'lose':
            alert('You lose!');
            break;
        case 'tie':
            alert('It\'s a tie!');
            break;
        default:
            alert('Unexpected game status');
            break;
    }
};

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Permainan Memancing</h1>
            <GameStatus gold={gold} />
            <div className="flex space-x-6 my-4">
                <FishingGearSelector gear={gear} setGear={setGear} gold={gold} setGold={setGold} hasFished={hasFished} />
                <BaitSelector bait={bait} setBait={setBait} gold={gold} setGold={setGold} hasFished={hasFished} />
            </div>
            
            {!fishResult && (
                <button 
                    onClick={handleFishing}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Tampilkan Hasil Memancing
                </button>
            )}
            
            {forecast && <DaySummary forecast={forecast} />}
            
            {fishResult && <FishResult fishResult={fishResult} />}

            {gameOver && <h2>Game Over! Refresh to play again.</h2>}
        </div>
    );
};

export default App;
