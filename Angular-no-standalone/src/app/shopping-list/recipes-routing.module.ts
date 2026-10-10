import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutingModule: Routes = [
    {
        path: '',
        component: ShoppingListComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutingModule)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
