import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';
import { FooterComponent } from '../footer/footer.component';
import { LayoutComponent } from '../layout/layout.component';

interface Topic {
  topic_id: number;
  topic_model: string;
  topic_completed: boolean;
  c_id: number;
  topics_topic: string;
}

interface Course {
  course_id: number;
  course_title: string;
  start_date: string;
  topic: Topic[];
}


@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent,LayoutComponent],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit{
  isSidebarOpen: boolean = true

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }


  courses: Course[] = [];  // Store courses data
  selectedCourses: { [key: string]: boolean } = {}; 
  public courseCompletionStatus: boolean[] = []; // Store completion status of each course
 

  constructor(private eventService: SharedService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.eventService.getCourses().subscribe(
      (response: any) => {
        if (response && response.courses) {
          this.courses = response.courses;
          // Initialize the selectedCourses object with all topics in the courses
          this.courses.forEach(course => {
            course.topic.forEach(topic => {
              this.selectedCourses[topic.topic_model] = topic.topic_completed;
            });
          });
        }

      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  
  onCheckboxChange(topicModel: string, topicId: number) {
    console.log(`Toggling ${topicModel} completion for Topic ID: ${topicId}`);
  
    // Toggle the completion status for the topic
    const newCompletionStatus = this.selectedCourses[topicModel];
    this.selectedCourses[topicModel] = newCompletionStatus;
    console.log( this.selectedCourses[topicModel])
    // Update the status on the server and in the local state
    this.eventService.updateEvent(topicModel, newCompletionStatus, topicId);
   
  }

  isCourseCompleted(courseIndex: number): boolean {
    if (courseIndex < 0) return true; // Edge case: return true if index is invalid or negative
    
    const course = this.courses[courseIndex];
    
    // Check if all topics of this course are completed
    return course.topic.every(topic => this.selectedCourses[topic.topic_model] === true);
  }
  
}
