import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './components/main-page/main-page.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./app-router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500, horizontalPosition: 'up', verticalPosition: 'right'}
  }],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
