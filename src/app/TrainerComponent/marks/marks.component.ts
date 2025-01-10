import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-marks',
  standalone: true,
  imports: [FormsModule,CommonModule, FooterComponent],
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.css'
})
export class MarksComponent {
  isSidebarOpen: boolean = true // Initial state: sidebar is closed

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

   // List of available subjects
  subjects = ['Core Java', 'Data Structures', 'Cloud Computing', 'Linux'];

  // Hardcoded student data (could be fetched from an API or service)
  students = [
    { id: 'Rn1245', name: 'John' },
    { id: 'Rn2345', name: 'Henry' },
    { id: 'Rn3456', name: 'Alice' },
    {id:'Rn6789', name: 'Riti'}
  ];

  // Model for form data
  selectedSubject: string = '';
  selectedStudentId: string = '';
  studentName: string = '';
  marks: number = 0;
  marksData: any[] = [];

  // Function to handle subject change
  onSubjectChange(): void {
    // Reset student and marks fields on subject change
    this.selectedStudentId = '';
    this.studentName = '';
    this.marks = 0;
  }

  // Function to handle student change
  onStudentChange(): void {
    const selectedStudent = this.students.find(student => student.id === this.selectedStudentId);
    if (selectedStudent) {
      this.studentName = selectedStudent.name;
    }
  }

  // Function to handle form submission
  onSubmit(form: any): void {
    if (form.valid) {
      const newEntry = {
        studentId: this.selectedStudentId,
        studentName: this.studentName,
        subject: this.selectedSubject,
        marks: this.marks
      };

      // Add new entry to marks data
      this.marksData.push(newEntry);

      // Reset form fields
      form.reset();
      this.selectedSubject = '';
      this.selectedStudentId = '';
      this.studentName = '';
      this.marks = 0;
    }
  }

  // Function to delete a mark entry
  deleteMark(entry: any): void {
    const index = this.marksData.indexOf(entry);
    if (index !== -1) {
      this.marksData.splice(index, 1);
    }
  }
}
