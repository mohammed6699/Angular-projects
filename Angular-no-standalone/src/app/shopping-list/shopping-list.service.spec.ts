import { TestBed } from "@angular/core/testing";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

describe('shopping list service', () => {
    let shoppingService: ShoppingListService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [ShoppingListService]
        });
        shoppingService = TestBed.inject(ShoppingListService);
    });
    // test service is working
    it('should return true value', () => {
        expect(shoppingService).toBeTruthy();
    });
    // test get all ingredients
    it('should return all ingredients', () => {
        const ingredient = shoppingService.getIngredients();
        expect(ingredient.length).toBe(2);
        expect(ingredient[0]).toEqual(new Ingredient('Apples', 5));
        expect(ingredient[1]).toEqual(new Ingredient('Tomatoes', 10));
        
    });
    // add new ingredient
    it('should add a new ingredient', () => {
        const newIngredient = new Ingredient('Cheese', 2);
        shoppingService.addIngredient(newIngredient);
        const ingredients = shoppingService.getIngredients();
        expect(ingredients.length).toBe(3);
        expect(ingredients[2]).toEqual(newIngredient);
    });
    // delete ingredient
    it('should delete an ingredient by index', () => {
        shoppingService.deleteIngredient(0);
        const ingredients = shoppingService.getIngredients();
        expect(ingredients.length).toBe(1);
        expect(ingredients[0]).toEqual(new Ingredient('Tomatoes', 10));
    });
})