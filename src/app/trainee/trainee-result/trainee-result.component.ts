import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';

@Component({
  selector: 'app-trainee-result',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,TraineeHeaderComponent],
  templateUrl: './trainee-result.component.html',
  styleUrl: './trainee-result.component.css'
})
export class TraineeResultComponent {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }
  results = [
    { id: 1, subname: 'html', score: 85 },
    { id: 2, subname: 'java script', score: 92 },
    { id: 3, subname: 'angular', score: 78 },
    { id: 4, subname: 'data structure', score: 89 },
    { id: 5, subname: 'java', score: 95 },
    { id: 6, subname:'sdlc',score:98}
  ];
}
