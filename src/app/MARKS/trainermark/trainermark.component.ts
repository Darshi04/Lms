import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../Trainer/header/layout.component';
import { FooterComponent } from '../../Trainer/footer/footer.component';

@Component({
  selector: 'app-trainermark',
  standalone: true,
  imports: [FormsModule,CommonModule,LayoutComponent,FooterComponent],
  templateUrl: './trainermark.component.html',
  styleUrl: './trainermark.component.css'
})
export class TrainermarkComponent implements OnInit{
  selectedTrainerId: string = '';
  selectedSubject: string = '';
  selectedStudentType: string = ''; 
  marklists: any[] = []; // Holds the fetched marks
  marksMap: { [key: string]: number | null } = {}; // Holds marks for new submissions
  studentIds: string[] = [];  // To store the fetched student IDs
  noMarksFound: boolean = false; // Flag to indicate if no marks are found for reattempt students

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.selectedTrainerId = parsedUserData.trainers[0]?.trainer_id || '';
      
    }
    
    this.selectedSubject = 'Java core';
    this.selectedStudentType = 'AllStudent'; // Default value
    this.fetchStudents(); // Fetch students when component initializes
    this.fetchMarks();  // Fetch marks based on selected parameters
  }

  
  
  // This method fetches the students based on the selected trainer ID
  fetchStudents(): void {
    if (!this.selectedTrainerId) {
      return;
    }

    this.http.get<any>(`http://localhost:8080/Trainer/${this.selectedTrainerId}`).subscribe(
      (response) => {
        console.log('Fetched students: ', response.ids);
        this.studentIds = response.ids;  // Store the fetched student IDs
      },
      (error) => {
        console.error('Error occurred while fetching students:', error);
      }
    );
  }

  initialMarksMap: { [key: string]: number | null } = {};  // Holds initial marks of students

  fetchMarks(): void {
    if (!this.selectedTrainerId || !this.selectedSubject || !this.selectedStudentType) {
      return;
    }

    this.marklists = [];
  this.marksMap = {};
  
    const markRequest = {
      trainerId: this.selectedTrainerId,
      subject: this.selectedSubject,
      studentType: this.selectedStudentType,
    };
  
    
      this.http.post<any>('http://localhost:8080/Marks', markRequest).subscribe(
        (marksResponse) => {
          console.log('Fetched marks: ', marksResponse);
          this.marklists = marksResponse; // Assuming the response contains the mark data
  
          // Handle case when no reattempt marks are found
          if (this.selectedStudentType === "ReAttempt") {
          this.noMarksFound = this.marklists.length === 0;
          }
          else{
            this.noMarksFound = false; 
          }
        },
        (error) => {
          console.error('Error occurred while fetching marks:', error);
          this.noMarksFound = true; // In case of error, assume no marks are found
        }
      );
      
        
       
    

    // if (this.selectedStudentType === "ReAttempt") {
    //   this.http.post<any>('http://localhost:8080/Marks', markRequest).subscribe(
    //     (marksResponse) => {
    //       console.log('Fetched marks: ', marksResponse);
    //       this.marklists = marksResponse; // Assuming the response contains the mark data
  
    //       // Handle case when no reattempt marks are found
    //       this.noMarksFound = this.marklists.length === 0;
    //     },
    //     (error) => {
    //       console.error('Error occurred while fetching marks:', error);
    //       this.noMarksFound = true; // In case of error, assume no marks are found
    //     }
    //   );
    // } else {
    //   // Fetch marks for all students
    //   this.http.post<any>('http://localhost:8080/Marks', markRequest).subscribe(
    //     (marksResponse) => {
    //       console.log('Fetched marks: ', marksResponse);
    //       this.marklists = marksResponse; // Assuming the response contains the mark data
    //       this.noMarksFound = false; // Marks found, reset the flag
    //     },
    //     (error) => {
    //       console.error('Error occurred while fetching marks:', error);
    //       this.noMarksFound = true; // In case of error, assume no marks are found
    //     }
    //   );
    // }
  }
  

  // Publish marks for all students
  publishMarks(): void {
    // const marksList = this.studentIds.map((id) => {
    //   return {
    //     stdent_id: id, // Use correct backend field name
    //     mark: this.marksMap[id] ?? null, // Ensure correct mark value
    //     subject: this.selectedSubject,
    //     tran_id: this.selectedTrainerId,
    //   };
    // });

    // const markRequest = {
    //   marklist: marksList,
    //   trainerId: this.selectedTrainerId,
    //   subject: this.selectedSubject,
    // };
    let marksList; // Declare marksList outside the if-else block

  if (this.selectedStudentType === "ReAttempt") {
    marksList = this.marklists.map((student) => {
      return {
        stdent_id: student.stdent_id, // Corrected field name for student ID
        mark: student.mark ?? null, // Ensures mark value is set to null if undefined
        subject: this.selectedSubject,
        tran_id: this.selectedTrainerId,
      };
    });
  } else {
    marksList = this.studentIds.map((id) => {
      return {
        stdent_id: id, // Correct field name for student ID
        mark: this.marksMap[id] ?? null, // Ensures mark value is set to null if undefined
        subject: this.selectedSubject,
        tran_id: this.selectedTrainerId,
      };
    });
  }

  const markRequest = {
    marklist: marksList,
    trainerId: this.selectedTrainerId,
    subject: this.selectedSubject,
  };

    this.http.post('http://localhost:8080/publish_marks', markRequest).subscribe(
      (response) => {
        console.log('Marks published successfully: ', response);
        alert('Marks published successfully!');
      },
      (error) => {
        console.error('Error occurred while publishing:', error);
      }
    );
  }
  

  // // Attempt to publish reattempt marks (if needed)
  // attemptMarks(): void {
    
  //   const marksList = this.marklists.map((student) => {
  //     return {
  //       stdent_id: student.stdent_id, // Correct usage for student ID
  //       mark: student.mark ?? null, // Ensure correct mark value
  //       subject: this.selectedSubject,
  //       tran_id: this.selectedTrainerId,
  //     };
  //   });
  
  //   const markRequest = {
  //     marklist: marksList,
  //     trainerId: this.selectedTrainerId,
  //     subject: this.selectedSubject,
  //   };

  //   this.http.post('http://localhost:8080/publish_marks', markRequest).subscribe(
  //     (response) => {
  //       console.log('Marks published successfully: ', response);
  //       console.log('Marks published successfully!');
  //     },
  //     (error) => {
  //       console.error('Error occurred while publishing:', error);
  //     }
  //   );
  // }
}
