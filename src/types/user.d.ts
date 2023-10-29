export interface loginUser {
  email: string;
  password: string;
}

export interface UpdatedUser {}

export interface User {
  bio: string;
  email: string;
  image: string;
  token?: string;
  username: string;
  password: string;
}

export interface UserResponse {
  user: User;
}
