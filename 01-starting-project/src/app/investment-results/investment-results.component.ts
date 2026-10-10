import { Component } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [BrowserModule],
  // you can import BrowserModule instead of importing currencyPipe one by one
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  constructor(
    private investmentSer: InvestmentService
  ){}
  get results(){
    return this.investmentSer.resultData
  }
}
