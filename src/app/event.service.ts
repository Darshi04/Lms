import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string;
  date: string;
  id: string;
  status: 'scheduled' | 'completed';
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [
    { title: 'Event 1', date: '2025-01-10', id: '1', status: 'scheduled' },
    { title: 'Event 2', date: '2025-01-01', id: '2', status: 'completed' },
  ];

  private eventsSubject = new BehaviorSubject<Event[]>(this.events);
  events$ = this.eventsSubject.asObservable();

  // Observables for scheduled and completed counts
  get scheduledCount$() {
    return this.events$.pipe(
      map(events => events.filter(event => event.status === 'scheduled').length)
    );
  }

  get completedCount$() {
    return this.events$.pipe(
      map(events => events.filter(event => event.status === 'completed').length)
    );
  }

  addEvent(newEvent: Event): void {
    this.events = [...this.events, newEvent]; // Create a new array reference
    this.eventsSubject.next(this.events);     // Emit the updated array
  }

  deleteEvent(eventId: string): void {
    this.events = this.events.filter(event => event.id !== eventId); // Filter the event out
    this.eventsSubject.next(this.events);                             // Emit the updated array
  }

  updateEventStatus(eventId: string, newStatus: 'scheduled' | 'completed'): void {
    const event = this.events.find(event => event.id === eventId);
    if (event) {
      event.status = newStatus;       // Update the event status
      this.eventsSubject.next([...this.events]);  // Emit the updated array
    }
  }
}
