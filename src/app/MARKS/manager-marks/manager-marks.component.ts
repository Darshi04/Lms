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

  selectedMarkHistory: any[] = []; 
  selectedStudentName: any;
  selectedSubject: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/students_mark').subscribe((response: any) => {
      this.students = response.students;
      this.subjects = this.extractSubjects(response.students);
      

      // Loop through each student and process their marks
      this.students.forEach((student: any) => {
        // If the student has no marks, set them to 0 for all subjects
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
        
        
        const subjectMarks: { [subject: string]: any[] } = {};  // To track marks for each subject

        // Loop through all marks and store them in subjectMarks
        sortedMarks.forEach((mark: any) => {
          if (!subjectMarks[mark.subject]) {
            subjectMarks[mark.subject] = [];
          }
          subjectMarks[mark.subject].push(mark);
          
          // Add the subject to the subjects array if it hasn't been added already
          if (!this.subjects.includes(mark.subject)) {
            this.subjects.push(mark.subject);
          }
          this.studentMarks[student.rn_id].marks = sortedMarks;
        });

        // Now process the marks and set the reattempt flag for each subject
        Object.keys(subjectMarks).forEach(subject => {
          const marksForSubject = subjectMarks[subject];
          const isReattempt = marksForSubject.length > 1;  // If more than 1 mark exists, it's a reattempt

          // Store the latest mark for each subject
          this.studentMarks[student.rn_id][subject] = {
            mark: marksForSubject[0].mark,
            mark_id: marksForSubject[0].mark_id,
            isReattempt: isReattempt
          };
          console.log("Updated mark for", student.rn_id, subject, this.studentMarks[student.rn_id][subject]);
        });
      });
    });
  }

  extractSubjects(students: any[]): string[] {
    const subjects = new Set<string>();
    students.forEach(student => {
      student.marks.forEach((mark: any) => {
        subjects.add(mark.subject);
      });
    });
    return Array.from(subjects);
  }


  processStudentMarks(students: any[]): void {
    students.forEach((student: any) => {
      const sortedMarks = student.marks.sort((a: any, b: any) => new Date(b.edit_date).getTime() - new Date(a.edit_date).getTime());
      // Organize marks by subject and store them in an array
      this.studentMarks[student.rn_id] = this.organizeMarksBySubject(sortedMarks);
    });
    console.log('Student Marks:', this.studentMarks);  // Log to verify the structure
  }
  
  
  
  
  // Organize marks by subject
  organizeMarksBySubject(sortedMarks: any[]): any {
    const subjectMarks: { [subject: string]: any[] } = {};  // Ensure it's an array of marks for each subject
    sortedMarks.forEach((mark: any) => {
      if (!subjectMarks[mark.subject]) {
        subjectMarks[mark.subject] = [];
      }
      subjectMarks[mark.subject].push(mark);  // Store all marks for each subject
    });
    return subjectMarks;
  }
  

  // showMarkHistory(studentId: string, subject: string): void {
  //   console.log('Student ID:', studentId, 'Subject:', subject);

  //   const student = this.students.find(s => s.rn_id === studentId);
  //   if (student) {
  //     this.selectedStudentName = student.student_name;
  //     this.selectedSubject = subject;

  //     // Retrieve all marks for the selected student and subject
  //     const studentMarkHistory = student.marks.filter((mark: any) => mark.subject === subject);

  //     // Ensure selectedMarkHistory is an array
  //     this.selectedMarkHistory = Array.isArray(studentMarkHistory) ? studentMarkHistory : [studentMarkHistory];

  //     console.log('Selected Mark History:', this.selectedMarkHistory);  // This will show all marks for the subject
  //   }
  // }
  showMarkHistory(studentId: string, subject: string): void {
    console.log('Student ID:', studentId, 'Subject:', subject);
  
    const student = this.students.find(s => s.rn_id === studentId);
    if (student) {
      this.selectedStudentName = student.student_name;
      this.selectedSubject = subject;
  
      // Retrieve all marks for the selected student and subject
      const studentMarkHistory = student.marks.filter((mark: any) => mark.subject === subject);
  
      // Ensure selectedMarkHistory is an array
      this.selectedMarkHistory = Array.isArray(studentMarkHistory) ? studentMarkHistory : [studentMarkHistory];
  
      console.log('Selected Mark History:', this.selectedMarkHistory);  // This will show all marks for the subject
    }
  }
  
  
  
  
  
  getMarkClass(studentId: string, subject: string, mark: number): string {
    // Check if the student has a reattempt for this subject
    const marksForSubject = this.studentMarks[studentId][subject];
    const isReattempt = marksForSubject?.isReattempt || false;
    console.log(isReattempt);
  
    // If it's a reattempt and the mark is below 75, return 'red' class
    if (isReattempt && mark < 75) {
      return 'red';
    }
  
    // If it's a reattempt but the mark is 75 or above, return 'yellow'
    if (isReattempt) {
      return 'yellow';
    }
  
    // Green for marks >= 75, red for marks < 75
    return mark >= 75 ? 'green' : 'red';
  }
  
}


