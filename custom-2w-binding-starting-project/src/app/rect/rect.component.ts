import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
    // create props
    // @Input({required: true}) size!: {width: string, height: string};
    // @Output() sizeChange = new EventEmitter<{width: string, height: string}>()
    // to create a custom two-way binding we will create the input and the output at the same time 
    // the name for the output we will grap our prop name size then add word chage after it like that  sizeChange
    //alternative way now we can only pass the model and it will handle all the required thing to manage the custom two way binding
    size = model.required<{width: string, height: string}>();

    onReset() {
      this.size.set({
        width: '200',
        height: '100'
      })
  }
}
