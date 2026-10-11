    import { DataStorageService } from "./data-storage.service";
    import { HttpClient } from "@angular/common/http";
    import { AuthService } from "../auth/auth.service";
    import { TestBed } from "@angular/core/testing";
    import { RecipeService } from "../recipes/recipe.service";
    import { of } from "rxjs";

    describe('Service: Data storage service', () => {
        let service: DataStorageService;
    let mockHttpClient: jasmine.SpyObj<HttpClient>;
    let mockAuthService: { userSub: any };
    let mockRecipeService: jasmine.SpyObj<RecipeService>;
    let mockUrl: string = 'https://angular-auth-200c5-default-rtdb.firebaseio.com/recipes.json';
    
    beforeEach(() => {
        mockHttpClient = jasmine.createSpyObj('HttpClient', ['put', 'get']);
        mockRecipeService = jasmine.createSpyObj('RecipeService', ['getRecipes', 'setRecipes']);
        mockAuthService = {
            userSub: of({ email: 'test@test.com', id: '123' })
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: mockHttpClient },
                { provide: AuthService, useValue: mockAuthService },
                { provide: RecipeService, useValue: mockRecipeService },
            ]
        })
        service = TestBed.inject(DataStorageService);
    })
    // check service loads
    it('should return the service', () => {
        expect(service).toBeTruthy();
    })
    // check save data is working
    it('should save recipes to Firebase', () => {
    const dummyRecipes = [
      {
        name: 'Pizza',
        description: 'Delicious',
        imagePath: '',
        ingredients: []
      }
    ];

        mockRecipeService.getRecipes.and.returnValue(dummyRecipes as any);
        mockHttpClient.put.and.returnValue(of({}));

        service.saveData();

        expect(mockRecipeService.getRecipes).toHaveBeenCalled();
        expect(mockHttpClient.put).toHaveBeenCalledWith(mockUrl, dummyRecipes);
    });
    // fetch data
    it('should return the data from firebase server', () => {
        const dummyRecipes = [
            { name: 'Pizza', description: 'Delicious', imagePath: '', ingredients: [] }
        ];
        mockHttpClient.get.and.returnValue(of(dummyRecipes));
        service.fetchRecipes();
        expect(mockHttpClient.get).toHaveBeenCalledWith(mockUrl)
        expect(mockRecipeService.setRecipes).toHaveBeenCalledWith(dummyRecipes);
    })
    })