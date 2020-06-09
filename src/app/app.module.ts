import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './optimy/login-page/login-page.component';
import { PageNotFoundComponent } from './optimy/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TaskListPageComponent } from './optimy/task-list-page/task-list-page.component';
import { HeaderComponent } from './optimy/header/header.component';
import { TaskDetailsPageComponent } from './optimy/task-details-page/task-details-page.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    TaskListPageComponent,
    HeaderComponent,
    TaskDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
