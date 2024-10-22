<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FishingController extends Controller
{
    public function fish(Request $request)
    {
        $gear = $request->input('gear'); // Pancing yang dipilih (small, medium, big)
        $bait = $request->input('bait'); // Array tipe umpan yang dibeli
        $gold = 100;

        switch ($gear) {
            case 'small':
                $gold -= 5;
                break;
            case 'medium':
                $gold -= 10;
                break;
            case 'big':
                $gold -= 15;
                break;
        }

        foreach ($bait as $baitType) {
            switch ($baitType) {
                case 'red':
                    $gold -= 1;
                    break;
                case 'blue':
                    $gold -= 2;
                    break;
                case 'green':
                    $gold -= 3;
                    break;
            }
        }

        $forecast = [
            'small' => rand(5, 10),
            'medium' => rand(3, 7),
            'large' => rand(2, 5),
            'color_distribution' => [
                'red' => rand(25, 35),
                'blue' => rand(35, 45),
                'green' => 100 - (rand(25, 35) + rand(35, 45))
            ]
        ];

        $fishCaught = [];
        $totalGoldEarned = 0;

        foreach ($bait as $baitType) {
            $fishSize = $this->getFishSizeBasedOnGear($gear, $forecast);
            $fish = $this->generateFish($baitType, $fishSize);
            $fishCaught[] = $fish;
            $totalGoldEarned += $fish['price'];
        }

        $newGold = $gold + $totalGoldEarned;

        if ($newGold > 100) {
            $gameStatus = 'win';
        } elseif ($newGold < 100) {
            $gameStatus = 'lose';
        } else {
            $gameStatus = 'tie';
        }

        \Log::info('Fish caught:', $fishCaught);
        return response()->json([
            'fishCaught' => $fishCaught,
            'newGold' => $newGold,
            'gameStatus' => $gameStatus
        ]);


    }

    private function getFishSizeBasedOnGear($gear, $forecast)
    {
        if ($gear === 'small') return 'small';
        if ($gear === 'medium') return 'medium';
        return 'large';
    }

    private function generateFish($baitType, $fishSize)
    {
        \Log::info("Bait Type: $baitType, Fish Size: $fishSize");


        $prices = [
            'red' => ['small' => rand(1, 5), 'medium' => rand(5, 10), 'large' => rand(10, 15)],
            'blue' => ['small' => rand(3, 5), 'medium' => rand(8, 10), 'large' => rand(13, 15)],
            'green' => ['small' => 5, 'medium' => 10, 'large' => 15]
        ];

        $price = $prices[$baitType][$fishSize];

        return [
            'color' => $baitType,
            'size' => $fishSize,
            'price' => $price
        ];
    }

}
