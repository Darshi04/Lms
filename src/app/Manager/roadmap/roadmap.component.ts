import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTimelineModule } from '@frxjs/ngx-timeline';
import { SharedService } from '../../shared.service';

interface Topic {
  topic: string;
  model: string;
  completed: boolean;
}

interface Course {
  title: string;
  topics: Topic[];
  start_date: string;  
}

interface Event {
  timestamp: Date;  
  title: string;
  start_date: string;
  topics: Topic[];
}

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
  changeSide = NgxTimelineEventChangeSide.ALL;
  

  events: Event[] = [];  

  constructor(private eventService: SharedService) {}

  ngOnInit() {
    this.eventService.event$.subscribe((events) => {
      this.updateEventStatus(events);
    });

    this.eventService.getCourses().subscribe((response: any) => {
      this.events = response.courses.map((course: Course) => ({
        timestamp: new Date(course.start_date),
        title: course.title,
        topics: course.topics.map((topic: Topic) => ({
          topic: topic.topic,
          completed: this.eventService.getStoredEvents()[topic.model] || false
        }))
      }));
    });
  }

  updateEventStatus(events: { [key: string]: boolean }) {
    this.events.forEach((event: Event) => { 
      event.topics.forEach((t: Topic) => {
        if (events.hasOwnProperty(t.topic)) {
          t.completed = events[t.topic];  
        }
      });
    });
  }

  getTopicIconColor(topic: any) {
    if (topic.completed) {
      return '#63E6BE'; // Green for completed
    } else {
      return '#ccc'; // Gray for not completed
    }
  }

  getCenterIconColor(event: any) {
    const allCompleted = event.eventInfo.topics.every((topic: any) => topic.completed);

    if (allCompleted) {
      return '#63E6BE'; // Green when all topics are completed
    } else if (event.eventInfo.topics.some((topic: any) => topic.completed)) {
      return '#FFD43B'; // Yellow when some topics are completed
    } else {
      return '#ccc';
      // return '#74C0FC'; // Blue when no topic is completed
    }
  }

  handleClick(event: any) {
    console.log('Event clicked:', event);
  }
}



