import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from '../../Manager/Calendar/aside.component';
import { EventService } from '../../event.service';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../header/layout.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsideComponent, FooterComponent,FormsModule,LayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  scheduledTests: any[] = []; // Array to store the scheduled tests

  studentCount: number = 0;  // Variable to hold the student count
  
  scheduledCount: number = 0;
  completedCount: number = 0;
  public chart: any;  // Declare the chart instance

  sch: any = "";

  count: any;

  constructor(private eventService: EventService, private http: HttpClient) {

let trainersData =  localStorage.getItem('user');
if (trainersData) {
  const parsedUserData = JSON.parse(trainersData);
  this.count = parsedUserData.trainers[0].students.length; 
  
}
 
}


  



  ngOnInit(): void {
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

        this.http.get<any>('http://localhost:8080/subject-stats').subscribe((data) => {
      this.renderChart(data);
    });
        

    
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

    


  }




      renderChart(data: any): void {
        const subjects = Object.keys(data);  // Extract subjects from the response
        const passCounts = subjects.map((subject) => data[subject]['Pass'] || 0);  // Pass counts
        const failCounts = subjects.map((subject) => data[subject]['Fail'] || 0);  // Fail counts

        
      
        // Create the chart using Chart.js
        this.chart = new Chart('marksChart', {
          type: 'bar',  // Chart type: bar chart
          data: {
            labels: subjects,  // Subjects as labels for the X-axis
            datasets: [
              {
                label: 'Pass',
                data: passCounts,  // Data for Pass
                backgroundColor: '#365CF5',  // Green color for Pass
                borderColor: 'transparent',
                borderRadius: 20,
                borderWidth: 5,
                barThickness: 20,
                maxBarThickness: 20,
              },
              {
                label: 'Fail',
                data: failCounts,  // Data for Fail
                backgroundColor: '#dc3545',  // Red color for Fail
                borderColor: 'transparent',
                borderRadius: 20,
                borderWidth: 5,
                barThickness: 20,
                maxBarThickness: 20,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: '#F3F6F8',
                titleColor: '#8F92A1',
                bodyColor: '#171717',
                bodyFont: {
                  weight: 'bold',
                  size: 16,
                },
                multiKeyBackground: 'transparent',
                displayColors: false,
                padding: {
                  x: 30,
                  y: 10,
                },
                bodyAlign: 'center',
                titleAlign: 'center',
                enabled: true,
              },
              legend: {
                display: true,  // Hides the legend
              },
            },
            layout: {
              padding: {
                top: 0,  // Padding at the top of the chart
              },
            },
            responsive: true,

            scales: {
              y: {
                type: 'linear',  // Ensure the Y-axis is using a linear scale (numerical)
                grid: {
                  display: false,
                  drawTicks: false,
                  color: 'rgba(143, 146, 161, .1)',  // Grid line color
                },
                ticks: {
                  padding: 35,  // Padding for the Y-axis ticks
                  
                },
              },
              x: {
                grid: {
                  display: false,
                  color: 'rgba(143, 146, 161, .1)',  // Grid line color
                },
                ticks: {
                  padding: 20,  // Padding for the X-axis ticks
                },
              },
            },
          },
        });
      }
}

