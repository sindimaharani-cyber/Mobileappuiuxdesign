<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'amount',
        'description',
        'date',
        'activity_id',
        'created_by',
        'receipt_file',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
