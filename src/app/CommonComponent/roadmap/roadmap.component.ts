import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTimelineModule } from '@frxjs/ngx-timeline';
import { SharedService } from '../../shared.service';
import { HeaderComponent } from '../../Manager/header/header.component';
import { TraineeHeaderComponent } from '../../trainee/trainee-header/trainee-header.component';



interface Topic {
  completed: boolean;
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
  topics: Topic[];
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
      this.updateEventStatus(events);  // Update the roadmap with the latest completion status
    });
  
    // Fetch courses and topics with their updated completion status
    this.eventService.getCourses().subscribe((response: any) => {
      if (response && Array.isArray(response.course)) {
        this.events = response.course.map((course: any) => ({
          timestamp: new Date(course.start_date),
          title: course.course_title,
          topics: course.topic.map((topic: Topic) => ({
            topic_name: topic.topics_topic,
            completed: topic.topic_completed  // Ensuring the latest 'completed' status from the backend
          }))
        }));
  
        console.log('Mapped events with topics:', this.events);
      } else {
        console.error('Courses data is missing or invalid:', response);
      }
    });
  }
  
  

updateEventStatus(events: { [key: string]: boolean }) {
    this.events.forEach((event: Event) => { 
        event.topics.forEach((t: Topic) => {
            if (events.hasOwnProperty(t.topics_topic)) {
                t.completed = events[t.topics_topic];  // Update status for each topic
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



