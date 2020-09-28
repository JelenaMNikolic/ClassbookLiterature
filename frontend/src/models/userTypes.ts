export enum UserRoleEnum {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export interface UserInterface {
  accessToken?: string;
  tokenType?: string;
  id: string;
  email: string;
  name: string;
  password: string;
  position: string;
  role?: UserRoleEnum[];
  surname: string;
  username: string;
}
