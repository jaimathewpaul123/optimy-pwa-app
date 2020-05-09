import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Constants} from 'src/app/core/constants/constants';
import {LoginPageComponent} from 'src/app/optimy/login-page/login-page.component';
import {PageNotFoundComponent} from 'src/app/optimy/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: Constants.routes.login,
    component: LoginPageComponent
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
