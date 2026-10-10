import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrl: './recipes-edit.component.css'
})
export class RecipesEditComponent implements OnInit {
  id!: number;
  editMode = false;

  // Initialize it immediately
  recipeForm: FormGroup = new FormGroup({});

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeSer: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.id = +params['id'];
        }

        this.initForm();
      }
    );
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {

      const recipe = this.recipeSer.getRecipeById(this.id);
      if (!recipe) {
        this.router.navigate(['/recipes']);
        return;
      }

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ing of recipe.ingredients) {

          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );

        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'image': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return;
    }

    const formValue = this.recipeForm.value;
    const recipe = new Recipe(
      formValue.name,
      formValue.description,
      formValue.image,
      (formValue.ingredients ?? []) as Ingredient[]
    );
    if (this.editMode) {
      this.recipeSer.updateRecipe(this.id, recipe);
    } else {
      this.recipeSer.addRecipe(recipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // function to add ingredient dynamically 
  onAddIng(){
    // cast the form to formArray in order to use the push method 
    // TypeScript Cast here we are telling ts that the type of the form is formArray not formGroup 
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  oncancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
