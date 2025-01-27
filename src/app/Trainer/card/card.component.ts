import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],  // Make sure to import CommonModule
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  scheduledTests: any[] = []; // Array to store the scheduled tests

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch scheduled tests from the backend API
    this.http.get<any>('http://localhost:8080/scheduled').subscribe(
      (response) => {
        // Assuming the 'scheduled' array is in the response
        if (response.scheduled) {
          this.scheduledTests = response.scheduled;
        }
      },
      (error) => {
        console.error('Error fetching scheduled tests', error);
      }
    );
  }
}
