// src/app/core/models/role.model.ts

/**
 * Minimal shape for a Role coming from your API.
 * Extend with permissions, description, etc. as needed.
 */
export interface Role {
  /** UUID or numeric ID */
  id: string;
  /** e.g. "admin", "user", "super_admin" */
  name: string;
  /** (optional) if your API returns permissions on the role */
//   permissions?: string[];
}
