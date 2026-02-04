// "use client" — requires useState, useEffect, and browser event handlers
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { User, UserFormData } from "@/types/user";

interface UserEditFormProps {
  user: User;
  onSave: (id: number, data: UserFormData) => void;
  onCancel: () => void;
}

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Modal form for editing a user's name, email, and city.
 *
 * Uses controlled inputs — form state is kept in local useState and
 * synced with the selected user via useEffect when the `user` prop changes.
 * Validation runs on submit; individual field errors clear on input change
 * for immediate feedback.
 *
 * Data flow: UserList passes the selected user → form displays current values →
 * on save, calls onSave(id, formData) → UserList updates state via useUsers.updateUser.
 */
const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: user.name,
    email: user.email,
    city: user.address.city,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  // Reset form when a different user is selected for editing
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      city: user.address.city,
    });
    setErrors({});
  }, [user]);

  // Close modal on Escape — standard UX expectation for modal dialogs
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(user.id, formData);
    }
  };

  // Factory for per-field change handlers; clears the field error on input.
  // Not wrapped in useCallback intentionally — this component is never memoized
  // (it's a single modal instance), so stable references provide no benefit here.
  const handleChange =
    (field: keyof UserFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Edit user"
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={handleChange("name")}
              autoFocus
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit-city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="edit-city"
              type="text"
              value={formData.city}
              onChange={handleChange("city")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditForm;
