import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';

const recipesChildRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new-recipe', component: RecipesEditComponent },
      { path: ':id/edit', component: RecipesEditComponent },
      { path: ':id', component: RecipeDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesChildRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
