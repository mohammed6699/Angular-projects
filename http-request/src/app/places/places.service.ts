import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorSer = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient)
  loadedUserPlaces = this.userPlaces.asReadonly();
  
  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'error fetching places')
  }
  
  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'error fetching your favorite places').pipe(
      tap({
        next: (Places) => this.userPlaces.set(Places)
      })
    )
  }
  
  addPlaceToUserPlaces(place:Place) {
    // optimastic updating 
    const prevPlaces = this.userPlaces();

    if(!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place])
    }
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces)
        this.errorSer.showError('Failed to store selected places')
        return throwError(() => new Error(''))
      })
    )
  }
  
  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if(!prevPlaces.some((p) => p.id === place.id)){
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id))
    }
    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError(error => {
        this.errorSer.showError('Failed delete certain place')
        return throwError(() => new Error(''))
  })
    )
  }

  private fetchPlaces(url: string, errorMessage: string){
    return this.httpClient.get<{ places: Place[] }>(url)
    .pipe(
      // I have chaged the data to get it directly using 
      map((val) => val.places),
      catchError((err) => {
          console.log(err)
        return throwError(() => new Error(errorMessage))
      }))
  }
}
