import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnDestroy, OnInit {

  recipes!: Recipe[];
  private recipesChangedSub?: Subscription;

  constructor(
    private recipeSer: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipes = this.recipeSer.getRecipes();
    this.recipesChangedSub = this.recipeSer.recipesChanged.subscribe(
      (recipes) => this.recipes = recipes
    );
  }

  ngOnDestroy() {
    this.recipesChangedSub?.unsubscribe();
  }

  onAdd() {
    //Specifies a root URI to use for relative navigation 
    //to make match the parent route
    this.router.navigate(['new-recipe'], { relativeTo: this.route });
  }

}
