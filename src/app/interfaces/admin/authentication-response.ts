import { Role } from './role';

export interface AuthenticationResponse {
  jwtToken: string;
  username: string;
  role: Role;
}
