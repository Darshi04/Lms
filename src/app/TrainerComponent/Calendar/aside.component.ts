import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';  
import { EventService, Event } from '../../event.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable encapsulation

})
export class AsideComponent implements AfterViewInit {
  isSidebarOpen: boolean = true;
  calendarMini!: Calendar;

  scheduledUsers: any[] = [];
  completedUsers: any[] = [];
  events: any[] = []; // Array to store events
  selectedEvent: Event | null = null; // Track the selected event for editing

  constructor(private eventService: EventService, private http: HttpClient) {}
  newEventTitle: string = ''; // This will store the title entered by the user
  selectedDate: string = '';  // This will store the selected date when a user clicks a date
  

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
        this.events = [...scheduled, ...completed]; 
        this.initializeCalendar(this.events); 
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
      eventClassNames: (info) => {
        const eventDateStr = info.event.startStr.split('T')[0];
        const currentDateStr = new Date().toISOString().split('T')[0]; 
        if (eventDateStr < currentDateStr) {
          return ['event-completed'];
        } else {
          return ['event-scheduled'];
        }
      },
    });
    this.calendarMini.render();
  }

        // Show modal to add event
        handleEventClick(info: any): void {
          this.selectedEvent = info.event;  // Save the selected event object
          this.newEventTitle = '';  // Clear the event title input
          const deleteEventModal = new bootstrap.Modal(document.getElementById('deleteEventModal'));
          deleteEventModal.show();  // Open the modal to input the event title
        }

  // Delete the event
  deleteEvent(): void {
    if (this.selectedEvent) {
      const eventId = this.selectedEvent.id;
      this.http.get(`http://localhost:8080/deleteById?id=${eventId}`).subscribe({
        next: () => {
  
      const modalElement = document.getElementById('deleteEventModal');
      if (modalElement) {
        // Get the modal instance to hide it
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();  
        } 
      } else {
        console.error('Modal element not found!');
      }
          
          this.fetchScheduledEvents(); 

        },
        error: (err) => {
          console.error(`Error deleting event with ID ${eventId}:`, err);
        }
      });
    }
  }


    // Show modal to add event
    handleDateClick(info: any): void {
      this.selectedDate = info.dateStr;  // Save the selected date
      this.newEventTitle = '';  // Clear the event title input
      const addEventModal = new bootstrap.Modal(document.getElementById('addEventModal'));
      addEventModal.show();  // Open the modal to input the event title
    }


  
    // Add the new event after entering the title
    addEvent(): void {
      if (this.newEventTitle) {
        const newEvent: Event = {
          title: this.newEventTitle,
          date: this.selectedDate,
          id: `${new Date().getTime()}`,
          status: 'scheduled'
        };
  
        // Add the new event to the backend
        this.http.post('http://localhost:8080/Db', newEvent).subscribe({
          next: () => {
            console.log('Event added successfully');
            this.fetchScheduledEvents();  // Refresh the events
            const addEventModal = bootstrap.Modal.getInstance(document.getElementById('addEventModal'));
            addEventModal.hide();  // Close the modal after adding the event
          },
          error: (err) => {
            console.error('Error adding event:', err);
          }
        });
      }
    }
  
}
