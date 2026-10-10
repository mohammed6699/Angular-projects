import { Component, computed, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { UserModel } from './user.model';
import { CardComponent } from '../shared/card/card.component';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // get random user
  // using signal which is a container that store a value and when this value change angular will be notified about it
  // we call the signal value as afunction not prop so it will be selectedUser() without signal angular used to work with zone.js
  // when we use signals we mainy use the compouted to use it not get method

  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => {
  //   
  // })
  // Input 
  // we add it at the component that will accept the input from outside I will send input from app to user
  // now we can add this prop to the add using prop binding method [avatr] = ""
  
  @Input({required: true}) user!: UserModel
  // we can also accept inputs with signals let's set that useing @input
  // note as you use this inputs inside this component we have to use () to call it like this.avatar()
  // avatar = input.required<string>();
  // name = input.required<string>()
  @Input({required: true}) selected!: boolean;
  get imagePath() {
    return 'assets/users/' + this.user.avatar
  }
  // output
  @Output() select = new EventEmitter<string>();
  // select = output<string>();
  // imagePath = computed(() => {return 'assets/users/' + this.avatar()})
  onSelectUser(){
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)
    // this.selectedUser.set(DUMMY_USERS[randomIndex])
    this.select.emit(this.user.id);
  }
}
