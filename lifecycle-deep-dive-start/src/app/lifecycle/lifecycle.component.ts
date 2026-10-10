import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    // standard js class constructor, it's not part of the lifeCycle 
    console.log('CONSTRUCTOR');
  }

  ngOnInit() {
    // teh start for the lifecycle but not the first one to be triggered when the app starts for angular here you can add your real logic define methdos, formshadle http request, so on...
    // since it treger once the component is intialized  
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    // here we have one of the most important thing which is the SimpleChanges which is responsable for every change happen to an input and outPut happen in the app and it emidetly send a notification for onChanges useing detectChange by this way it can get any change happen and catch it 
    // in my case when ever the @Input() text?: string; or inputs if I have more than one 
    // so here whenever the text change Angular automatically produces a changes object, which gives you more information about the input changes that happened 
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngDoCheck() {
    // related to angular change mechanism only invokes whenever angular thinks a UI update might be needed
    // so whenever it detects any event or anything anywhere on teh entire application, so not just a component but anywhere in teh entry app that colud lead to data changes 
    // so for that you are not allowed to use this hook except when you actually need it 
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    // content any content that can be projected on the template using <ng-content />
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    // view is technilcally the template '.html file'and all the elements that are in teh file are part of that angular view
    // 
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    // here we can say it's responsable for the cleanup work, because it will be executed right before the component instance is about to be destroyed
    // here when I remove the component from teh screen it will it will render conditionally
    //@if (lifecycleComponentIsVisible) {
    //   <app-lifecycle [text]="lifecycleInputText" />
    // }
  }
}
