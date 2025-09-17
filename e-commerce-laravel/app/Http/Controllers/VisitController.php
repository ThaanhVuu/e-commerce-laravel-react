<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VisitController extends Controller
{
    public function hit(Request $req)
    {
        $path = (string) $req->input('path', '/');
        $today = now()->toDateString();

        // Hash IP + UA để riêng tư nhưng vẫn phân biệt tương đối
        $ipHash = hash('sha256', $req->ip() ?? '0.0.0.0');
        $uaHash = hash('sha256', (string) $req->userAgent());

        // Chỉ chèn nếu hôm nay IP này chưa được tính cho path này
        $exists = DB::table('visits')->where([
            'path' => $path,
            'ip_hash' => $ipHash,
            'visit_date' => $today
        ])->exists();

        if (!$exists) {
            DB::table('visits')->insert([
                'path' => $path,
                'ip_hash' => $ipHash,
                'ua_hash' => $uaHash,
                'visit_date' => $today,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Tổng lượt (unique theo IP/ngày) và lượt hôm nay
        $total = DB::table('visits')->where('path', $path)->count();
        $todayCount = DB::table('visits')
            ->where(['path' => $path, 'visit_date' => $today])
            ->count();

        return response()->json([
            'path' => $path,
            'total' => $total,
            'today' => $todayCount,
            'date' => $today
        ]);
    }
}

