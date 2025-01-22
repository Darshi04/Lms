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
  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
 
    constructor(private router: Router) {}
  
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
}
