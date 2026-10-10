import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipeChange = new Subject<Recipe[]>();
    recipesChanged = this.recipeChange.asObservable();

    constructor(
        private shoppingListService: ShoppingListService
    ) { }
    private  recipes: Recipe[] = [
        new Recipe(
                'A Test Recipe', 
                'This is simply a test', 
                'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
                [
                    new Ingredient('Meat', 1),
                    new Ingredient('French Fries', 20)
                ]
            ),
        new Recipe(
            'Another Test Recipe', 
            'This is simply a test', 
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
    ];
    setRecipes(recipe: Recipe[]) {
        this.recipes = recipe;
        this.recipeChange.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChange.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChange.next(this.recipes.slice());
    }

    addingIngreidnetsToShoppingList(ingredient: Ingredient[]){
        this.shoppingListService.addIngredients(ingredient);
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }
}