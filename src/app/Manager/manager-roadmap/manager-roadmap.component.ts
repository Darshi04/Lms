import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RoadmapComponent } from '../../CommonComponent/roadmap/roadmap.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manager-roadmap',
  standalone: true,
  imports: [HeaderComponent,RoadmapComponent,FooterComponent],
  templateUrl: './manager-roadmap.component.html',
  styleUrl: './manager-roadmap.component.css'
})
export class ManagerRoadmapComponent {

}
