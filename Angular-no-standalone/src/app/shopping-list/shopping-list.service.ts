import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import {Subject} from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    newIngredient = new Subject<Ingredient>();


    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),

  ];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.newIngredient.next(ingredient)
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
    }
}