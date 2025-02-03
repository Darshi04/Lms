import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {
  user: any;
  role: any;
  studentCount: number = 0;
  isSidebarOpen: boolean = true;

  constructor(private router: Router) {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        this.user = parsedUserData.trainers[0] || { name: 'Default User' };
        this.studentCount = this.user.students ? this.user.students.length : 0;
        localStorage.setItem('studentCount', this.studentCount.toString());
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.user = { name: 'Default User' };  // Fallback data
      }
    } else {
      this.user = { name: 'Guest User' }; // Fallback if no user in localStorage
    }

    this.role = role || 'guest';
  }

  ngAfterViewInit() {
    // Ensure sidebar state is correctly set on page load
    this.router.events.subscribe(() => {
      document.querySelector('.sidebar-nav-wrapper')?.classList.toggle('active', this.isSidebarOpen);
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSignOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('studentCount'); 
 
    this.router.navigate(['/login']);
  }
}
