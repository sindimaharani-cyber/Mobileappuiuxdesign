<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumChannel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'division',
    ];

    public function messages()
    {
        return $this->hasMany(ForumMessage::class, 'channel_id');
    }
}
