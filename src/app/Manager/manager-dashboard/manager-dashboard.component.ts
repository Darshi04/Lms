import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { AsideComponent } from '../Calendar/aside.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,HeaderComponent, AsideComponent, FooterComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {

  
    
    scheduledCount: number = 0;
    completedCount: number = 0;
  
    sch: any = "";
  
    count: any;
    trainer_count:any;
  
    constructor( private http: HttpClient) {
  

  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/Count").subscribe({
      next: (response) => {
        this.sch = response;
        console.log(response);
        
        this.scheduledCount = this.sch.scheduled || 0;
        this.completedCount = this.sch.completed || 0;
      },
      error: (err) => {
        console.error('Error fetching test count:', err);
      }
      
    });
  

  this.http.get<number>("http://localhost:8080/studentCount").subscribe({
    next: (response) => {
      console.log("Total student count:", response);
      this.count = response; 
    },
    error: (err) => {
      console.error('Error fetching student count:', err);
    }
  });

  this.http.get<number>("http://localhost:8080/trainerCount").subscribe({
    next:(response)=>{
      console.log("Total Trainer Count:",response);
      this. trainer_count=response;
    },error:(err)=>{
      console.error('Error fetching trainer count:',err);
    }
  })
 
}

}