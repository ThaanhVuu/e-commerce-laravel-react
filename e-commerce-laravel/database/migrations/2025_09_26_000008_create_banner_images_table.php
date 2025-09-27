<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('banner_images', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('name', 150);
            $table->text('img_url')->nullable();
            $table->string('status', 10)
                ->check("status IN ('ACTIVE','INACTIVE')");
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('banner_images');
    }
};
