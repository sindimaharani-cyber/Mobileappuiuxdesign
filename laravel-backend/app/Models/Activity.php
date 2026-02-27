<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'location',
        'status',
        'reminder',
        'documentation',
        'quota',
        'created_by',
    ];

    protected $casts = [
        'date' => 'date',
        'reminder' => 'boolean',
        'documentation' => 'array',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function financialTransactions()
    {
        return $this->hasMany(FinancialTransaction::class);
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
