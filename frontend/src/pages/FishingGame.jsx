import React, { useState } from 'react';

const FishingGame = ({ gold, setGold, gameStatus, setGameStatus, gameOver, setGameOver, setFishResult }) => {
    const handleFishing = async () => {
        const response = await fetch('http://localhost:8000/api/fish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gear, bait }), // Replace with actual gear and bait state
        });

        const data = await response.json();
        console.log(data); // Log data for debugging

        if (data.fishCaught && Array.isArray(data.fishCaught) && data.fishCaught.length > 0) {
            setFishResult(data.fishCaught);
        }

        const newGold = data.newGold;
        setGold(newGold);
        setBait([]); // Clear bait after fishing

        setGameStatus(data.gameStatus);
        setGameOver(true); // End the game regardless of win/lose/tie

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
        <div>
            <button onClick={handleFishing} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Fish
            </button>
            {gameOver && <div className="game-status">Game Status: {gameStatus}</div>}
        </div>
    );
};

export default FishingGame;
