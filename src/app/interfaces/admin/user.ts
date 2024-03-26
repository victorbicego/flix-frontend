import { Role } from './role';

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
  name: string;
  surname: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialNonExpired: boolean;
  enabled: boolean;
}
