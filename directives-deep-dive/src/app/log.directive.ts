import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onClick()'
  }
})
export class LogDirective {
  private elementRef = inject(ElementRef)
  constructor() { }
  onClick(){
    console.log('clciked');
    console.log(this.elementRef.nativeElement)
  }
}
