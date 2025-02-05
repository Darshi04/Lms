import { Component, OnInit } from '@angular/core';
 
 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../Trainer/footer/footer.component";

 
 
@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],  // Add FormsModule here
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  // Flags and variables
  addingNewStudent = false;
  newStudent = { profile: '',student_name: '', rn_id: '', t_id: '' as string | null, email: '', role: '', skills: '' };
  filteredStudents: any[] = [];
  students: any[] = [];
  currentStudent: any = null;
  isEditing: boolean = false;
  isRNSearch = true;
  empid: string = '';
  skill: string = '';
  isSidebarOpen: boolean = true;

  trainerIds: String[] = []; // To hold trainer IDs for the dropdown

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadStudents();
  }


  // Fetch students (already existing code)
  loadStudents() {
    
    this.http.get('http://localhost:8080/allStudents').subscribe(
      (response: any) => {
        this.students = response;
        this.filteredStudents = [...this.students];
        console.log('Loaded students:', this.filteredStudents);
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );





    //for trainer id
    this.http.get('http://localhost:8080/getAllTrainer').subscribe(
      (response: any) => {
        this.trainerIds = response.map((trainer: any) => trainer.trainer_id); // Get only the trainer IDs
        console.log('Loaded trainers:', this.trainerIds); // Log the trainers for debugging
      },(error) => {
        console.error('Error loading trainers:', error);
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
    this.newStudent = {  profile: '',student_name: '', rn_id: '', t_id: '', email: '', role: '', skills: '' }; // Reset form
  }
  

  // Save the new student
  saveNewStudent() {
    if (this.newStudent.profile && this.newStudent.student_name && this.newStudent.rn_id && this.newStudent.email && this.newStudent.role && this.newStudent.skills) {
      const randomPassword = this.generateRandomPassword(8);

      if (this.newStudent.t_id === '') {
        this.newStudent.t_id = null;
      }

      // Check if profile image is selected and set profile field
      const data = {
        ...this.newStudent,
        password: randomPassword,// Use base64 or default URL if no image
      };

      console.log('Data to Save:', data); // Log the data being sent

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:8080/add/student', data, { headers: headers }).subscribe(
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
      this.newStudent.student_name &&
      this.newStudent.rn_id &&
      this.newStudent.t_id &&
      this.newStudent.email &&
      this.newStudent.role &&
      this.newStudent.skills
    );
  }


  
  // Save the edited student
  saveEditedStudent() {
    if (this.currentStudent && this.isEditing) {
      console.log('Saving updated student:', this.currentStudent);


      if (this.newStudent.profile) {
        this.currentStudent.profile = this.newStudent.profile; // Assign the new profile image
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put(`http://localhost:8080/updateStudent/${this.currentStudent.rn_id}`, this.currentStudent, { headers })
        .subscribe(
          (response: any) => {
            console.log('Student updated:', response);
 
            // Find and update the student in the list
            const index = this.filteredStudents.findIndex((student) => student.rn_id === this.currentStudent.rn_id);
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
    console.log(studentId);

    if (!studentId) {
      console.error('Invalid student ID, cannot proceed with deletion.');
      return;
    }
 
    console.log('Attempting to delete student with ID:', studentId);

    this.http.delete(`http://localhost:8080/deleteStudent/${studentId}`).subscribe(
      (response: any) => {
        console.log('Student deleted:', response);
        this.filteredStudents = this.filteredStudents.filter(
          (student) => student.rn_id !== studentId
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
        student.rn_id.toLowerCase().includes(this.empid.toLowerCase())
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

  onFileChange(event:any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.newStudent.profile = reader.result as string;  // Base64 data URL
        
        
      };
      reader.readAsDataURL(file);  // Convert the file to base64
    }
  }
  



}
