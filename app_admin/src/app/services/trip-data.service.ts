import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips'; // Refactored URL variable

  constructor(private http: HttpClient) {}

  // Method to retrieve trips from the backend
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // Method to add a new trip to the backend
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // Method to retrieve a single trip by tripCode
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }

  // Method to update an existing trip by tripCode
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData);
  }
}

