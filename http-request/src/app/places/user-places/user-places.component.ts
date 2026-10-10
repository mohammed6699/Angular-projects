import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { catchError, map, throwError } from 'rxjs';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})

export class UserPlacesComponent implements OnInit{
  isFetching = signal(false);
  error = signal('');
  private placesSer = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = this.placesSer.loadedUserPlaces

    ngOnInit(): void {
      this.isFetching.set(true)
      const sub = this.placesSer.loadUserPlaces().subscribe({
        error: (err) => {
          console.log(err)
          this.error.set(err.message);
        },
        complete: () => {
          this.isFetching.set(false)
        }
      });
      this.destroyRef.onDestroy(() => {
        sub.unsubscribe()
      })
    }
  onRemovePlace(place: Place){
    const sub = this.placesSer.removeUserPlace(place).subscribe({
      next: () => {
        console.log('place deleted')
      }
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
}
