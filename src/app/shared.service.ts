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
  private baseUrl = 'http://localhost:8080';

  private eventSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  event$ = this.eventSubject.asObservable();
  courses: Course[] = [];

  constructor(private http: HttpClient) {}

  
  getCourses() {
    return this.http.get<{ msg: string, course: Course[] }>(`${this.baseUrl}/course`).pipe(
      tap((response: any) => {
        console.log('Courses Response:', response);
  
        if (response && Array.isArray(response.course)) {  
          this.courses = response.course.map((course: any) => ({
            course_id: course.course_id,
            course_title: course.course_title,
            start_date: course.start_date,
            topic: course.topic.map((topic: any) => ({
              topic_model: topic.topics_topic, 
              topic_completed: topic.topic_completed 
            }))
          }));
        } else {
          console.error('Courses data is invalid or missing:', response);
        }
      })
    );
  }
  

  
  
  
  

  getTopics(courseId: number) {
    return this.http.get<{ topics: Topic[] }>(`${this.baseUrl}/Topics/${courseId}`).pipe(
      tap((response: any) => {
        console.log('Topics Response:', response);
      })
    );
  }

  updateEvent(topicModel: string, completed: boolean, topicId: number) {
    const currentEvents = this.eventSubject.value;
    currentEvents[topicModel] = completed;
    this.eventSubject.next(currentEvents);
    this.updateTopicStatus(topicId, completed);
  }
  



private updateTopicStatus(topicId: number, completed: boolean) {
    this.http.put(`${this.baseUrl}/Topics/${topicId}`, { topic_completed: completed }).subscribe({
        next: (response) => {
            console.log('Topic updated successfully:', response);
        },
        error: (error) => {
            console.error('Error updating topic:', error);
        }
    });
}


  private getTopicIdByModel(topicModel: string): number {
    return 1;
  }
}