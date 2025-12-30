import { RoleColumns } from "./RoleInterface";

export interface UserColumns {
  user_id: number;
  google_id?: string;
  name: string;
  address?: string;
  contact_number?: string;
  email?: string;
  username?: string;
  password?: string;
  role: RoleColumns;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserFieldsErrors {
  name?: string[];
  address?: string[];
  contact_number?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
  password_confirmation?: string[];
  role?: string[];
}
