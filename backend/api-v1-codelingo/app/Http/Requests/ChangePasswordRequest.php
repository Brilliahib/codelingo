<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'max:100'],
            'new_password' => ['required', 'max:100', 'confirmed'],
            'new_password_confirmation' => ['required', 'max:100'],
        ];
    }

    public function messages()
    {
        return [
            'new_password.confirmed' => 'New password and confirmation do not match',
            'new_password_confirmation.required' => 'Password confirmation is required',
        ];
    }
}
