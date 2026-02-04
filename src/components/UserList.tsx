// "use client" — requires useState, useCallback, and the useUsers custom hook
"use client";

import React, { useState, useCallback } from "react";
import { User } from "@/types/user";
import { UserFormData } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";
import SearchFilter from "./SearchFilter";
import UserCard from "./UserCard";
import UserEditForm from "./UserEditForm";

interface UserListProps {
  initialUsers: User[];
}

/**
 * Main client-side container component that assembles the user management UI.
 *
 * Connects the useUsers hook (state & logic) with presentational children:
 *   SearchFilter — search input + city dropdown
 *   UserCard[]   — one card per user
 *   UserEditForm — modal for editing (rendered conditionally)
 *
 * Receives initialUsers from the server component (page.tsx) so the list
 * renders immediately without a client-side loading state.
 */
const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const {
    filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    cityFilter,
    setCityFilter,
    cities,
    updateUser,
  } = useUsers(initialUsers);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  // useCallback keeps stable references for React.memo-wrapped children
  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  const handleSave = useCallback(
    (id: number, data: UserFormData) => {
      updateUser(id, data);
      setEditingUser(null);
    },
    [updateUser]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingUser(null);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-3 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        cities={cities}
      />

      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No users found matching your criteria.
          </p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEdit} />
          ))
        )}
      </div>

      {editingUser && (
        <UserEditForm
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default UserList;
