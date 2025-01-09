import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';  
import { EventService, Event } from '../../event.service';

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

  constructor(private eventService: EventService) {}

  ngAfterViewInit(): void {
    // Subscribe to events from the service
    this.eventService.events$.subscribe((events) => {
      console.log('Updated events in AsideComponent:', events);
      this.initializeCalendar(events); // Reinitialize the calendar with updated events
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
      // Explicitly type newEvent as Event and set status as 'scheduled'
      const newEvent: Event = {
        title: newEventTitle,
        date: info.dateStr,
        id: `${new Date().getTime()}`,  // Unique ID
        status: 'scheduled'  // Make sure it's strictly 'scheduled' or 'completed'
      };
  
      // Add the new event via the service
      this.eventService.addEvent(newEvent);
    }
  }
  
  handleEventClick(info: any): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(info.event.id);  // Delete event via the service
    }
  }
}
