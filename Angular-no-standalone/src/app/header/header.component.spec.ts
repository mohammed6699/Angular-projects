import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { DropdownDirective } from '../shared/dropdown.directive';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userSubject: BehaviorSubject<any>;
  let mockAuthService: { userSub: any; logoutMethod: jasmine.Spy };
  let mockDataStorageService: { saveData: jasmine.Spy; fetchRecipes: jasmine.Spy };

  beforeEach(async () => {
    userSubject = new BehaviorSubject<any>(null);

    mockAuthService = {
      userSub: userSubject.asObservable(),
      logoutMethod: jasmine.createSpy('logoutMethod')
    };

    mockDataStorageService = {
      saveData: jasmine.createSpy('saveData'),
      fetchRecipes: jasmine.createSpy('fetchRecipes')
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, DropdownDirective],
      imports: [
        CommonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: DataStorageService, useValue: mockDataStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  // 1. Basic test: Component existence
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Test: isAuth should be false when user is not logged in
  it('should set isAuth to false when there is no authenticated user', () => {
    fixture.detectChanges(); // Triggers ngOnInit
    expect(component.isAuth).toBeFalse();
  });

  // 3. Test: isAuth should be true when user logs in
  it('should update isAuth when the user logs in and logs out', () => {
    fixture.detectChanges();

    expect(component.isAuth).toBeFalse();

    userSubject.next({ email: 'test@test.com', id: '123' });
    expect(component.isAuth).toBeTrue();

    userSubject.next(null);
    expect(component.isAuth).toBeFalse();
  });

  // 4. Test: onSaveData calls DataStorageService.saveData()
  it('should call saveData on DataStorageService when onSaveData is triggered', () => {
    component.onSaveData();
    expect(mockDataStorageService.saveData).toHaveBeenCalled();
  });

  // 5. Test: onFetchData calls DataStorageService.fetchRecipes()
  it('should call fetchRecipes on DataStorageService when onFetchData is triggered', () => {
    component.onFetchData();
    expect(mockDataStorageService.fetchRecipes).toHaveBeenCalled();
  });

  // 6. Test: onLogout calls AuthService.logoutMethod()
  it('should call logoutMethod on AuthService when onLogout is triggered', () => {
    component.onLogout();
    expect(mockAuthService.logoutMethod).toHaveBeenCalled();
  });

    it('should unsubscribe from userSub when the component is destroyed', () => {
  fixture.detectChanges();

  const subscription = (component as any).userSub;
  spyOn(subscription, 'unsubscribe').and.callThrough();

  fixture.destroy();

  expect(subscription.unsubscribe).toHaveBeenCalled();
});
});
