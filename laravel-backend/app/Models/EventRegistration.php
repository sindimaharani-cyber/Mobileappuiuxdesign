<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'user_id',
        'status',
        'registered_at',
        'attended_at',
        'qr_code',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
        'attended_at' => 'datetime',
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
