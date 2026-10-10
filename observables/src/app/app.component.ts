import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount)
  intervals$ = interval(1000);
  intervalSignal = toSignal(this.intervals$, {initialValue: 0});

  // custom observable from scratch
  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      console.log('emmiting your value ...')
      subscriber.next({message: 'New Value'});
    }, 2000)
  })
  private destroyRef = inject(DestroyRef)

  constructor(){
    // toObservable(this.clickCount)
  }
  ngOnInit(): void {
    // const sub = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => {
    //     console.log(val);
    //   }
    // })
    // this.destroyRef.onDestroy(() => {
    //   sub.unsubscribe();
    // });
    this.customInterval$.subscribe({
      next: (val) => console.log(val)
    });
    
    const clickSub = this.clickCount$.subscribe({
      next: (val) => console.log(val)
    });
    this.destroyRef.onDestroy(() => {
      clickSub.unsubscribe()
    })
  }
  onClick(){
    this.clickCount.update(old => old + 1)
  }
}
