// shared.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export interface Topic {
  topic_id: number;
  topic_model: string;
  topic_completed: boolean;  // This indicates if the topic is completed
  c_id: number;
  topics_topic: string;
}


export interface Course {
  course_id: number;
  course_title: string;
  start_date: string;
  topics: Topic[];
}


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private localStorageKey = 'selectedTopics';
  private baseUrl = 'http://localhost:8080';

  private eventSubject = new BehaviorSubject<{ [key: string]: boolean }>(this.getStoredEvents());
  event$ = this.eventSubject.asObservable();
  courses: Course[] = [];

  constructor(private http: HttpClient) {}

  getStoredEvents(): { [key: string]: boolean } {
    const storedEvents = localStorage.getItem(this.localStorageKey);
    return storedEvents ? JSON.parse(storedEvents) : {};
  }
  

  getCourses() {
    return this.http.get<{ courses: Course[] }>(`${this.baseUrl}/course`).pipe(
      tap((response: any) => {
        console.log('Courses Response:', response);
  
        // Ensure courses and topics are correctly mapped, including 'completed' status
        if (response && Array.isArray(response.courses)) {
          this.courses = response.courses.map((course: any) => ({
            course_id: course.course_id,
            course_title: course.course_title,
            start_date: course.start_date,
            topics: course.topic.map((topic: any) => ({
              topic_name: topic.topics_topic,  // Mapping the topic name
              completed: topic.topic_completed  // Using the correct 'completed' value from the database
            }))
          }));
        } else {
          console.error('Courses data is invalid or missing:', response);
        }
      })
    );
  }
  
  
  

  getTopics(courseId: number) {
    return this.http.get<{ topics: Topic[] }>(`${this.baseUrl}/topics/${courseId}`).pipe(
      tap((response: any) => {
        console.log('Topics Response:', response);
      })
    );
  }

  updateEvent(topicModel: string, completed: boolean, topicId: number) {
    const currentEvents = this.eventSubject.value;
    currentEvents[topicModel] = completed;
  
    // Update the local state and sync with localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentEvents));
    this.eventSubject.next(currentEvents);  // Notify the roadmap component about the update
  
    // Update the topic completion status in the backend
    this.updateTopicStatus(topicId, completed);
  }
  



private updateTopicStatus(topicId: number, completed: boolean) {
    // Use the actual topicId passed as an argument, instead of a hardcoded value
    this.http.put(`${this.baseUrl}/topics/${topicId}`, { topic_completed: completed }).subscribe({
        next: (response) => {
            console.log('Topic updated successfully:', response);
        },
        error: (error) => {
            console.error('Error updating topic:', error);
        }
    });
}


  private getTopicIdByModel(topicModel: string): number {
    // This should ideally return the correct topic ID based on the topic model
    return 1;
  }
}