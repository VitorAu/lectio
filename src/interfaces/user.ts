export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  birthdate: Date;
  password: string;
  deleted_at?: Date;
}
