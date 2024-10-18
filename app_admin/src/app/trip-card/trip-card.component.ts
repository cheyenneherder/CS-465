import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { Trip } from '../models/trip'; // Import Trip model

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'] 
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip; 

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {}

  // Method to handle editing a trip
  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode'); // Clear any previous tripCode
    localStorage.setItem('tripCode', trip.code); // Store the current tripCode in local storage
    this.router.navigate(['edit-trip']); // Navigate to the edit-trip route
  }
}
