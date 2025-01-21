import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent implements OnInit{

  // Array to hold the list of trainers
  trainers = [
    { name: "Sri Praveen", role: "Full Stack Developer", t_id: 1, email: "praveenvgmail.com", ph_no: "546789" },
    { name: "Lakshmi", role: "Full Stack Developer", t_id: 2, email: "lakshmi@gmail.com", ph_no: "123456" }
  ];

  // Model for the new trainer
  newTrainer = {
    name: '',
    role: '',
    t_id: 0,
    email: '',
    ph_no: ''
  };

  // Flags for controlling form visibility and edit mode
  showForm: boolean = false;
  editMode: boolean = false;
  selectedTrainerIndex: number = -1;

  // API URL for saving trainer details
  private apiUrl = 'http://localhost:8081/trainers';  // Replace with the correct backend URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Function to handle form submission for saving or updating the trainer
  submitTrainer() {
    if (this.newTrainer.name && this.newTrainer.role && this.newTrainer.email && this.newTrainer.ph_no) {
      if (this.editMode) {
        // Update the existing trainer
        this.updateTrainer(this.selectedTrainerIndex, this.newTrainer);
      } else {
        // Add a new trainer
        this.saveTrainer(this.newTrainer);
      }
    }
  }

  // Function to send the new trainer details to the backend (Add operation)
  saveTrainer(trainer: any) {
    this.http.post<any>(this.apiUrl, trainer).subscribe(
      (response) => {
        console.log('Trainer saved:', response);
        // After saving, add the trainer to the list
        this.trainers.push(response);
        // Close the form modal and reset form data
        this.closeForm();
        this.resetForm();
      },
      (error) => {
        console.error('Error saving trainer:', error);
        // Handle error and optionally show an error message
      }
    );
  }

  // Function to update the existing trainer details (Edit operation)
  updateTrainer(index: number, trainer: any) {
    // Send PUT request to update the trainer on the backend
    this.http.put<any>(`${this.apiUrl}/${trainer.t_id}`, trainer).subscribe(
      (response) => {
        console.log('Trainer updated:', response);
        // Update the trainer data in the list
        this.trainers[index] = response;
        // Close the form modal and reset form data
        this.closeForm();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating trainer:', error);
        // Handle error and optionally show an error message
      }
    );
  }

  // Reset the form data after submission
  resetForm() {
    this.newTrainer = { name: '', role: '', t_id: 0, email: '', ph_no: '' };
  }

  // Populate the form for editing an existing trainer
  editTrainer(index: number) {
    this.selectedTrainerIndex = index;
    this.newTrainer = { ...this.trainers[index] }; // Pre-fill the form with trainer's data
    this.showForm = true; // Show the form
    this.editMode = true; // Set the form to edit mode
  }

  // Remove a trainer from the list
  removeTrainer(index: number) {
    this.trainers.splice(index, 1);
  }

  // Open the form to add a new trainer
  openForm() {
    this.showForm = true;  // Show the form modal
    this.editMode = false;  // Set to add mode
    this.resetForm(); // Reset the form
  }

  // Close the form and hide the modal
  closeForm() {
    this.showForm = false;  // Hide the form modal
  }

  
  isSidebarOpen: boolean = true; // Initial state: sidebar is closed
 
 
 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

  
}


