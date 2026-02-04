import { User } from "@/types/user";

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Fetches all users from the JSONPlaceholder API.
 * Accepts an optional AbortSignal to cancel the request on component unmount.
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: status ${response.status}`);
  }

  return response.json();
}
