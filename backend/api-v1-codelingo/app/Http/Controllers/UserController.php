<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLearningPath;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    private const LEAGUE_EXP_THRESHOLDS = [
        'bronze' => 0,
        'silver' => 1000,
        'gold' => 2000,
        'emerald' => 5000,
        'diamond' => 10000,
    ];

    public function getUserRank(Request $request)
    {
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

        $currentExp = $user->exp;
        $currentLeague = $user->league;

        $league = $this->getLeagueByExp($currentExp);

        $rank = $this->getUserRankByLeague($currentLeague, $currentExp);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Rank user successfully retrieved',
            'data' => [
                'league' => $league,
                'rank' => $rank,
                'exp' => $currentExp,
            ],
        ]);
    }

    public function getUserXP(Request $request)
    {
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

        return response()->json([
            'statusCode' => 200,
            'message' => 'User XP successfully retrieved',
            'data' => [
                'exp' => $user->exp,
            ],
        ]);
    }

    private function getLeagueByExp(int $exp): string
    {
        foreach (self::LEAGUE_EXP_THRESHOLDS as $league => $threshold) {
            if ($exp >= $threshold) {
                $currentLeague = $league;
            } else {
                break;
            }
        }

        return $currentLeague ?? 'bronze';
    }

    private function getUserRankByLeague(string $league, int $exp): int
    {
        $users = User::where('league', $league)->orderBy('exp', 'desc')->get();

        $rank =
            $users->search(function ($user) use ($exp) {
                return $user->exp == $exp;
            }) + 1;

        return $rank ?? 1;
    }

    public function getUserAchievements()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(
                [
                    'statusCode' => 401,
                    'message' => 'Unauthorized',
                ],
                Response::HTTP_UNAUTHORIZED,
            );
        }

        $completedLearningPaths = UserLearningPath::with(['learningPath'])
            ->where('user_id', $user->id)
            ->get()
            ->filter(function ($userLearningPath) {
                $completedMaterials = $userLearningPath->userMaterials->where('is_completed', true)->count();
                $totalMaterials = $userLearningPath->userMaterials->count();

                $completedQuizzes = $userLearningPath->userQuizzes->where('is_completed', true)->count();
                $totalQuizzes = $userLearningPath->userQuizzes->count();

                $totalCompleted = $completedMaterials + $completedQuizzes;
                $totalItems = $totalMaterials + $totalQuizzes;

                $progress_status = $totalItems > 0 ? ($totalCompleted / $totalItems) * 100 : 0;

                return round($progress_status, 2) === 100.0;
            })
            ->values(); 

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'User achievements successfully retrieved',
                'data' => $completedLearningPaths,
            ],
            Response::HTTP_OK,
        );
    }
}
