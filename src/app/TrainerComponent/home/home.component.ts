import { Component, OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { AsideComponent } from '../Calendar/aside.component';
import { EventService } from '../../event.service';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlotlyModule, CommonModule, AsideComponent, FooterComponent,FormsModule,LayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // Variables to hold counts
  scheduledCount: number = 0;
  completedCount: number = 0;

  // Placeholder for the response from the server
  sch: any = "";

  constructor(private eventService: EventService, private obj: HttpClient) {}

  isSidebarOpen: boolean = true; // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

  public graph = {
    data: [
      {
        x: ['January', 'February', 'March', 'April'], // Labels for the months
        y: [65, 59, 80, 81], // Data for test performance
        type: 'bar', // Bar chart type
        name: 'Test Performance', // Label for the dataset
        marker: {
          color: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'], // Background color of the bars
          line: {
            color: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'], // Border color of the bars
            width: 1 // Border width
          }
        }
      }
    ],
    layout: {
      title: 'Test Performance', // Title of the chart
      xaxis: {},
      yaxis: {
        rangemode: 'tozero', // Ensure the Y-axis starts from zero
      },
      showlegend: false, // Disable the legend
      paper_bgcolor: '#ffffff', // Background color for the entire plot area
      margin: {
        l: 50, r: 50, b: 50, t: 50 // Set margins to reduce unnecessary space
      },
      hovermode: 'closest', // Show the data on hover
      displayModeBar: false, // This disables the mode bar (toolbar) completely
    }
  };

  ngOnInit(): void {
    // Fetch the user count data for scheduled and completed events
    this.obj.get("http://localhost:8080/Count").subscribe({
      next: (response) => {
        this.sch = response;
        console.log(response);
        
        // Assign the counts to local variables
        this.scheduledCount = this.sch.scheduled || 0;
        this.completedCount = this.sch.completed || 0;
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      }
    });
  }
}
