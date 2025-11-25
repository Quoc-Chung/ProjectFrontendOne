export interface LoginResponse {
  token: string;
  code: string;
  account: string;
  phone?: string | null;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  firstLogin: boolean;
  roleNames: string[];
}
