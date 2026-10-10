import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {doesHaveQuestionMark: true}
}
function emailIsUnique(control: AbstractControl){
  if(control.value !== 'text@example.com'){
    return of(null);
  }
  return of({notUnique: true})
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.required, Validators.email, Validators.minLength(10)],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), mustContainQuestionMark]
    })
  });

  get emailIsInvalid(){
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    )
  }
  get passwordIsInvalid(){
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    )
  }
  onSubmit(){
    this.loginForm.value.email;
  }
}
