import { User } from "@/types/user";
import UserList from "@/components/UserList";

/**
 * Server-side data fetching with ISR (revalidate every hour).
 * Runs only on the server — never included in the client bundle.
 */
async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

/**
 * Home page — a Server Component (no "use client" directive).
 * Fetches users on the server and passes them to the client-side UserList,
 * so the page renders with data immediately (no loading spinner, better SEO).
 * All interactivity (search, filter, edit) is handled client-side in UserList.
 */
export default async function Home() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          User Management
        </h1>
        <UserList initialUsers={users} />
      </div>
    </main>
  );
}
