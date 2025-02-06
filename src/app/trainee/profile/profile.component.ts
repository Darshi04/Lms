import { Component } from '@angular/core';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule,TraineeHeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
