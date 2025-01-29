import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css'
})
export class CourseInfoComponent {

}
