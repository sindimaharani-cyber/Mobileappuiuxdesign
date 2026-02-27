<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruitment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'period',
        'status',
        'quota',
        'deadline',
        'description',
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    public function applications()
    {
        return $this->hasMany(RecruitmentApplication::class);
    }
}
