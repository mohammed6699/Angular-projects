import { Directive, ElementRef, inject, input, Input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeave($event)'
    }
})


export class SafeLinkDirective {
    queryParam = input<string>('myapp', {alias: 'appSafeLink'})
    // @Input() queryParam: string = ('myapp')
    // inject nativeElement to maage (event.target as HTMLAnchorElement)
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
    constructor(){
        console.log('safe link directive is active!');
        
    }
    onConfirmLeave(event: MouseEvent){
        const wantToLeave = window.confirm('are you sure Ypu want to leave?');
        if(wantToLeave){
            // get the adress the user wants to navigate to
            // ts is not convince that  event.target.href is neccesarry for a tag so we will convince it using as HTMLAnchorElement => type casting
            const address = this.hostElementRef.nativeElement.href;
            // change the address
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return;
        }
        event?.preventDefault();
        
    }
}