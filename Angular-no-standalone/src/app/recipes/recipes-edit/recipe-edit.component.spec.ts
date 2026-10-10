
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipesEditComponent } from './recipes-edit.component';

describe('Component: RecipesEditComponent', () => {
  let fixture: ComponentFixture<RecipesEditComponent>;
  let component: RecipesEditComponent;

  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockActivatedRoute = {
    params: of({ id: '1' })
  } as unknown as ActivatedRoute;

  const mockRecipe = new Recipe(
    'Pizza',
    'A test recipe',
    'pizza.jpg',
    [new Ingredient('Cheese', 2)]
  );

  beforeEach(async () => {
    mockRecipeService = jasmine.createSpyObj(
      'RecipeService',
      ['getRecipeById', 'addRecipe', 'updateRecipe']
    );

    mockRecipeService.getRecipeById.and.returnValue(mockRecipe);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RecipesEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesEditComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the recipe ID from the route', () => {
    fixture.detectChanges();

    expect(component.id).toBe(1);
    expect(component.editMode).toBeTrue();
    expect(mockRecipeService.getRecipeById)
      .toHaveBeenCalledWith(1);
  });

  it('should initialize the form in edit mode', () => {
    fixture.detectChanges();

    expect(component.recipeForm).toBeTruthy();
    expect(component.recipeForm.get('name')?.value).toBe('Pizza');
    expect(component.recipeForm.get('description')?.value)
      .toBe('A test recipe');
    expect(component.recipeForm.get('image')?.value).toBe('pizza.jpg');
  });

  it('should initialize existing ingredients', () => {
    fixture.detectChanges();

    const ingredients = component.recipeForm.get('ingredients');

    expect(ingredients?.value.length).toBe(1);
    expect(ingredients?.value[0].name).toBe('Cheese');
    expect(ingredients?.value[0].amount).toBe(2);
  });

  it('should add an ingredient', () => {
    fixture.detectChanges();

    component.onAddIng();

    expect(component.ingredientControls.length).toBe(2);
  });

  it('should delete an ingredient', () => {
    fixture.detectChanges();

    component.onDeleteIngredient(0);

    expect(component.ingredientControls.length).toBe(0);
  });

  it('should update the recipe on valid submission', () => {
    fixture.detectChanges();

    component.recipeForm.setValue({
      name: 'Updated Pizza',
      image: 'updated-pizza.jpg',
      description: 'Updated description',
      ingredients: [
        { name: 'Cheese', amount: 2 }
      ]
    });

    component.onSubmit();

    expect(mockRecipeService.updateRecipe)
      .toHaveBeenCalledWith(1, jasmine.any(Recipe));

    expect(mockRouter.navigate)
      .toHaveBeenCalledWith(['../'], {
        relativeTo: mockActivatedRoute
      });
  });

  it('should not submit an invalid form', () => {
    fixture.detectChanges();

    component.recipeForm.get('name')?.setValue('');

    component.onSubmit();

    expect(mockRecipeService.updateRecipe).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back when cancelled', () => {
    fixture.detectChanges();

    component.oncancel();

    expect(mockRouter.navigate)
    .toHaveBeenCalledWith(['../'], {relativeTo: mockActivatedRoute});
  });
});
