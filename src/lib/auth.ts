import { AdminUser, UserRole } from '../types';
import { db } from './db';

const ROLE_RANK: Record<UserRole, number> = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  EDITOR: 1,
};

export class AuthManager {
  private currentUser: AdminUser | null = null;
  private listeners: Set<(user: AdminUser | null) => void> = new Set();

  constructor() {
    this.restoreSession();
  }

  public subscribe(cb: (user: AdminUser | null) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.currentUser));
  }

  private restoreSession() {
    try {
      const session = localStorage.getItem('vv_auth_session');
      if (session) {
        const parsed = JSON.parse(session);
        // Verify user still active in DB
        const users = db.getAdminUsers();
        const active = users.find((u) => u.id === parsed.id && u.isActive);
        if (active) {
          this.currentUser = active;
        } else {
          this.logout();
        }
      }
    } catch {
      this.currentUser = null;
    }
  }

  public login(email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();

    // Check credentials against active admin accounts
    const users = db.getAdminUsers();
    const match = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!match) {
      return { success: false, error: 'Invalid email address or password.' };
    }

    if (!match.isActive) {
      return { success: false, error: 'This user account has been deactivated by Super Admin.' };
    }

    // Passwords check: default master password 'vivevons2026' or role-specific passwords
    const validPasses = ['vivevons2026', 'admin123', 'manager2026', 'editor2026', 'super2026'];
    if (!validPasses.includes(pass.trim())) {
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    const updatedUser = db.saveAdminUser({
      id: match.id,
      lastLoginAt: new Date().toLocaleString(),
    });

    this.currentUser = updatedUser;
    localStorage.setItem('vv_auth_session', JSON.stringify(updatedUser));
    db.logActivity(updatedUser.email, updatedUser.role, 'LOGIN_SUCCESS', `Admin logged in successfully from browser.`);
    this.notify();

    return { success: true, user: updatedUser };
  }

  public logout() {
    if (this.currentUser) {
      db.logActivity(this.currentUser.email, this.currentUser.role, 'LOGOUT', `Admin session ended.`);
    }
    this.currentUser = null;
    localStorage.removeItem('vv_auth_session');
    this.notify();
  }

  public getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentUser.isActive;
  }

  public hasPermission(requiredRole: UserRole): boolean {
    if (!this.currentUser || !this.currentUser.isActive) return false;
    return ROLE_RANK[this.currentUser.role] >= ROLE_RANK[requiredRole];
  }
}

export const auth = new AuthManager();
