export interface IUser {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  password: string;
  deleted_at?: Date
}
