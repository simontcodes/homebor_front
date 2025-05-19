import { Tenant } from './tenant.model';
import { Role } from './role.model';

export interface User {
  id: string;
  email: string;
  //   first_name: string;
  //   last_name: string;
  role: Role;
  tenant?: Tenant | null;
  // …any other fields your API returns on the user
}
