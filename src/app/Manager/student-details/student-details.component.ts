import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,HttpClientModule],  // Add FormsModule here
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent  {
   // Flags and variables
   addingNewStudent = false; // Flag to show or hide the form
   newStudent = { name: '', rnNumber: '', role: '', skills: '' }; // New student form data
   filteredStudents: any[] = []; // The list of students after applying filters
   students: any[] = []; // Original list of students
   currentStudent: any = null; // Store the student being edited
   isEditing: boolean = false; // Flag to determine if we are in edit mode
   isRNSearch = true; // Flag to determine if we are searching by RN Number or Skills
   empid: string = ''; // Search input for RN Number
   skill: string = ''; // Search input for Skills
   isSidebarOpen: boolean = true; // Sidebar toggle
 
   constructor(private Http: HttpClient) {
     this.loadStudents(); // Load students on initialization
   }
 
   // Fetch students from the backend
   loadStudents() {
     this.Http.get('http://localhost:8081/students').subscribe(
       (response: any) => {
         this.students = response; // Set the original list to students
         this.filteredStudents = [...this.students]; // Ensure filteredStudents is a copy of the original
         console.log('Loaded students:', this.filteredStudents);
       },
       (error) => {
         console.error('Error loading students:', error);
       }
     );
   }
 
   // Show the form to add a new student
   start() {
     this.addingNewStudent = true;
     this.newStudent = { name: '', rnNumber: '', role: '', skills: '' }; // Reset form
   }
 
   // Save the new student
   saveNewStudent() {
     if (this.newStudent.name && this.newStudent.rnNumber && this.newStudent.role && this.newStudent.skills) {
       const data = this.newStudent;
       console.log('Saving new student:', data);
 
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
       this.Http.post('http://localhost:8081/students', data, { headers: headers }).subscribe(
         (response: any) => {
           console.log('Student saved:', response);
           this.filteredStudents.push(response);
           this.addingNewStudent = false; // Close the form
         },
         (error) => {
           console.error('Error saving student:', error);
           if (error.status === 400) {
             console.error('Bad Request: ', error.error);
           }
         }
       );
     } else {
       console.error('All fields are required');
     }
   }
 
   // Cancel adding a new student
   cancelAddingNewStudent() {
     this.addingNewStudent = false;
   }
 
   // Validate the student form data
   isValidStudentData() {
     return (
       this.newStudent.name &&
       this.newStudent.rnNumber &&
       this.newStudent.role &&
       this.newStudent.skills
     );
   }
 
   // Save the edited student data
   saveEditedStudent() {
     if (this.currentStudent && this.isEditing) {
       console.log('Saving updated student:', this.currentStudent);
 
       const headers = new HttpHeaders({
         'Content-Type': 'application/json',
       });
 
       this.Http.put(`http://localhost:8081/students/${this.currentStudent.sno}`, this.currentStudent, { headers })
         .subscribe(
           (response: any) => {
             console.log('Student updated:', response);
 
             // Find and update the student in the list
             const index = this.filteredStudents.findIndex(
               (student) => student.sno === this.currentStudent.sno
             );
             if (index !== -1) {
               // Update the student object in the filteredStudents array
               this.filteredStudents[index] = { ...this.currentStudent };
             }
 
             // Reset editing state
             this.isEditing = false;
             this.currentStudent = null;
           },
           (error) => {
             console.error('Error updating student:', error);
           }
         );
     } else {
       console.error('No student selected for editing or invalid data');
     }
   }
 
   // Cancel editing mode
   cancelEditing() {
     this.isEditing = false; // Exit edit mode
     this.currentStudent = null; // Clear the current student being edited
   }
 
   // Edit a student
   editStudent(student: any) {
     this.currentStudent = { ...student }; // Clone the student to avoid direct mutation
     this.isEditing = true; // Set the flag to indicate we're editing
   }
 
   // Delete a student
   deleteStudent(studentId: number) {
     if (!studentId) {
       console.error('Invalid student ID, cannot proceed with deletion.');
       return;
     }
 
     console.log('Attempting to delete student with ID:', studentId);
 
     this.Http.delete(`http://localhost:8081/students/${studentId}`).subscribe(
       (response: any) => {
         console.log('Student deleted:', response);
         this.filteredStudents = this.filteredStudents.filter(
           (student) => student.sno !== studentId // Ensure the correct property is used
         );
       },
       (error) => {
         console.error('Error deleting student:', error);
       }
     );
   }
 
   // Filter students based on RN number
   filterStudents(): void {
     if (this.empid) {
       this.filteredStudents = this.students.filter((student) =>
         student.rnNumber.toLowerCase().includes(this.empid.toLowerCase())
       );
     } else {
       this.filteredStudents = [...this.students];
     }
   }
 
   // Filter students based on Skills
   skillfilters(): void {
     if (this.skill) {
       this.filteredStudents = this.students.filter((student) =>
         student.skills.toLowerCase().includes(this.skill.toLowerCase())
       );
     } else {
       this.filteredStudents = [...this.students];
     }
   }
 
   // Toggle sidebar visibility
   toggleSidebar() {
     this.isSidebarOpen = !this.isSidebarOpen;
   }
 
   // Toggle between RN Number search and Skills search
   toggleSearchMode(): void {
     if (this.isRNSearch) {
       this.empid = ''; // Reset RN number search
       this.filterStudents(); // Apply the filter immediately
     } else {
       this.skill = ''; // Reset skill search
       this.skillfilters(); // Apply the filter immediately
     }
   }

}