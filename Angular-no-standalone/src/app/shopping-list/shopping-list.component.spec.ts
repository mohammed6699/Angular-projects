    import { ComponentFixture, TestBed } from "@angular/core/testing";
    import { NO_ERRORS_SCHEMA } from "@angular/core"; // 1. Import NO_ERRORS_SCHEMA
    import { ShoppingListComponent } from "./shopping-list.component";
    import { ShoppingListService } from "./shopping-list.service";
    import { of, Subject } from "rxjs";

    describe('Component: Shopping list component', () => {
        let component: ShoppingListComponent;
        let fixture: ComponentFixture<ShoppingListComponent>;
        let mockShoppinglistService: jasmine.SpyObj<ShoppingListService>;

        beforeEach(async () => {
            // 2. Include all methods the tests spy on: getIngredients, addIngredient, deleteIngredient
            mockShoppinglistService = jasmine.createSpyObj('ShoppingListService', [
                'getIngredients',
                'addIngredient',
                'deleteIngredient'
            ], {
                newIngredient: new Subject<any>()
            });
            await TestBed.configureTestingModule({
                declarations: [ShoppingListComponent],
                providers: [
                    { provide: ShoppingListService, useValue: mockShoppinglistService },
                ],
                // to ignore child componenet app-shopping-edit
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents();

            fixture = TestBed.createComponent(ShoppingListComponent);
            component = fixture.componentInstance;
        });

        it('should return the component', () => {
            expect(component).toBeTruthy();
        });

        it('should display the list of ingredients', () => {
            const ingredients = [
                { name: 'Tomato', amount: 2 },
                { name: 'Onion', amount: 2 },
                { name: 'Pepper', amount: 2 }
            ]
            mockShoppinglistService.getIngredients.and.returnValue(ingredients as any);
            fixture.detectChanges();
            expect(component.ingredients.length).toBe(3);
            expect(component.ingredients).toEqual(ingredients);
        });

        it('should add ingredient', () => {
            const ingredient = { name: 'Tomato', amount: 2 };
            component.onIngredientAdded(ingredient);
            expect(mockShoppinglistService.addIngredient).toHaveBeenCalledWith(ingredient);
            expect(mockShoppinglistService.getIngredients).toHaveBeenCalled();
        });

        it('should delete ingredient', () => {
            component.onDeleteIngredient(0);
            expect(mockShoppinglistService.deleteIngredient).toHaveBeenCalledWith(0);
            expect(mockShoppinglistService.getIngredients).toHaveBeenCalled();
        });

    });
