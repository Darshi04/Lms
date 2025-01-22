import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { AsideComponent } from '../Calendar/aside.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,HeaderComponent, AsideComponent, FooterComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {
 
}
