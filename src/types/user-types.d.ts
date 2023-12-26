export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserType extends NewUser {
  id: string;
}

export interface AdminType extends UserType {
  admin: boolean
}