import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: App Component', () => {
  let component: AppComponent;
let textureComponent: ComponentFixture<AppComponent>;
let mockAuthService: jasmine.SpyObj<AuthService>;

beforeEach(async() => {
  mockAuthService = jasmine.createSpyObj('AuthService', ['autoLogin']);
  await TestBed.configureTestingModule({
    declarations: [AppComponent],
    providers: [
      { provide: AuthService, useValue: mockAuthService }
    ],
     schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  textureComponent = TestBed.createComponent(AppComponent);
  component = textureComponent.componentInstance;
})

it('should return the component', () => {
  expect(component).toBeTruthy();
})

it('should auto login', () => {
  component.ngOnInit();
  expect(mockAuthService.autoLogin).toHaveBeenCalled();
})
})