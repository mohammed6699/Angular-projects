import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  recipeid!: number
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeSer: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.params.subscribe(
      (params: Params) => {
        this.recipeid = +params['id'];
        this.recipe = this.recipeSer.getRecipeById(this.recipeid);
      }
    )
  }

  // onAddToShoppingList() {
  //   this.shoppingListService.addIngredients(this.recipe.ingredients);
  // }
  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
   
  }
  onEditRecipe() {
    //Specifies a root URI to use for relative navigation 
    //to make match the parent route
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeSer.deleteRecipe(this.recipeid);
    this.router.navigate(['/recipes']);
  }
}
