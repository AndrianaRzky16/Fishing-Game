<?php

use App\Http\Controllers\FishingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/fish', [FishingController::class, 'fish']);

