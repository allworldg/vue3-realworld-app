export interface loginUser {
  email: string;
  password: string;
}

export interface User {
  bio: string;
  email: string;
  image: string;
  token: string;
  username: string;
}

export interface UserResponse {
  user: User;
}
