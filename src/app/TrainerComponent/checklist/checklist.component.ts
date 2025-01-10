import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';





interface Topic {
  topic: string;
  model: string;
}

interface Course {
  title: string;
  description: string;
  topics: Topic[];
}


@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit{

  public courses: Course[] = [
    {
      title: 'OOPS',
      description: 'Learn the fundamentals of Java programming, including OOP concepts, Collections, and more.',
      topics: [
        { topic: 'Object-Oriented Programming (OOP)', model: 'javaOop' },
        { topic: 'Collections Framework', model: 'javaCollections' },
        { topic: 'Exception Handling', model: 'javaExceptions' }
      ]
    },
    {
      title: 'SDLC',
      description: 'Understand the Software Development Life Cycle (SDLC) and its phases, including planning, design, development, testing, and deployment.',
      topics: [
        { topic: 'Planning Phase', model: 'sdlcPlanning' },
        { topic: 'Design Phase', model: 'sdlcDesign' },
        { topic: 'Development Phase', model: 'sdlcDevelopment' },
        { topic: 'Testing Phase', model: 'sdlcTesting' },
        { topic: 'Deployment Phase', model: 'sdlcDeployment' }
      ]
    },
    {
      title: 'Spring Boot',
      description: 'Master Spring Boot for building microservices and web applications with powerful dependency injection and auto-configuration.',
      topics: [
        { topic: 'Microservices', model: 'springBootMicroservices' },
        { topic: 'REST APIs', model: 'springBootREST' },
        { topic: 'Security in Spring Boot', model: 'springBootSecurity' }
      ]
    },
    {
      title: 'Angular',
      description: 'Learn Angular to build dynamic and responsive web applications using components, directives, and services.',
      topics: [
        { topic: 'Components', model: 'angularComponents' },
        { topic: 'Directives', model: 'angularDirectives' },
        { topic: 'Services', model: 'angularServices' }
      ]
    },
    // Add more courses as needed
  ];

  public selectedCourses: { [key: string]: boolean } = {};  // Local state of selected courses

  constructor(private eventService: SharedService) {}

  ngOnInit() {
    this.eventService.event$.subscribe(events => {
      this.selectedCourses = events;  // Initialize local state with values from localStorage
    });
  }

  onCheckboxChange(topic: string) {
    this.selectedCourses[topic] = !this.selectedCourses[topic];  // Toggle the selection
    this.eventService.updateEvent(topic, this.selectedCourses[topic]);  // Update in SharedService
  }

  isCourseCompleted(i: number): boolean {
    if (i < 0) return true; // If there is no previous course (i.e., for the first course), it's considered completed.
  
    const course = this.courses[i];
    return course.topics.every(topic => this.selectedCourses[topic.model]);
  }
  
}
