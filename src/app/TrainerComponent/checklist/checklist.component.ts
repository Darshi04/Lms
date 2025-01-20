import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';
import { FooterComponent } from '../footer/footer.component';
import { LayoutComponent } from '../layout/layout.component';





interface Topic {
  topic: string;
  model: string;
}

interface Course {
  title: string;
  topics: Topic[];
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


  public courses: Course[] = [];

  public selectedCourses: { [key: string]: boolean } = {};  

  constructor(private eventService: SharedService) {}

  ngOnInit() {
    this.loadCourses();
    this.eventService.event$.subscribe(events => {
      this.selectedCourses = events;  
    });
  }

  loadCourses() {
    this.eventService.getCourses().subscribe((response: any) => {
      this.courses = response.courses;
    }, (error) => {
      console.error('Error fetching courses:', error);
    });
  }

  onCheckboxChange(topic: string) {
    this.selectedCourses[topic] = !this.selectedCourses[topic];  
    this.eventService.updateEvent(topic, this.selectedCourses[topic]);  
  }

  isCourseCompleted(courseIndex: number): boolean {
    if (courseIndex < 0) return true; 

    const course = this.courses[courseIndex];
    return course.topics.every(topic => this.selectedCourses[topic.model]);
  }
  
}
