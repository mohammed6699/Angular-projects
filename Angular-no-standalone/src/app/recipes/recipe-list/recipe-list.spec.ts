import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RecipeListComponent } from "./recipe-list.component"
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";


describe('component: Recipe-List component', () => {
    let component: RecipeListComponent;
    let textureComponent: ComponentFixture<RecipeListComponent>;
    let mockRecipeService: jasmine.SpyObj<RecipeService>;
    let mockActivatedRoute: any;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRecipeService = jasmine.createSpyObj('RecipeService', ['getRecipes']);
        mockRecipeService.recipesChanged = of([]);
        mockActivatedRoute = {
            params: of({ id: '1' })
        };
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        await TestBed.configureTestingModule({
            declarations: [RecipeListComponent],
            providers: [
                { provide: RecipeService, useValue: mockRecipeService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: mockRouter }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        mockRecipeService.recipesChanged = new Subject<any[]>();
        textureComponent = TestBed.createComponent(RecipeListComponent);
        component = textureComponent.componentInstance;
    })
    // start testing
    it('should return the component', () => {
        expect(component).toBeTruthy();
    });
    // add new recipe
    it('should navigate to the new recipe page', () => {
        component.onAdd();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['new-recipe'], { relativeTo: mockActivatedRoute });
    });
    
    it('should display the recipes', () => {
        const recipes = [
            { name: 'pizza', imagePath: 'pizza.jpg', description: 'test', ingredients: [] },
            { name: 'pizza', imagePath: 'pizza.jpg', description: 'test', ingredients: [] },
            { name: 'pizza', imagePath: 'pizza.jpg', description: 'test', ingredients: [] }
        ]
        mockRecipeService.getRecipes.and.returnValue(recipes as any);
        textureComponent.detectChanges();
        expect(component.recipes.length).toBe(3);
    });
})