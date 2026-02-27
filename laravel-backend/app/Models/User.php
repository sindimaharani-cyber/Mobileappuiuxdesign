<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nim',
        'name',
        'email',
        'password',
        'role',
        'division',
        'position',
        'angkatan',
        'phone',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships
    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class, 'created_by');
    }

    public function financialTransactions()
    {
        return $this->hasMany(FinancialTransaction::class, 'created_by');
    }

    public function jobdesks()
    {
        return $this->belongsToMany(Jobdesk::class, 'jobdesk_user');
    }

    public function createdJobdesks()
    {
        return $this->hasMany(Jobdesk::class, 'created_by');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function eventRegistrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    public function letters()
    {
        return $this->hasMany(Letter::class, 'created_by');
    }

    public function approvedLetters()
    {
        return $this->hasMany(Letter::class, 'approved_by');
    }

    public function forumMessages()
    {
        return $this->hasMany(ForumMessage::class);
    }
}
