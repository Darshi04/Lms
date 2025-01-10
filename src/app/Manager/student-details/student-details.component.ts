import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  students = [
    { id: 1, rnNumber: 'RN21326', name: 'Arun', role: 'Developer', email: 'john.doe@example.com', skills: 'front-end', avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png', status: 'Active' },
    { id: 2, rnNumber: 'RN21327', name: 'Dhanalakshmi', role: 'Developer', email: 'jane.smith@example.com', skills: 'java', avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png', status: 'Pending' },
    { id: 3, rnNumber: 'RN21328', name: 'Dharshini', role: 'Developer', email: 'mark.wilson@example.com', skills: 'cloud', avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png', status: 'Done' },
    { id: 4, rnNumber: 'RN21329', name: 'Wincy', role: 'Developer', email: 'mark.wilson@example.com', skills: 'cloud', avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png', status: 'Close' }
  ];

  filteredStudents = [...this.students];
  empid: string = '';
  skill: string = '';
  isRNSearch: boolean = true;
  addingNewStudent: boolean = false;
  editingStudent: boolean = false;
  newStudent = { id: 0, rnNumber: '', name: '', role: '', email: '', skills: '', avatar: '', status: '' };

  toggleSearchMode() {
    this.empid = '';
    this.skill = '';
    this.filteredStudents = [...this.students];
  }

  filterStudents() {
    if (this.empid) {
      this.filteredStudents = this.students.filter(student =>
        student.rnNumber.toLowerCase().includes(this.empid.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  skillfilters() {
    if (this.skill) {
      this.filteredStudents = this.students.filter(student =>
        student.skills.toLowerCase().includes(this.skill.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  deleteStudent(studentId: number) {
    this.students = this.students.filter(student => student.id !== studentId);
    this.filteredStudents = [...this.students];
  }

  startAddingNewStudent() {
    this.addingNewStudent = true;
    this.newStudent = { id: 0, rnNumber: '', name: '', role: '', email: '', skills: '', avatar: '', status: '' };
  }

  saveNewStudent() {
    if (this.newStudent.rnNumber && this.newStudent.name && this.newStudent.skills) {
      const newId = this.students.length ? Math.max(...this.students.map(student => student.id)) + 1 : 1;
      this.newStudent.id = newId;
      this.students.push({ ...this.newStudent });
      this.filteredStudents = [...this.students];
      this.addingNewStudent = false;
    }
  }

  cancelAddingNewStudent() {
    this.addingNewStudent = false;
  }

  // Edit student
  editStudent(student: any) {
    this.newStudent = { ...student };
    this.editingStudent = true;
    this.addingNewStudent = false;
  }

  // Save edited student
  saveEditedStudent() {
    const studentIndex = this.students.findIndex(student => student.id === this.newStudent.id);
    if (studentIndex !== -1) {
      this.students[studentIndex] = { ...this.newStudent };
      this.filteredStudents = [...this.students];
      this.editingStudent = false;
    }
  }

  cancelEditingStudent() {
    this.editingStudent = false;
  }

  // Handling image upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newStudent.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
