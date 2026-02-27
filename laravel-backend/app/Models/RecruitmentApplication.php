<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruitment_id',
        'name',
        'nim',
        'angkatan',
        'email',
        'phone',
        'division',
        'motivation',
        'status',
    ];

    public function recruitment()
    {
        return $this->belongsTo(Recruitment::class);
    }
}
