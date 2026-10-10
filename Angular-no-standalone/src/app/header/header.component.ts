import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  isAuth: boolean = false;
 constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.userSub.subscribe(user => {
      // this.isAuth = !user ? false : true; or
      this.isAuth = !!user // in case we have we will get revirse it to true and false for other wise

    })
  }
  onSaveData() {
    this.dataStorageService.saveData();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes();
  }
  onLogout(){
    this.authService.logoutMethod();
    console.log('logout user')
  }
   ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
