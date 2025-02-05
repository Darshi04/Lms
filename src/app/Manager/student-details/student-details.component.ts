import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../Trainer/footer/footer.component";
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  addingNewStudent = false;
  newStudent = { 
    name: '', 
    rnNumber: '', 
    t_id: '', 
    email: '', 
    role: '', 
    skills: '', 
    password: '', // Added password field
    image: null 
  };
  studentImageUrl: string = '';
  filteredStudents: any[] = [];
  students: any[] = [];
  currentStudent: any = null;
  isEditing: boolean = false;
  isRNSearch = true;
  empid: string = '';
  skill: string = '';
  isSidebarOpen: boolean = true;
  
  profileImage: File | null = null; // Store the selected file

  // File change handler to update the profileImage
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

  trainerIds: number[] = []; // To hold trainer IDs for the dropdown

  constructor(private http: HttpClient, private trainerService: TrainerService) {}

  ngOnInit() {
    this.trainerIds = this.trainerService.getTrainerIds();
    console.log('Trainer IDs fetched via getTrainerIds():', this.trainerIds);
  
    // Load students data
    this.loadStudents();
  }

  // Fetch all students from the backend
  loadStudents() {
    this.http.get('http://localhost:8081/students').subscribe(
      (response: any) => {
        this.students = response;
        this.filteredStudents = [...this.students];
        console.log('Loaded students:', this.filteredStudents);
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }

  // Generate random password for new student
  generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  // Start adding a new student
  start() {
    this.addingNewStudent = true;
    this.newStudent = { 
      name: '', 
      rnNumber: '', 
      t_id: '', 
      email: '', 
      role: '', 
      skills: '', 
      password: '', // Initialize password field
      image: null 
    };
  }

  saveNewStudent() {
    const randomPassword = this.generateRandomPassword(8); // Generate a random password
    const formData: FormData = new FormData();
    
    // Append student details
    formData.append('name', this.newStudent.name);
    formData.append('rnNumber', this.newStudent.rnNumber);
    formData.append('t_id', this.newStudent.t_id);
    formData.append('email', this.newStudent.email);
    formData.append('role', this.newStudent.role);
    formData.append('skills', this.newStudent.skills);
  
    // Append generated password
    formData.append('password', randomPassword);
  
    // Append profile image if selected
    if (this.profileImage) {
      formData.append('profile', this.profileImage, this.profileImage.name);
    }
  
    // Send data to the backend
    this.http.post('http://localhost:8081/students/add', formData).subscribe(
      (response: any) => {
        console.log('Student added successfully:', response);
        // Assuming backend returns the image path as 'public/images/{imageName}'
        this.studentImageUrl = 'http://localhost:8081/' + response.profile;
        this.filteredStudents.push(response); // Add the new student to the list
        this.addingNewStudent = false; // Close the form
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }
  
  
  // Cancel adding a new student
  cancelAddingNewStudent() {
    this.addingNewStudent = false;
  }

  // Edit existing student
  editStudent(student: any) {
    this.currentStudent = { ...student };
    this.isEditing = true;
  }

  // Save the edited student details
  saveEditedStudent() {
    if (this.currentStudent && this.isEditing) {
      console.log('Saving updated student:', this.currentStudent);

      const formData: FormData = new FormData();
      formData.append('name', this.currentStudent.name);
      formData.append('rnNumber', this.currentStudent.rnNumber);
      formData.append('t_id', this.currentStudent.t_id);
      formData.append('email', this.currentStudent.email);
      formData.append('role', this.currentStudent.role);
      formData.append('skills', this.currentStudent.skills);

      if (this.profileImage) {
        formData.append('profile', this.profileImage, this.profileImage.name);
      }

      this.http.put(`http://localhost:8081/students/${this.currentStudent.sno}`, formData).subscribe(
        (response: any) => {
          console.log('Student updated:', response);
          const index = this.filteredStudents.findIndex((student) => student.sno === this.currentStudent.sno);
          if (index !== -1) {
            this.filteredStudents[index] = { ...this.currentStudent }; // Update the student in the list
          }
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

  // Cancel editing
  cancelEditing() {
    this.isEditing = false;
    this.currentStudent = null;
  }

  // Delete a student
  deleteStudent(studentId: number) {
    if (!studentId) {
      console.log(studentId);
      console.error('Invalid student ID, cannot proceed with deletion.');
      return;
    }

    console.log('Attempting to delete student with ID:', studentId);

    this.http.delete(`http://localhost:8081/students/${studentId}`).subscribe(
      (response: any) => {
        console.log('Student deleted:', response);
        this.filteredStudents = this.filteredStudents.filter(
          (student) => student.sno !== studentId
        );
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  // Filter students by RN number
  filterStudents(): void {
    if (this.empid) {
      this.filteredStudents = this.students.filter((student) =>
        student.rnNumber.toLowerCase().includes(this.empid.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  // Filter students by skills
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

  // Toggle search mode
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
