// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private localStorageKey = 'selectedTopics';  // Key for localStorage

  private eventSubject = new BehaviorSubject<{ [key: string]: boolean }>(this.getStoredEvents());
  event$ = this.eventSubject.asObservable();

  constructor() { }

  // Get stored events from localStorage or return an empty object
  private getStoredEvents(): { [key: string]: boolean } {
    const storedEvents = localStorage.getItem(this.localStorageKey);
    return storedEvents ? JSON.parse(storedEvents) : {};
  }

  // Update the state of a particular topic
  updateEvent(topic: string, completed: boolean) {
    const currentEvents = this.eventSubject.value;
    currentEvents[topic] = completed;

    // Save to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentEvents));

    // Emit the new value to subscribers
    this.eventSubject.next(currentEvents);
  }
}
