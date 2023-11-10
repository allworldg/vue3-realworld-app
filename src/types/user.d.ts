export interface loginUser {
  email: string;
  password: string;
}

export interface User {
  bio: string;
  email: string;
  image: string;
  token?: string;
  username: string;
  password: string;
}

export interface UpdateUser {
  user: User;
}

export interface UserResponse {
  user: User;
}

export interface Profile {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}
export interface ProfileResponse {
  profile: Profile;
}
