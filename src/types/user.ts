/**
 * TypeScript types for user data.
 * Separate file serves as a single source of truth across components, hooks, and API layer.
 * User interface mirrors the JSONPlaceholder /users response structure.
 */

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Subset of User fields exposed through the edit form.
 * Separate interface instead of Partial<User> because the form uses a flat "city" string,
 * while User has it nested under address.city.
 */
export interface UserFormData {
  name: string;
  email: string;
  city: string;
}
