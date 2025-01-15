import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';  
import { EventService, Event } from '../../event.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements AfterViewInit {
  isSidebarOpen: boolean = true;
  calendarMini!: Calendar;

  scheduledUsers: any[] = [];
  completedUsers: any[] = [];
  events: any[] = []; // Array to store events

  constructor(private eventService: EventService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    // Fetch events and update the calendar on component load
    this.fetchScheduledEvents();
    
    // Subscribe to events from the service (in case of dynamic updates)
    this.eventService.events$.subscribe((events) => {
      console.log('Updated events in AsideComponent:', events);
      this.initializeCalendar(events); // Reinitialize the calendar with updated events
    });
  }

  fetchScheduledEvents(): void {
    // Fetch scheduled events from the backend
    this.http.get<any>('http://localhost:8080/scheduled').subscribe({
      next: (response) => {
        console.log('Scheduled Events:', response);
        const scheduled = response.scheduled || [];
        const completed = response.completed || [];
        this.scheduledUsers = scheduled;
        this.completedUsers = completed;
        this.events = [...scheduled, ...completed]; // Combine scheduled and completed events
        this.initializeCalendar(this.events); // Initialize calendar with the fetched events
      },
      error: (err) => {
        console.error('Error fetching scheduled events:', err);
      }
    });
  }

  initializeCalendar(events: any[]): void {
    const calendarMiniEl = document.getElementById('calendar-mini') as HTMLElement;
    this.calendarMini = new Calendar(calendarMiniEl, {
      initialView: 'dayGridMonth',
      weekends: true,
      events: events,  // Use the updated events array
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (info) => this.handleDateClick(info),
      eventClick: (info) => this.handleEventClick(info),
    });
    this.calendarMini.render();
  }

  handleDateClick(info: any): void {
    const newEventTitle = prompt('Enter event title:', 'New Event');
    if (newEventTitle) {
      const newEvent: Event = {
        title: newEventTitle,
        date: info.dateStr,
        id: `${new Date().getTime()}`,  // Unique ID
        status: 'scheduled'  // Make sure it's strictly 'scheduled' or 'completed'
      };

      // Add the new event to the backend
      this.http.post('http://localhost:8080/Db', newEvent).subscribe({
        next: () => {
          console.log('Event added successfully');
          this.fetchScheduledEvents(); // Fetch updated events to show on the calendar
        },
        error: (err) => {
          console.error('Error adding event:', err);
        }
      });
    }
  }

  handleEventClick(info: any): void {
    if (confirm('Are you sure you want to delete this event?')) {
      const eventId = info.event.id;

      // Call the backend to delete the event
      this.http.get(`http://localhost:8080/deleteById?id=${eventId}`).subscribe({
        next: () => {
          console.log(`Event with ID ${eventId} deleted successfully`);
          this.fetchScheduledEvents(); // Fetch updated events to show on the calendar
        },
        error: (err) => {
          console.error(`Error deleting event with ID ${eventId}:`, err);
        }
      });
    }
  }
}
