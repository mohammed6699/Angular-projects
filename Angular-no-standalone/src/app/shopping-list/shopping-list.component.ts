import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[]
  private ingChange?: Subscription;
  constructor(
    private shoppingSer: ShoppingListService
  ) { }
  
  ngOnInit() {
    this.ingredients = this.shoppingSer.getIngredients();
    this.ingChange = this.shoppingSer.newIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredients.push(ingredient);
      }
    )

  }
  ngOnDestroy(): void {
    this.ingChange?.unsubscribe();
  }


  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingSer.addIngredient(ingredient);
    this.ingredients = this.shoppingSer.getIngredients();
  }
  onDeleteIngredient(index: number) {
    this.shoppingSer.deleteIngredient(index);
    this.ingredients = this.shoppingSer.getIngredients();
  }
}
