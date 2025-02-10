import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../header/layout.component';
import { FooterComponent } from '../footer/footer.component';

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
  marklists: any[] = []; 
  marksMap: { [key: string]: number | null } = {}; 
  studentIds: string[] = [];  
  noMarksFound: boolean = false;
  msg='';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.selectedTrainerId = parsedUserData.trainers[0]?.trainer_id || '';
      
    }
    
    this.selectedSubject = 'Java core';
    this.selectedStudentType = 'AllStudent';
    this.fetchStudents(); 
    this.fetchMarks();  
  }

  
  
  fetchStudents(): void {
    if (!this.selectedTrainerId) {
      return;
    }

    this.http.get<any>(`http://localhost:8080/Trainer/${this.selectedTrainerId}`).subscribe(
      (response) => {
        console.log('Fetched students: ', response.ids);
        this.studentIds = response.ids;  
      },
      (error) => {
        console.error('Error occurred while fetching students:', error);
      }
    );
  }

  initialMarksMap: { [key: string]: number | null } = {};  

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
          this.marklists = marksResponse;
  
          if (this.selectedStudentType === "ReAttempt") {
          this.noMarksFound = this.marklists.length === 0;
          }
          else{
            this.noMarksFound = false; 
          }
        },
        (error) => {
          console.error('Error occurred while fetching marks:', error);
          this.noMarksFound = true; 
        }
      );

  }
  

  publishMarks(): void {
    
    let marksList;

  if (this.selectedStudentType === "ReAttempt") {
    marksList = this.marklists.map((student) => {
      return {
        stdent_id: student.stdent_id, 
        mark: student.mark ?? null, 
        subject: this.selectedSubject,
        tran_id: this.selectedTrainerId,
      };
    });
  } else {
    marksList = this.studentIds.map((id) => {
      return {
        stdent_id: id,
        mark: this.marksMap[id] ?? null,
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
        this.msg='Marks published successfully!';
              // Set timeout to clear the message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        this.msg = '';  // Clear the error message
      }, 2000);
      },
      (error) => {
        console.error('Error occurred while publishing:', error);
      }
    );
  }
  

}
