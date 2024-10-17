import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'] // This should be "styleUrls" instead of "styleUrl"
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor() {}

  ngOnInit(): void {}
}
