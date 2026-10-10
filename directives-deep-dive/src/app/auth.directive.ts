import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Permission } from "./auth/auth.model";
import { AuthService } from "./auth/auth.service";

@Directive({
    selector: '[authDirective]',
    standalone: true
})
export class AuthDirective {
    userType = input.required<Permission>({alias: 'authDirective'});
    private authSer = inject(AuthService);
    // here I am telling Angular that this element will be used on ng-template element 
    private templateRef = inject(TemplateRef);
    // last step refrence to teh place in the dom where this template will be used
    private viewContainerRef = inject(ViewContainerRef);

    constructor(){
        effect(() => {
            if(this.authSer.activePermission() === this.userType()){
                // createEmbeddedView() => a method provided by Angular to render some content into a certain place at the dom take TemplateRef as arg
                // so here I am telling angular to take the content beside this ng-content and render it at the palce it used

                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }else{
                this.viewContainerRef.clear()
                
            }
        });
    }
}