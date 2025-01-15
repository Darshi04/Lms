// shared.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Topic {
  topic: string;
  model: string;  // Add this if your topic has a model field, otherwise adjust as needed
  completed: boolean;
}

export interface Course {
  title: string;
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

  constructor(private http: HttpClient) {}

  getStoredEvents(): { [key: string]: boolean } {
    const storedEvents = localStorage.getItem(this.localStorageKey);
    return storedEvents ? JSON.parse(storedEvents) : {};
  }

  getCourses() {
    return this.http.get<{ courses: Course[] }>(`${this.baseUrl}/course`);
  }

  getTopics(courseId: number) {
    return this.http.get<{ topics: Topic[] }>(`${this.baseUrl}/topics/${courseId}`);
  }

  updateEvent(topic: string, completed: boolean) {
    const currentEvents = this.eventSubject.value;
    currentEvents[topic] = completed;

   
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentEvents));

    this.eventSubject.next(currentEvents);

    this.updateTopicStatus(topic, completed);
  }

  private updateTopicStatus(topic: string, completed: boolean) {
    const topicId = this.getTopicIdByModel(topic);
    this.http.put(`${this.baseUrl}/topics/${topicId}`, { completed }).subscribe({
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
