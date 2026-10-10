import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.css',
})
export class LoginComponent {
  private form = viewChild<NgForm>('loginForm');
  private destroyRef = inject(DestroyRef);

  constructor(){
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('email');

      if(savedForm){
        const loadedForm = JSON.parse(savedForm);
        const savedEmail = loadedForm.email;
        setTimeout(() => {
          this.form()?.setValue({email: savedEmail, password: ''})
        }, 1000)
      }


      const sub = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value: any) => {
          console.log(value);
          window.localStorage.setItem('email', JSON.stringify({email: value.email}));
          // window.localStorage.setItem('password', JSON.stringify({password: value.password}))        
        }
      });
      this.destroyRef.onDestroy(() => {
        sub?.unsubscribe()
      })
    })
  }
  onSubmit(formData: NgForm){

      if(formData.form.invalid){
        return;
      }
    console.log(formData.form.value);
    console.log(formData.form.value.email)
    console.log(formData.form.value.password);

    formData.form.reset();
    // form informatiom methods and props
  }
}
