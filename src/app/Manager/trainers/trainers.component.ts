import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../Trainer/footer/footer.component";
import { TrainerService } from '../../trainer.service';


@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent implements OnInit {
  // Flags and variables for managing trainers and form states
  trainers: { name: string, role: string, t_id: number, email: string, ph_no: string }[] = [];
  newTrainer = { name: '', role: '', t_id: 0, email: '', ph_no: '' };
  showForm: boolean = false;
  editMode: boolean = false;
  selectedTrainerIndex: number = -1;

  // API URL for trainer operations
  private apiUrl = 'http://localhost:8081/trainers'; // Replace with your backend API URL

  // Sidebar toggle flag
  isSidebarOpen: boolean = true;

  // Error flags
  errorMessage: string = '';

  constructor(private http: HttpClient,private trainerService:TrainerService) {}

  ngOnInit() {
    this.loadTrainers();  // Load trainers when the component initializes
 
  }

   // Fetch trainers from the backend
   loadTrainers() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.trainers = response;
        console.log('Loaded trainers:', this.trainers);

        // Extract the trainerIds and pass them to the TrainerService
        const trainerIds = this.trainers.map(trainer => trainer.t_id);
        this.trainerService.setTrainerIds(trainerIds);  // Set the trainerIds in the service
      },
      (error) => {
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

  // Handle form submission for saving or updating the trainer
  submitTrainer() {
    if (this.newTrainer.name && this.newTrainer.role && this.newTrainer.email && this.newTrainer.ph_no) {
      if (this.editMode) {
        this.updateTrainer(this.selectedTrainerIndex, this.newTrainer);
      } else {
        this.saveTrainer(this.newTrainer);
      }
    } else {
      this.errorMessage = 'All fields are required!';
    }
  }

  // Add a new trainer to the backend (POST operation)
  saveTrainer(trainer: { name: string, role: string, t_id: number, email: string, ph_no: string }) {
    const randomPassword = this.generateRandomPassword(8);  // Generate a password of length 8
    const data = { ...trainer, password: randomPassword };

    this.http.post<any>(this.apiUrl, data).subscribe(
      (response) => {
        console.log('Trainer saved:', response);
        this.trainers.push(response);  // Add trainer to list
        this.closeForm();
        this.resetForm();
      },
      (error) => {
        console.error('Error saving trainer:', error);
        this.errorMessage = 'Failed to save trainer. Please try again.';
      }
    );
  }

  // Update an existing trainer in the backend (PUT operation)
  updateTrainer(index: number, trainer: { name: string, role: string, t_id: number, email: string, ph_no: string }) {
    this.http.put<any>(`${this.apiUrl}/${trainer.t_id}`, trainer).subscribe(
      (response) => {
        console.log('Trainer updated:', response);
        this.trainers[index] = response;  // Update trainer in list
        this.closeForm();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating trainer:', error);
        this.errorMessage = 'Failed to update trainer. Please try again.';
      }
    );
  }

  // Reset the form data after submission
  resetForm() {
    this.newTrainer = { name: '', role: '', t_id: 0, email: '', ph_no: '' };
    this.errorMessage = ''; // Reset any previous error messages
  }

  // Populate the form for editing an existing trainer
  editTrainer(index: number) {
    this.selectedTrainerIndex = index;
    this.newTrainer = { ...this.trainers[index] };  // Pre-fill the form with trainer's data
    this.showForm = true;  // Show the form
    this.editMode = true;  // Set the form to edit mode
  }

  // Remove a trainer from the list (also delete from backend if needed)
  removeTrainer(index: number) {
    const trainerId = this.trainers[index].t_id;

    this.http.delete<any>(`${this.apiUrl}/${trainerId}`).subscribe(
      (response) => {
        console.log('Trainer removed:', response);
        this.trainers.splice(index, 1);  // Remove trainer from the list
      },
      (error) => {
        console.error('Error removing trainer:', error);
        this.errorMessage = 'Failed to remove trainer. Please try again.';
      }
    );
  }

  // Open the form to add a new trainer
  openForm() {
    this.showForm = true;  // Show the form modal
    this.editMode = false;  // Set to add mode
    this.resetForm();  // Reset the form
  }

  // Close the form and hide the modal
  closeForm() {
    this.showForm = false;  // Hide the form modal
  }

  // Toggle the sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;  // Toggle the sidebar state
  }
 
}