<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function loadUserReferences() {
        $roles = Role::where('role', 'Admin')
            ->orWhere('role', 'Employee')
            ->get();

        return response()
            ->json([
                'roles' => $roles
            ], 200);
    }

    public function loadUsers() {
        $users = User::with(['role'])
            ->orderBy('name', 'asc')
            ->get();

        return response()
            ->json([
            'users' => $users,
        ], 200);
    }

    public function storeUser(Request $request) {
        $validatedData = $request->validate([
            'name' => ['required', 'max:55'],
            'address' => ['required', 'max:255'],
            'contact_number' => ['required', 'numeric'],
            'email' => ['nullable', 'email', Rule::unique('tbl_users', 'email')],
            'username' => ['required', 'min:6', 'max:12', Rule::unique('tbl_users', 'username')],
            'password' => ['required', 'min:6', 'max:15', 'confirmed'],
            'password_confirmation' => ['required', 'min:6', 'max:15'],
            'role' => ['required', 'exists:tbl_roles,role_id'],
        ]);

        User::create([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'password' => $validatedData['password'],
            'role_id' => $validatedData['role']
        ]);

        return response()
            ->json([
                'message' => 'User Account Successfully Saved.'
            ], 200);
    }

    public function updateUser(Request $request, User $user) {
        $validatedData = $request->validate([
            'name' => ['required', 'max:55'],
            'address' => ['required', 'max:255'],
            'contact_number' => ['required', 'numeric'],
            'email' => ['nullable', 'email', Rule::unique('tbl_users', 'email')->ignore($user)],
            'username' => ['required', 'min:6', 'max:12', Rule::unique('tbl_users', 'username')->ignore($user)],
            'role' => ['required', 'exists:tbl_roles,role_id'],
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'role_id' => $validatedData['role']
        ]);

        return response()
            ->json([
                'message' => 'User Account Successfully Updated.'
            ], 200);
    }

    public function destroyUser(User $user) {
        $user->delete();

        return response()
            ->json([
                'message' => 'User Account Successfully Delete.'
            ], 200);
    }
}
