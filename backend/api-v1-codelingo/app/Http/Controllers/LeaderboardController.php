<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    private const LEAGUE_EXP_THRESHOLDS = [
        'bronze' => 0,
        'silver' => 1000,
        'gold' => 2000,
        'emerald' => 5000,
        'diamond' => 10000,
    ];

    public function getTopUsers()
    {
        // Mengambil 10 user dengan exp tertinggi
        $topUsers = User::orderBy('exp', 'desc')->take(10)->get();

        if ($topUsers->isNotEmpty()) {
            return response()->json([
                'statusCode' => 200,
                'message' => '10 user dengan exp tertinggi ditemukan',
                'data' => $topUsers,
            ]);
        }

        return response()->json([
            'statusCode' => 404,
            'message' => 'Tidak ada user ditemukan',
            'data' => [],
        ]);
    }

    // Mendapatkan pengguna dalam liga Bronze
    public function getBronzeUsers()
    {
        return $this->getUsersByLeague('bronze');
    }

    public function getSilverUsers()
    {
        return $this->getUsersByLeague('silver');
    }

    public function getGoldUsers()
    {
        return $this->getUsersByLeague('gold');
    }

    public function getEmeraldUsers()
    {
        return $this->getUsersByLeague('emerald');
    }

    public function getDiamondUsers()
    {
        return $this->getUsersByLeague('diamond');
    }

    private function getUsersByLeague(string $league)
    {
        $users = User::where('league', $league)->orderBy('exp', 'desc')->take(10)->get();

        if ($users->isNotEmpty()) {
            return response()->json([
                'statusCode' => 200,
                'message' => "10 user dengan liga $league ditemukan",
                'data' => $users,
            ]);
        }

        return response()->json([
            'statusCode' => 404,
            'message' => "Tidak ada user dalam liga $league ditemukan",
            'data' => [],
        ]);
    }

    public function getNextLeagueProgress(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user();

        if (!$user) {
            return response()->json(
                [
                    'statusCode' => 401,
                    'message' => 'User not authenticated',
                ],
                401,
            );
        }

        $currentLeague = $user->league;
        $currentExp = $user->exp;

        $thresholds = self::LEAGUE_EXP_THRESHOLDS;

        // Cek apakah user sudah berada di liga tertinggi
        if ($currentLeague === 'diamond') {
            return response()->json([
                'statusCode' => 200,
                'message' => 'User sudah berada di liga tertinggi (Diamond)',
                'progress' => 100,
            ]);
        }

        // Dapatkan ambang batas liga saat ini dan berikutnya
        $currentThreshold = $thresholds[$currentLeague] ?? 0;
        $nextLeague = $this->getNextLeague($currentLeague);
        $nextThreshold = $thresholds[$nextLeague] ?? 0;

        // Hitung progres dalam persen
        $progress = (($currentExp - $currentThreshold) / ($nextThreshold - $currentThreshold)) * 100;
        $progress = round($progress, 2); // Pembulatan 2 desimal

        return response()->json([
            'statusCode' => 200,
            'message' => "Progress menuju liga $nextLeague",
            'progress' => $progress > 100 ? 100 : $progress, // Maksimal 100%
            'current_league' => $currentLeague,
            'next_league' => $nextLeague,
        ]);
    }

    private function getNextLeague(string $currentLeague): string
    {
        $leagueOrder = array_keys(self::LEAGUE_EXP_THRESHOLDS);
        $currentIndex = array_search($currentLeague, $leagueOrder);

        return $leagueOrder[$currentIndex + 1] ?? 'diamond';
    }
}
