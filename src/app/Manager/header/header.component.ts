import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
  user:any;
  role: any;

  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
 
    constructor(private router: Router) {
      const userData = localStorage.getItem('user');
      const role = localStorage.getItem('role');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData); // Check the parsed user data

      console.log(this.user);
      this.user = parsedUserData.managers[0]; // Access the first student in the array
      console.log(this.user);
    }
    if (role) {
      this.role = role;
    }
    }
  
 // This lifecycle hook ensures that on route change, the sidebar doesn't transition.
 ngAfterViewInit() {
  this.router.events.subscribe(() => {
    // Reset sidebar state when navigation ends
    if (this.isSidebarOpen) {
      // We make sure the sidebar stays open without triggering animation
      document.querySelector('.sidebar-nav-wrapper')?.classList.add('active');
    } else {
      document.querySelector('.sidebar-nav-wrapper')?.classList.remove('active');
    }
  });
}

 
 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

  onSignOut(): void {
    console.log('Sign Out initiated');
    
    // Double-check clearing localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    // localStorage.clear();
  
    this.user = null; // Clear the user data in the component
  
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
