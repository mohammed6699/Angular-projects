import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';
@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})

export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesSer = inject(PlacesService)
  ngOnInit(): void {
    this.isFetching.set(true)
    const sub = this.placesSer.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        this.places.set(places);
        this.isFetching.set(false)
      },
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
  onSelectPlace(selctedPlace: Place){
    this.placesSer.addPlaceToUserPlaces(selctedPlace)
    .subscribe({
      next: (res) => {console.log(res)}
    })

  }
}
