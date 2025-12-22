import { RoleColumns } from "./RoleInterface";

export interface UserColumns {
  user_id: number;
  google_id?: string;
  email?: string;
  username?: string;
  password?: string;
  role_id: RoleColumns;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}
