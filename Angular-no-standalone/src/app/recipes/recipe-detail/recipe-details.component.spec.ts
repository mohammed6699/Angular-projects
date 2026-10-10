import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RecipeDetailComponent } from "./recipe-detail.component"
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { of } from 'rxjs';
import { Recipe } from "../recipe.model";

describe('Component: recipe detail', () => {
    let component: RecipeDetailComponent;
    let textureComponent: ComponentFixture<RecipeDetailComponent>;
    let mockShoppingListService: jasmine.SpyObj<ShoppingListService>;
    let mockRecipeService: jasmine.SpyObj<RecipeService>;
    let mockActivatedRoute: any;
    let mockRouter: jasmine.SpyObj<Router>;
    beforeEach(async () => {
        mockShoppingListService = jasmine.createSpyObj('ShoppingListService', ['addIngredients']);
        mockRecipeService = jasmine.createSpyObj('RecipeService', ['getRecipeById', 'deleteRecipe']);
        mockActivatedRoute = {
            params: of({ id: '1' })
        };
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        await TestBed.configureTestingModule({
            declarations: [RecipeDetailComponent],
            providers: [
                { provide: ShoppingListService, useValue: mockShoppingListService },
                { provide: RecipeService, useValue: mockRecipeService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
        textureComponent = TestBed.createComponent(RecipeDetailComponent);
        component = textureComponent.componentInstance;
    })
    // the component should return true (created)
    it('should create the component', () => {
        expect(component).toBeTruthy()
    });
    //should return the recipe id
    it('should return the recipe id', () => {
        // call the ngOnInit
        textureComponent.detectChanges();
        // call route (activated route)
        mockActivatedRoute.params.subscribe((id: any) => {
            expect(id['id']).toBe('1');
        })
    });
    // test shopping list 
    it('should add ingredients to the shopping list', () => {
        const ingredients = [
            { name: 'Cheese', amount: 2 }
        ]
        component.recipe = {
            name: 'Pizza',
            imagePath: 'pizza.jpg',
            description: 'Test recipe',
            ingredients: ingredients
        } as Recipe;
        component.onAddToShoppingList();
        expect(mockShoppingListService.addIngredients).toHaveBeenCalledWith(ingredients);
    });
    // test edit recipe
    it('should navigate to the edit page', () => {
        component.onEditRecipe();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['edit'], { relativeTo: mockActivatedRoute });
    });
    // test delete recipe
    it('should delete the recipe', () => {
        component.onDeleteRecipe();
        expect(mockRecipeService.deleteRecipe).toHaveBeenCalled();
    });
    // test delete recipe
    it('should navigate to the recipes page', () => {
        component.onDeleteRecipe();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes']);
    });
})