import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { LayoutComponent } from '../header/layout.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FooterComponent,LayoutComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

}
