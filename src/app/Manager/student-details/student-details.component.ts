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
addingNewStudent = false; // To show or hide the form
  newStudent = {
    name: '',
    rnNumber: '',
    role: '',
    skills: ''
  };
  filteredStudents: any[] = []; // The list of students

  constructor(private Http: HttpClient) {
    this.loadStudents(); // Load students on initialization
  }

  // Fetch students from the backend
  loadStudents() {
    this.Http.get('http://localhost:8081/students').subscribe(
      (response: any) => {
        this.filteredStudents = response;
        console.log('Students loaded:', this.filteredStudents);
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

  saveNewStudent() {
    // Check if all required fields are filled
    if (this.newStudent.name && this.newStudent.rnNumber && this.newStudent.role && this.newStudent.skills) {
      // Prepare the data to send to the server
      const data = this.newStudent;
      console.log('Saving new student:', data);
  
      // Set headers for the HTTP request
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      // Make the POST request to the backend with the headers
      this.Http.post('http://localhost:8081/students', data, { headers: headers }).subscribe(
        (response: any) => {
          console.log('Student saved:', response);
          this.filteredStudents.push(response); // Add the new student to the list
          this.addingNewStudent = false; // Hide the form after saving
        },
        (error) => {
          console.error('Error saving student:', error);
          if (error.status === 400) {
            console.error('Bad Request: ', error.error); // More details about the error from the server
          }
        }
      );
    } else {
      console.error('All fields are required'); // If any field is missing
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

  // Edit student (for future implementation)
  editStudent(student: any) {
    console.log('Editing student:', student);
  }

  // Delete student (for future implementation)
  deleteStudent(studentId: number) {
    console.log('Deleting student with ID:', studentId);
  }



 
  students: any[] = [];
 
  isRNSearch = true;
  empid: string = '';
  skill: string = '';
  // originalStudent: any = {};  // Store the original student data when editing


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

  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleSearchMode(): void {
    if (this.isRNSearch) {
      this.empid = '';
      this.filterStudents();
    } else {
      this.skill = '';
      this.skillfilters();
    }
  }




}