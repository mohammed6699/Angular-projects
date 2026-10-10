import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment.model';
import { InvestmentService } from '../investment.service';
@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // incase we use signal fr two way bining we don't need to call it usein () as this is already done by the ngModel
  enteredIntialInvestment= signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');
  constructor(
    private InvestmentSer: InvestmentService
  ){}
  onSubmit(){
    this.InvestmentSer.calculateInvestmentResults({
      initialInvestment: +this.enteredIntialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    })
    this.enteredIntialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
