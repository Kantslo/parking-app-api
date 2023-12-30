export interface NewUser {
  name: string;
  email: string;
  password: string;
  admin: boolean
}

export interface UserType extends NewUser {
  id: string;
  balance: number;
}

export interface AdminType extends NewUser {
  id: string;
  admin: boolean;
}