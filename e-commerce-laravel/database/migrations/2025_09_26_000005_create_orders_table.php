<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('profile_id');
            $table->string('status', 20)->default('PENDING')
                ->check("status IN ('PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED')");
            $table->decimal('total_amount', 12, 2)->nullable();
            $table->text('shipping_address')->nullable();
            $table->string('gender', 10)->nullable()
                ->check("gender IN ('MALE','FEMALE','OTHER')");
            $table->date('dob')->nullable();
            $table->timestamps();

            $table->foreign('profile_id')->references('id')->on('profiles')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
