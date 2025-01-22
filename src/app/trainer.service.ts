import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private trainerIdsSubject = new BehaviorSubject<number[]>([]); // Holds the trainer ids
  trainerIds$ = this.trainerIdsSubject.asObservable(); // Observable to subscribe to the trainer ids

  // Update the trainerIds
  setTrainerIds(trainerIds: number[]) {
    this.trainerIdsSubject.next(trainerIds);
  }

  // Get the current trainerIds
  getTrainerIds() {
    return this.trainerIdsSubject.value;
  }
}
