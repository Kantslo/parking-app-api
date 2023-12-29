export interface NewUser {
  name: string;
  email: string;
  password: string;
  admin: boolean
}

export interface UserType extends NewUser {
  id: string;
}

export interface AdminType extends NewUser {
  id: string;
  admin: boolean;
}