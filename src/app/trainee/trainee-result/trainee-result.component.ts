import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  
  user: any = {}; // Declare user as an empty object initially
  subjects: any[] = [];
  average:any;
  
 
  constructor(private router: Router) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log(this.user);
      this.user = parsedUserData.students[0]; // Access the first student in the array
      console.log(this.user);
      
    }
    
  }

  
  calculateAverageForSubject(subjectName: string): string {
    const subjectMarks = this.user.marks.filter((mark: {
      mark: null; subject: string 
}) => mark.subject === subjectName && mark.mark !== null);
    if (subjectMarks.length > 0) {
      const totalMarks = subjectMarks.reduce((sum: number, mark: { mark: number }) => sum + mark.mark, 0);
      // Return the average formatted to two decimal places
      this.average=(totalMarks / subjectMarks.length).toFixed(0);
      return this.average;
    }
    return '0.00'; // Default value if no marks are found
  }

  // Group marks by subject and also calculate the average for each subject
  getSubjectsWithAttempts() {
    const subjects: any[] = [];
    const marks = this.user.marks;

   marks && marks.forEach((mark: {
      mark: null; subject: string 
}) => {
      let subject = subjects.find(s => s.name === mark.subject);
      if (!subject) {
        subject = { name: mark.subject, marks: [] };
        subjects.push(subject);
      }
      if (mark.mark !== null) {  // Ignore null marks when adding to the subject's marks array
        subject.marks.push(mark);
      }
    });

    // Calculate and add the average for each subject
    subjects.forEach((subject: any) => {
      subject.average = this.calculateAverageForSubject(subject.name); // Add the average for the subject
    });

    return subjects;
  }

}
