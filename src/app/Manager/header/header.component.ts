import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, RouterModule,HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit,OnInit{
  
  user:any;
  role: any;

  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
 
    constructor(private router: Router,private http:HttpClient) {
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
  message:any[]=[];
 
  ngOnInit(): void {
    this.getMessage();
  }
 
  getMessage(){  
    const apiUrl = 'http://localhost:8080/comments';
      this.http.get<any[]>(apiUrl).subscribe((data)=>{
        console.log(data);
        
        this.message=data.reverse();
          // Add time difference logic
      this.message.forEach(msg => {
        msg.timeAgo = this.calculateTimeAgo(msg.feedback_date);
      });
       
      })
  }
 
  calculateTimeAgo(feedbackDate: string): string {
    const currentTime = new Date();
    const feedbackTime = new Date(feedbackDate);
    const timeDifference = currentTime.getTime() - feedbackTime.getTime();
 
    // Calculate time differences
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
 
    // Format output
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
