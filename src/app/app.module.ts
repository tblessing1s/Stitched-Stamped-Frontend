import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
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
import {ItemComponent} from './create-new-order/stepper/item/item.component';
import {WarningDialogComponent} from './shared/warning-dialog/warning-dialog.component';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {OrderTableComponent} from './main-dashboard/purchase-order-table/order-table/order-table.component';
import {MonogramDisplayComponent} from './main-dashboard/monogram-display/monogram-display.component';
import {OverflowMenuComponent} from './shared/overflow-menu/overflow-menu.component';
import {EditMonogramComponent} from './main-dashboard/monogram-display/edit-monogram/edit-monogram.component';
import {PurchaseOrderTableComponent} from './main-dashboard/purchase-order-table/purchase-order-table.component';
import {SpecialOrderComponent} from './create-new-order/stepper/item/special-order/special-order.component';
import {SelectItemDialogComponent} from './create-new-order/stepper/item/select-item-dialog/select-item-dialog.component';
import {MonogramTableComponent} from './main-dashboard/purchase-order-table/monogram-table/monogram-table.component';
import {SpecialOrderTableComponent} from './main-dashboard/purchase-order-table/special-order-table/special-order-table.component';
import {SpecialOrderDisplayComponent} from './main-dashboard/special-order-display/special-order-display.component';
import {EditSpecialOrderComponent} from './main-dashboard/special-order-display/edit-special-order/edit-special-order.component';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {OktaConfig} from './okta-config';

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
    MainDashboardComponent,
    OrderTableComponent,
    MonogramDisplayComponent,
    OverflowMenuComponent,
    EditMonogramComponent,
    PurchaseOrderTableComponent,
    SpecialOrderComponent,
    SelectItemDialogComponent,
    SpecialOrderComponent,
    MonogramTableComponent,
    SpecialOrderTableComponent,
    SpecialOrderDisplayComponent,
    EditSpecialOrderComponent,
  ],
  entryComponents: [
    CustomerComponent,
    OrderConfirmationComponent,
    WarningDialogComponent,
    SelectItemDialogComponent,
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
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    OktaAuthModule
  ],
  providers: [
    HttpClientWrapperService,
    MatDialogConfig,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: OKTA_CONFIG, useValue: OktaConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
