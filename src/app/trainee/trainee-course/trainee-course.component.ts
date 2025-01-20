import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainee-course',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './trainee-course.component.html',
  styleUrl: './trainee-course.component.css'
})
export class TraineeCourseComponent {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }
}
