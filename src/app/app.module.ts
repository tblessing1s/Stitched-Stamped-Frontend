import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    ErrorStateMatcher,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogConfig,
    MatDialogModule,
    MatDialogRef, MatExpansionModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule, MatTableModule,
    ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {PurchaseOrderFormComponent} from './create-new-order/stepper/purchase-order-form/purchase-order-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientWrapperService} from './shared/http-client-wrapper/http-client-wrapper.service';
import {HttpClientModule} from '@angular/common/http';
import {CustomerComponent} from './customer/customer.component';
import {MonogramItemComponent} from './create-new-order/stepper/item/monogram-item/monogram-item.component';
import {StepperComponent} from './create-new-order/stepper/stepper.component';
import {OrderConfirmationComponent} from './create-new-order/stepper/order-confirmation/order-confirmation.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ItemComponent } from './create-new-order/stepper/item/item.component';
import { WarningDialogComponent } from './shared/warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrderFormComponent,
    CustomerComponent,
    MonogramItemComponent,
    StepperComponent,
    OrderConfirmationComponent,
    ItemComponent,
    WarningDialogComponent,
  ],
  entryComponents: [
    CustomerComponent,
    OrderConfirmationComponent,
    WarningDialogComponent
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
        MatOptionModule,
        MatCardModule,
        MatListModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatRadioModule,
        MatStepperModule,
        MatDialogModule,
        CdkStepperModule,
        MatGridListModule,
        MatTableModule,
        MatExpansionModule
    ],
  providers: [
    HttpClientWrapperService,
    MatDialogConfig,
    {provide: MatDialogRef, useValue: {}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
