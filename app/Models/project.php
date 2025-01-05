<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Console\View\Components\Task;

class project extends Model
{
    use HasFactory;

    public function task(){
        return $this->hasMany(Task::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
}

public function updatedBy(){
    return $this->belongsTo(User::class, 'updated_by');
}

}