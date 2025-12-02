import type { User } from "../utils/types";
import { v4 } from "uuid";

export class UserManager {
  public users: User[];
  static instance: UserManager;

  private constructor() {
    this.users = [];
  }

  public static getInstance() {
    if (!this.instance) this.instance = new UserManager();
    return this.instance;
  }

  addUser() {
    const user = { id: v4(), balance: 5000 };
    this.users.push(user);
  }
}
