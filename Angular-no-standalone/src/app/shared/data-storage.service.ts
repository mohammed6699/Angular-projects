import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {
    private readonly recipesUrl = 'https://angular-auth-200c5-default-rtdb.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    saveData() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.recipesUrl, recipes).subscribe({
            next: response => console.log('Recipes saved successfully.', response),
            error: error => console.error('Failed to save recipes.', error)
        });
    }
    // Fetch data from Firebase
    fetchRecipes(){
        // I only need to get the user once not every time I get the user so I will go with take operator
        // I only need one value from that observable 
        // wait for the first observable to be complet then go with the second one 
        // switchMap will work fine here also
        // mergeMap will not work here because it will not wait for the first observable to be complete
        // concatMap will work here but it will be better not to use the take(1)
        this.authService.userSub.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[] | null>(this.recipesUrl)
        }), 
            map(recipes => {
                return (recipes ?? []).map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients: []
                    };
                });
            }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes)
        })
        ).subscribe()
    }
}