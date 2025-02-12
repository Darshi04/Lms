import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-manager-marks',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
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
      console.log(response);
      
      this.students = response.students;
      this.subjects = this.extractSubjects(response.students);
      
     
      this.students.forEach((student: any) => {
        
        if (!student.marks || student.marks.length === 0) {
          console.log('No marks for student', student.rn_id);
          this.studentMarks[student.rn_id] = {};  
          this.subjects.forEach(subject => {
            this.studentMarks[student.rn_id][subject] = { mark: 0 };
          });
          return;
        }
  
        
        const sortedMarks = student.marks
          .filter((mark: any) => mark.mark !== null) 
          .sort((a: any, b: any) => new Date(b.edit_date).getTime() - new Date(a.edit_date).getTime());
  
        console.log("Sorted Marks for student", student.rn_id, sortedMarks);
  
        if (!this.studentMarks[student.rn_id]) {
          this.studentMarks[student.rn_id] = {};
        }

  
        const subjectMarks: { [subject: string]: any[] } = {};  
  
        
        sortedMarks.forEach((mark: any) => {
          if (!subjectMarks[mark.subject]) {
            subjectMarks[mark.subject] = [];
          }
          subjectMarks[mark.subject].push(mark);
          
          if (!this.subjects.includes(mark.subject)) {
            this.subjects.push(mark.subject);
          }
          this.studentMarks[student.rn_id].marks = sortedMarks;
        });
  
        Object.keys(subjectMarks).forEach(subject => {
          const marksForSubject = subjectMarks[subject];
          const isReattempt = marksForSubject.length > 1;  

          this.studentMarks[student.rn_id][subject] = {
            mark: marksForSubject.length > 0 ? marksForSubject[0].mark : 0,  
            mark_id: marksForSubject.length > 0 ? marksForSubject[0].mark_id : null,
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
     
      this.studentMarks[student.rn_id] = this.organizeMarksBySubject(sortedMarks);
    });
    console.log('Student Marks:', this.studentMarks); 
  }
  
  
  
  
 
  organizeMarksBySubject(sortedMarks: any[]): any {
    const subjectMarks: { [subject: string]: any[] } = {};  
    sortedMarks.forEach((mark: any) => {
      if (!subjectMarks[mark.subject]) {
        subjectMarks[mark.subject] = [];
      }
      subjectMarks[mark.subject].push(mark);
    });
    return subjectMarks;
  }
  

 


  showMarkHistory(studentId: string, subject: string): void {
    console.log('Student ID:', studentId, 'Subject:', subject);
  
    const student = this.students.find(s => s.rn_id === studentId);
    if (student) {
      this.selectedStudentName = student.student_name;
      this.selectedSubject = subject;
  
      const studentMarkHistory = student.marks.filter((mark: any) => mark.subject === subject && mark.mark !== null);
  
      this.selectedMarkHistory = Array.isArray(studentMarkHistory) ? studentMarkHistory : [studentMarkHistory];
  
      console.log('Selected Mark History:', this.selectedMarkHistory);
    }
  }
  
  
  
  
  
  getMarkClass(studentId: string, subject: string, mark: number): string {
    
    const marksForSubject = this.studentMarks[studentId][subject];
    const isReattempt = marksForSubject?.isReattempt || false;
    console.log(isReattempt);
  
    if (isReattempt && mark < 75) {
      return 'red';
    }
    if (isReattempt) {
      return 'yellow';
    }
  
    return mark >= 75 ? 'green' : 'red';
  }
  
}


