import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent {
  showForm: boolean = false;  // Controls visibility of the form modal
  editMode: boolean = false;  // Tracks whether we are in "edit" mode
  selectedTrainerIndex: number = -1;  // Tracks the index of the trainer being edited

  // Initial list of trainers
  trainers = [
    {
      name: "Sri Praveen",
      designation: "Full Stack Developer",
      photo: "https://i.imgur.com/tmdHXOY.jpg",
      email: "praveenvgmail.com",
      phone: "546789",
      address: "Chennai"
    },
    {
      name: "Lakshmi",
      designation: "Full Stack Developer",
      photo: "https://i.imgur.com/o5uMfKo.jpg",
      email: "lakshmi@gmail.com",
      phone: "123456",
      address: "Chennai"
    }
  ];

  // Object to hold new or edited trainer data
  newTrainer = {
    name: '',
    designation: '',
    photo: '',
    email: '',
    phone: '',
    address: ''
  };

  // Opens the modal form and hides the "+" card
  openForm() {
    this.showForm = true;
    this.editMode = false;
    this.resetForm();
  }

  // Closes the modal form and shows the "+" card
  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  // Handles form submission for adding a new trainer
  submitTrainer() {
    if (this.newTrainer.name && this.newTrainer.designation && this.newTrainer.photo &&
        this.newTrainer.email && this.newTrainer.phone && this.newTrainer.address) {
      
      if (this.editMode) {
        // Update the trainer details
        this.trainers[this.selectedTrainerIndex] = { ...this.newTrainer };
      } else {
        // Add new trainer to the list
        this.trainers.push({ ...this.newTrainer });
      }
      
      this.closeForm();  // Hide the form after submission
    }
  }

  // Populates the form for editing a specific trainer
  editTrainer(index: number) {
    this.selectedTrainerIndex = index;
    this.newTrainer = { ...this.trainers[index] };  // Pre-fill the form with trainer's data
    this.showForm = true;
    this.editMode = true;
  }

  // Removes a trainer from the list
  removeTrainer(index: number) {
    this.trainers.splice(index, 1);  // Remove the trainer at the specified index
  }

  // Resets the form data
  resetForm() {
    this.newTrainer = {
      name: '',
      designation: '',
      photo: '',
      email: '',
      phone: '',
      address: ''
    };
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newTrainer.photo = e.target.result; // This will store the image as a base64 string
      };
      reader.readAsDataURL(file); // Converts image to base64
    }
  }
  
}
