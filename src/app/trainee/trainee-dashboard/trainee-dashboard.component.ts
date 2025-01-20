import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainee-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './trainee-dashboard.component.html',
  styleUrl: './trainee-dashboard.component.css'
})
export class TraineeDashboardComponent {
  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
 
 
 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }
}
