// "use client" — requires browser event handler (onClick)
"use client";

import React from "react";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

/**
 * Presentational component displaying a single user's name, email, and city.
 * Has no internal state — all interaction goes through the onEdit callback.
 * Wrapped in React.memo to avoid re-renders when the parent's state changes
 * but this card's props remain the same (e.g. during search filtering).
 */
const UserCard: React.FC<UserCardProps> = React.memo(({ user, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
        <p className="text-sm text-gray-400">{user.address.city}</p>
      </div>

      <button
        onClick={() => onEdit(user)}
        className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
      >
        Edit
      </button>
    </div>
  );
});

UserCard.displayName = "UserCard";

export default UserCard;
