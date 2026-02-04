import { useState, useEffect, useMemo, useCallback } from "react";
import { User, UserFormData } from "@/types/user";
import { fetchUsers } from "@/lib/api";
import { useDebounce } from "./useDebounce";

/**
 * Custom hook that encapsulates all user-related state and logic.
 *
 * Separating this from the component keeps UI and business logic independent,
 * making both easier to test and reuse.
 *
 * Data flow:
 *   Server component (page.tsx) fetches users → passes as initialUsers to UserList →
 *   useUsers stores them in state → filteredUsers computed via useMemo →
 *   UserCard components render the filtered list.
 *   On edit: updateUser modifies the users array → filteredUsers recomputes automatically.
 */
export function useUsers(initialUsers: User[] = []) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(!initialUsers.length);
  const [error, setError] = useState<string | null>(null);

  // Debounce search input by 300ms to avoid filtering on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fallback: fetch on the client if server didn't provide initial data
  useEffect(() => {
    if (initialUsers.length) return;

    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers(controller.signal);
        setUsers(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, [initialUsers.length]);

  // Unique sorted city list for the filter dropdown, recomputed only when users change
  const cities = useMemo(
    () => [...new Set(users.map((u) => u.address.city))].sort(),
    [users]
  );

  // Reset city filter if the selected city no longer exists in the list
  // (e.g. after editing the last user from that city to a different one)
  useEffect(() => {
    if (cityFilter && !cities.includes(cityFilter)) {
      setCityFilter("");
    }
  }, [cities, cityFilter]);

  // Filtered users list — filtering logic is kept outside JSX as required by the task.
  // useMemo ensures recomputation only when dependencies change.
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !debouncedSearch ||
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCity = !cityFilter || user.address.city === cityFilter;

      return matchesSearch && matchesCity;
    });
  }, [users, debouncedSearch, cityFilter]);

  // Updates a user locally. useCallback keeps a stable reference to avoid unnecessary re-renders
  // of child components wrapped in React.memo.
  const updateUser = useCallback((id: number, data: UserFormData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              name: data.name,
              email: data.email,
              address: { ...user.address, city: data.city },
            }
          : user
      )
    );
  }, []);

  return {
    filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    cityFilter,
    setCityFilter,
    cities,
    updateUser,
  };
}
