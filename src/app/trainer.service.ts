import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private trainerIdsSubject = new BehaviorSubject<String[]>([]); // Holds the trainer ids
  trainerIds$ = this.trainerIdsSubject.asObservable(); // Observable to subscribe to the trainer ids

  // Update the trainerIds
  setTrainerIds(trainerIds: string[]) {
    console.log('Setting trainer IDs in the service:', trainerIds);  // Log trainer IDs being set
    this.trainerIdsSubject.next(trainerIds);
    
  }

  // Get the current trainerIds
  getTrainerIds() {
    console.log("Current trainer IDs in service:", this.trainerIdsSubject.value);  // Log current value of trainerIds
    return this.trainerIdsSubject.value;
  }
}
