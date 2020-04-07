import {BrowserModule} from '@angular/platform-browser';
import {ElementRef, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {OrderComponent} from './order/order.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher, MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatOptionModule, MatSelectionList,
  MatSnackBarModule,
  ShowOnDirtyErrorStateMatcher, MatSelectModule, MatRadioModule
} from '@angular/material';
import {OrderFormComponent} from './order/order-form/order-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderService} from './services/order/order.service';
import {HttpClientWrapperService} from './shared/http-client-wrapper/http-client-wrapper.service';
import {HttpClientModule} from '@angular/common/http';
import {CustomerComponent} from './customer/customer.component';
import {MonogramItemComponent} from './item/monogram-item/monogram-item.component';
import {CreateOrderDialogComponent} from './shared/create-order-dialog/create-order-dialog.component';
import { PhoneFormatterPipe } from './shared/pipes/formatters/phone-formatter.pipe';
import { FilterPipe } from './shared/pipes/filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    DashboardComponent,
    OrderFormComponent,
    CustomerComponent,
    MonogramItemComponent,
    CreateOrderDialogComponent,
    PhoneFormatterPipe,
    FilterPipe
  ],
  entryComponents: [
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatOptionModule,
    MatCardModule,
    MatListModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    OrderService,
    HttpClientWrapperService,
    MonogramItemComponent,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
