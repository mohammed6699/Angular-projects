import { TestBed } from "@angular/core/testing";
import { RecipeService } from "./recipe.service"
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

describe('Recipe Seervoce', () => {
    let service: RecipeService;
    let mockShoppingistService: jasmine.SpyObj<ShoppingListService>;
    const mockRecipe = [
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
    beforeEach(() => {
        mockShoppingistService = jasmine.createSpyObj(
            'ShoppingListService',
            ['addIngredients']
        );

        TestBed.configureTestingModule({
            providers: [
            {
                provide: ShoppingListService,
                useValue: mockShoppingistService
            }
            ]
        });
        service = TestBed.inject(RecipeService);
    });

    // the service should work 
    it('should create an instance',() => {
        expect(service).toBeTruthy();
    });
    // test get all recipes
    it('should return all recipes', () => {
        const recipes = service.getRecipes();
        expect(recipes.length).toBe(2);
    });

    // get recipe by id for details
    it('getRecipeById() should return a recipe by id', () => {
        const recipe = service.getRecipeById(0);
        expect(recipe).toEqual(mockRecipe[0]);
    });
    // add new recipe to the array
    it('addRecipe() should add a new recipe', () => {
        const newRecipe = new Recipe('Pizza', 'A test recipe', 'pizza.jpg', [new Ingredient('Cheese', 2)]);
        service.addRecipe(newRecipe);
        expect(service.getRecipes().length).toBe(3);
        expect(service.getRecipes()[2]).toEqual(newRecipe);
    });
    // edit recipe
    it('updateRecipe() should update a recipe', () => {
        const updatedRecipe = new Recipe('Pizza', 'A test recipe', 'pizza.jpg', [new Ingredient('Cheese', 2)]);
        service.updateRecipe(0, updatedRecipe);
        expect(service.getRecipes()[0]).toEqual(updatedRecipe);
    });

    // delete recipe
    it('deleteRecipe() should delete a recipe', () => {
        service.deleteRecipe(0);
        expect(service.getRecipes().length).toBe(1);
    });

    // add ingredinet to the shopping list
    it('addingIngreidnetsToShoppingList() add ingredient to certain recipe', () => {
        const newIngredient = [new Ingredient('Cheese', 2)];
        service.addingIngreidnetsToShoppingList(newIngredient);
        expect(mockShoppingistService.addIngredients).toHaveBeenCalledWith(newIngredient);
    })
})