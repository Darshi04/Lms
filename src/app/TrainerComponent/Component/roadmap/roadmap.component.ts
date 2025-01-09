import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTimelineModule } from '@frxjs/ngx-timeline';
import { SharedService } from '../../shared.service';



enum NgxTimelineEventChangeSide {
  ALL = 'ALL',
  ALL_IN_GROUP = 'ALL_IN_GROUP',
  ON_DIFFERENT_DAY_IN_GROUP = 'ON_DIFFERENT_DAY_IN_GROUP',
  ON_DIFFERENT_HMS_IN_GROUP = 'ON_DIFFERENT_HMS_IN_GROUP',
  ON_DIFFERENT_MONTH_IN_GROUP = 'ON_DIFFERENT_MONTH_IN_GROUP'
}

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxTimelineModule],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoadmapComponent implements OnInit{
  NgxTimelineEventChangeSide = NgxTimelineEventChangeSide;
  changeSide = NgxTimelineEventChangeSide.ALL; // Set default value here
  

  events = [
    { 
      timestamp: new Date('2025-01-01 12:30'), 
      title: 'OOPS', 
      description: 'Learn the fundamentals of Java programming, including OOP concepts, Collections, and more.', 
      topics: [
        { topic: 'Object-Oriented Programming (OOP)', completed: false }, 
        { topic: 'Collections Framework', completed: false }, 
        { topic: 'Exception Handling', completed: false }
      ]
    },
    { 
      timestamp: new Date('2025-01-14 3:00'), 
      title: 'SDLC', 
      description: 'This is an SDLC concept', 
      topics: [
        { topic: 'Planning Phase', completed: false }, 
        { topic: 'Design Phase', completed: false }, 
        { topic: 'Development Phase', completed: false }, 
        { topic: 'Testing Phase', completed: false }, 
        { topic: 'Deployment Phase', completed: false }
      ]
    },
    { 
      timestamp: new Date('2025-02-3 10:00'), 
      title: 'Spring Boot', 
      description: 'Master Spring Boot for building microservices and web applications with powerful dependency injection and auto-configuration.', 
      topics: [
        { topic: 'Microservices', completed: false }, 
        { topic: 'REST APIs', completed: false }, 
        { topic: 'Security in Spring Boot', completed: false }, 
      ]
    },
    { 
      timestamp: new Date('2025-02-25 3:00'), 
      title: 'Angular', 
      description: 'Learn Angular to build dynamic and responsive web applications using components, directives, and services.', 
      topics: [
        { topic: 'Components', completed: false }, 
        { topic: 'Directives', completed: false }, 
        { topic: 'Services', completed: false }, 
      ]
    }
  ];
  

  constructor(private eventService: SharedService) {}

  ngOnInit() {
    this.eventService.event$.subscribe(events => {
      this.updateEventStatus(events);
    });
  }

  updateEventStatus(events: { [key: string]: boolean }) {
    this.events.forEach(event => {
      event.topics.forEach(t => {
        if (events.hasOwnProperty(t.topic)) {
          t.completed = events[t.topic];  // Update the completed status of topics
        }
      });
    });
  }

  getTopicIconColor(topic: any) {
    if (topic.completed) {
      return '#63E6BE'; // Green for completed
    } else {
      // return '#74C0FC'; // Gray for not completed\
      return '#ccc'
    }
  }

  
  
  getCenterIconColor(event: any) {
    const allCompleted = event.eventInfo.topics.every((topic: any) => topic.completed);
    
    if (allCompleted) {
      return '#63E6BE'; // Green when all topics are completed
    } else if (event.eventInfo.topics.some((topic: any) => topic.completed)) {
      return '#FFD43B'; // Yellow when some topics are completed
    } else {
      return '#74C0FC'; // Blue when no topic is completed
    }
  }
  

  handleClick(event: any) {
    console.log('Event clicked:', event);
  }
}



