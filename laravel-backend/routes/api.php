<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\FinancialTransactionController;
use App\Http\Controllers\API\MemberController;
use App\Http\Controllers\API\JobdeskController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\EventRegistrationController;
use App\Http\Controllers\API\CertificateController;
use App\Http\Controllers\API\RecruitmentController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\API\LetterController;
use App\Http\Controllers\API\ForumController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Announcements
    Route::apiResource('announcements', AnnouncementController::class);
    Route::post('announcements/{id}/toggle-archive', [AnnouncementController::class, 'toggleArchive']);
    
    // Activities
    Route::apiResource('activities', ActivityController::class);
    Route::get('activities-statistics', [ActivityController::class, 'statistics']);
    
    // Financial Transactions
    Route::apiResource('financial-transactions', FinancialTransactionController::class);
    Route::get('financial-summary', [FinancialTransactionController::class, 'summary']);
    
    // Members
    Route::apiResource('members', MemberController::class);
    Route::get('members-statistics', [MemberController::class, 'statistics']);
    
    // Jobdesks
    Route::apiResource('jobdesks', JobdeskController::class);
    Route::post('jobdesks/{id}/update-status', [JobdeskController::class, 'updateStatus']);
    Route::post('jobdesks/{id}/assign-users', [JobdeskController::class, 'assignUsers']);
    
    // Notifications
    Route::apiResource('notifications', NotificationController::class);
    Route::post('notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
    Route::post('notifications/{id}/mark-read', [NotificationController::class, 'markAsRead']);
    
    // Event Registrations
    Route::apiResource('event-registrations', EventRegistrationController::class);
    Route::post('event-registrations/register', [EventRegistrationController::class, 'register']);
    Route::post('event-registrations/{id}/check-in', [EventRegistrationController::class, 'checkIn']);
    Route::get('event-registrations/activity/{activityId}', [EventRegistrationController::class, 'byActivity']);
    
    // Certificates
    Route::apiResource('certificates', CertificateController::class);
    Route::get('certificates/user/{userId}', [CertificateController::class, 'byUser']);
    Route::post('certificates/{id}/download', [CertificateController::class, 'download']);
    
    // Recruitments
    Route::apiResource('recruitments', RecruitmentController::class);
    Route::apiResource('recruitment-applications', RecruitmentController::class);
    Route::post('recruitment-applications/{id}/accept', [RecruitmentController::class, 'acceptApplication']);
    Route::post('recruitment-applications/{id}/reject', [RecruitmentController::class, 'rejectApplication']);
    
    // Documents
    Route::apiResource('documents', DocumentController::class);
    Route::post('documents/upload', [DocumentController::class, 'upload']);
    Route::get('documents/download/{id}', [DocumentController::class, 'download']);
    
    // Letters
    Route::apiResource('letters', LetterController::class);
    Route::post('letters/{id}/approve', [LetterController::class, 'approve']);
    Route::get('letter-templates', [LetterController::class, 'templates']);
    
    // Forum
    Route::apiResource('forum-channels', ForumController::class);
    Route::get('forum-channels/{id}/messages', [ForumController::class, 'messages']);
    Route::post('forum-channels/{id}/messages', [ForumController::class, 'sendMessage']);
});
