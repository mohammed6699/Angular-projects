import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent{
 
 
  // first way using input()
  // userName = computed(() => this.userSer.users.find((user) => user.id === this.userId())?.name);
  userId = input.required<string>();
  private userSer = inject(UsersService);
  userName = input.required<string>()
  // second way observable activatedoute
  
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  //  ngOnInit(): void {
  //     const sub = this.route.paramMap.subscribe({
  //       next: (paramMap) => {
  //           this.userName =
  //           this.userSer.users.find((u) => u.id === paramMap.get('userId'))?.name || ''
  //       }
  //     });
  //     this.destroyRef.onDestroy(() => sub.unsubscribe())
  // third way use snapshot paramMap rememeber to use it for components that will be re-executed only not all components 
  //       this.route.snapshot.paramMap.get('userId')
  // }

}
// resolver function 
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot) => {
  const userSer = inject(UsersService)
  const userName = userSer.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || ''
    return userName
}