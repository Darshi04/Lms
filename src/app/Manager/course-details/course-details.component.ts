import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../Trainer/footer/footer.component';
import { SharedService } from '../../shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [FormsModule,CommonModule,FooterComponent,RouterModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent  {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }


  
  
}
