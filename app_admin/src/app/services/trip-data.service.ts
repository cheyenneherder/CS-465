import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";  // Use HttpClient instead of Http
import { AuthResponse } from "../models/authresponse";
import { Observable, lastValueFrom } from "rxjs";
import { BROWSER_STORAGE } from "../storage";
import { Trip } from "../models/trip";
import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class TripDataService {
  private apiBaseUrl = "http://localhost:3000/api";
  private tripUrl = `${this.apiBaseUrl}/trips`;

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) {}

  // Fetch all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  // Fetch a trip by its code
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripUrl}/${tripCode}`);
  }

  // Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl, formData);
  }

  // Update an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.tripUrl, formData);
  }

  // Login user
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  // Register user
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  // Helper method for authentication API calls
  private async makeAuthApiCall<AuthResponse>(urlPath: string, user: User): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url, user))) as AuthResponse;
  }
}