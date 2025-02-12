import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainee-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,TraineeHeaderComponent],
  templateUrl: './trainee-dashboard.component.html',
  styleUrl: './trainee-dashboard.component.css'
})
export class TraineeDashboardComponent implements OnInit {
  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
   
  quote:any = '';
  author: any = '';
  greeting: string = '';
 
 
     
  scheduledCount: number = 0;
  completedCount: number = 0;

  sch: any = "";
 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

  scheduledTests: any[] = []; // Array to store the scheduled tests
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {

      this.http.get<any>('https://dummyjson.com/quotes').subscribe(
        (response) => {
          const randomIndex = Math.floor(Math.random() * response.quotes.length);
          const randomQuote = response.quotes[randomIndex]; 
          this.quote = randomQuote.quote;
          this.author = randomQuote.author;
        },
        (error) => {
          console.error('Error fetching quote:', error);
        }
      );
      // Fetch scheduled tests from the backend API
      this.http.get<any>('http://localhost:8080/scheduled').subscribe(
        (response) => {
          // Assuming the 'scheduled' array is in the response
          if (response.scheduled) {
            this.scheduledTests = response.scheduled;
            
                    // Sort the tests by date in ascending order
        this.scheduledTests.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
          }
        },
        (error) => {
          console.error('Error fetching scheduled tests', error);
        }
      );

      this.greeting = this.getGreeting();
      
      this.http.get("http://localhost:8080/Count").subscribe({
        next: (response) => {
          this.sch = response;
          console.log(response);
          
          this.scheduledCount = this.sch.scheduled || 0;
          this.completedCount = this.sch.completed || 0;
        },
        error: (err) => {
          console.error('Error fetching test count:', err);
        }
        
      });
      
    }

    getGreeting(): string {
      const hours = new Date().getHours();
      if (hours < 12) {
        return 'Good Morning';
      } else if (hours < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    }
    
  }
  
      
  

