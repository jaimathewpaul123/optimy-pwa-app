import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Constants} from 'src/app/core/constants/constants';
import {LoginPageComponent} from 'src/app/optimy/login-page/login-page.component';
import {PageNotFoundComponent} from 'src/app/optimy/page-not-found/page-not-found.component';
import {TaskListPageComponent} from 'src/app/optimy/task-list-page/task-list-page.component';
import {TaskDetailsPageComponent} from 'src/app/optimy/task-details-page/task-details-page.component';
import {LoginGuard} from 'src/app/core/guards/login.guard';


const routes: Routes = [
  {
    path: Constants.routes.login,
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: Constants.routes.taskHome,
    component: TaskListPageComponent
  },
  {
    path: Constants.routes.taskDetails,
    component: TaskDetailsPageComponent
  },
  {
    path: Constants.routes.empty,
    redirectTo: `/${Constants.routes.login}`,
    pathMatch: 'full'
  },
  {
    path: Constants.routes.wildCard,
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
