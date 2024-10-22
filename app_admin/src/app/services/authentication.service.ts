import { Inject, Injectable } from "@angular/core";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";
import { TripDataService } from "./trip-data.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private tripDataService: TripDataService) { }

  // Get token from storage
  public getToken(): string | null {
    return this.storage.getItem("travlr-token");
  }

  // Save token to storage
  public saveToken(token: string): void {
    this.storage.setItem("travlr-token", token);
  }

  // Login with user credentials
  public login(user: User): Promise<unknown> {
    return this.tripDataService.login(user).then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Register new user
  public register(user: User): Promise<unknown> {
    return this.tripDataService.register(user).then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Logout user by removing token
  public logout(): void {
    this.storage.removeItem("travlr-token");
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token === null) {
      return false;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > (Date.now() / 1000);
  }

  // Get current user details
  public getCurrentUser(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }

    const token: string | null = this.getToken();
    if (token === null) {
      return null;
    }

    const { email, name } = JSON.parse(atob(token.split(".")[1]));
    return { email, name } as User;
  }
}