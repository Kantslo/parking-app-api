export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserType extends NewUser {
  id: string;
  admin: boolean
}

export interface AdminType extends NewUser {
  id: string;
  admin: boolean;
}