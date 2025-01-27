import { Component, OnInit } from '@angular/core';


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../TrainerComponent/footer/footer.component";
import { TrainerService } from '../../trainer.service';


@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],  // Add FormsModule here
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit  {
  // Flags and variables
  addingNewStudent = false;
  newStudent = { name: '', rnNumber: '', t_id: '', email: '', role: '', skills: '' ,profile:''}; 
  filteredStudents: any[] = [];
  students: any[] = [];
  currentStudent: any = null;
  isEditing: boolean = false;
  isRNSearch = true;
  empid: string = '';
  skill: string = '';
  isSidebarOpen: boolean = true;

  selectedImage: any = null; // Store selected image


  

  trainerIds: number[] = []; // To hold trainer IDs for the dropdown

  constructor(private http: HttpClient,private trainerService:TrainerService) {}

  ngOnInit() {
   // Fetch trainerIds from the service
   this.trainerService.trainerIds$.subscribe(trainerIds => {
    this.trainerIds = trainerIds;
    console.log('Trainer IDs fetched:', this.trainerIds);  // Log trainerIds
  });

    // Fetch students (already existing code)
    this.loadStudents();
  }
  

  // Fetch students (already existing code)
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

  // Generate a random password
  generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  // Show the form to add a new student
  start() {
    this.addingNewStudent = true;
    this.newStudent = { name: '', rnNumber: '', t_id: '', email: '', role: '', skills: '',profile:'' }; // Reset form
  }

  // Save the new student
  saveNewStudent() {
    if (this.newStudent.name && this.newStudent.rnNumber && this.newStudent.t_id && this.newStudent.email && this.newStudent.role && this.newStudent.skills && this.newStudent.profile) {
        const randomPassword = this.generateRandomPassword(8);

        // Check if profile image is selected and set profile field
        const data = { 
            ...this.newStudent, 
            password: randomPassword, 
            profile: this.selectedImage || 'default-avatar-url'  // Use base64 or default URL if no image
        };

        console.log('Data to Save:', data); // Log the data being sent

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http.post('http://localhost:8081/students', data, { headers: headers }).subscribe(
            (response: any) => {
                console.log('Student saved:', response);
                this.filteredStudents.push(response);
                this.addingNewStudent = false; // Close the form
            },
            (error) => {
                console.error('Error saving student:', error);
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
      this.newStudent.t_id &&
      this.newStudent.email &&
      this.newStudent.role &&
      this.newStudent.skills &&
      this.newStudent.profile
    );
  }

   // Save the edited student
   saveEditedStudent() {
    if (this.currentStudent && this.isEditing) {
      console.log('Saving updated student:', this.currentStudent);

      // If an image is selected, update the avatar field
      if (this.selectedImage) {
        this.currentStudent.avatar = this.selectedImage;
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put(`http://localhost:8081/students/${this.currentStudent.sno}`, this.currentStudent, { headers })
        .subscribe(
          (response: any) => {
            console.log('Student updated:', response);

            // Find and update the student in the list
            const index = this.filteredStudents.findIndex((student) => student.sno === this.currentStudent.sno);
            if (index !== -1) {
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
    this.isEditing = false;
    this.currentStudent = null;
  }

  // Edit a student
  editStudent(student: any) {
    this.currentStudent = { ...student }; // Clone the student to avoid direct mutation
    this.isEditing = true;
  }

  // Delete a student
  deleteStudent(studentId: number) {
    if (!studentId) {
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
      this.empid = '';
      this.filterStudents();
    } else {
      this.skill = '';
      this.skillfilters();
    }
  }

   // Handle file change (image upload)
   onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newStudent.profile = e.target.result; // Set the profile field to the base64 string
        console.log('Selected Image Base64:', this.newStudent.profile); // Check the value
      };
      reader.readAsDataURL(file);  // Convert the image to base64 format
    }
  }

  

}