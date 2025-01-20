import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';

@Component({
  selector: 'app-trainee-tracker',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,TraineeHeaderComponent],
  templateUrl: './trainee-tracker.component.html',
  styleUrl: './trainee-tracker.component.css'
})
export class TraineeTrackerComponent {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }
}
