import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ShoppingEditComponent } from "./shopping-edit.component";

describe('Component: ShoppingEditComponent', () => {
    let component: ShoppingEditComponent;
    let fixture: ComponentFixture<ShoppingEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoppingEditComponent],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(ShoppingEditComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit ingredient added event', () => {
        // Mock the ViewChild input elements so onAddItem doesn't crash on undefined
        component.nameInputRef = { nativeElement: { value: 'Tomato' } };
        component.amountInputRef = { nativeElement: { value: 2 } };

        // Spy on the EventEmitter emit method
        spyOn(component.ingredientAdded, 'emit');

        component.onAddItem();

        expect(component.ingredientAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
            name: 'Tomato',
            amount: 2
        }));
    });
});
