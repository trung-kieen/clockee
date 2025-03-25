import { Role } from "@/enum/Role";

export interface UserResponse {
  id: number;
  roles: Array<Role>;
  name?: string;
  email: string;
  // TODO: check misleading field
  authorities: string[]
}
