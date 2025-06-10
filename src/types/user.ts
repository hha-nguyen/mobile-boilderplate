export interface User {
  id: string;
  email: string;
  name?: string;
}

export type UserParams = Partial<Omit<User, 'id'>>;
