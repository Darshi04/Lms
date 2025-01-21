import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-marks',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './manager-marks.component.html',
  styleUrl: './manager-marks.component.css'
})
export class ManagerMarksComponent {
  students: any[] = [];
  subjects: string[] = [];
  studentMarks: any = {};

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/students_mark').subscribe((response: any) => {
      this.students = response.students;

      // Loop through each student and process their marks
      this.students.forEach((student: any) => {
        // If the student has no marks, we set their marks to 0 for all subjects
        if (!student.marks || student.marks.length === 0) {
          console.log('No marks for student', student.rn_id);
          this.studentMarks[student.rn_id] = {};  // Initialize student marks if they don't exist
          this.subjects.forEach(subject => {
            // Set mark to 0 for each subject if no marks are found
            this.studentMarks[student.rn_id][subject] = { mark: 0 };
          });
          return;
        }

        // Sort the marks by the edit_date in descending order to get the latest mark
        const sortedMarks = student.marks.sort((a: any, b: any) => new Date(b.edit_date).getTime() - new Date(a.edit_date).getTime());
        console.log("Sorted Marks for student", student.rn_id, sortedMarks);

        // Initialize the student's marks if not already done
        if (!this.studentMarks[student.rn_id]) {
          this.studentMarks[student.rn_id] = {};
        }

        // Loop through all marks and process them for each subject
        sortedMarks.forEach((mark: any) => {
          // Only store the latest mark for each subject
          if (!this.studentMarks[student.rn_id][mark.subject]) {
            this.studentMarks[student.rn_id][mark.subject] = {
              mark: mark.mark,
              mark_id: mark.mark_id
            };
            console.log("Updated mark for", student.rn_id, mark.subject, this.studentMarks[student.rn_id][mark.subject]);

            // Add the subject to the subjects array if it hasn't been added already
            if (!this.subjects.includes(mark.subject)) {
              this.subjects.push(mark.subject);
            }
          }
        });
      });
    });
  }

  getMarkClass(mark: number): string {
    return mark >= 75 ? 'green' : 'red';
  }
}
