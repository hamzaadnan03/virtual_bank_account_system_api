export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  accessToken?: string;
  refreshToken?: string;
}
