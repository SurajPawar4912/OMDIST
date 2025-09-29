import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { FormsModule } from '@angular/forms';
import { CourierTrackingComponent } from './courier-tracking/courier-tracking.component';
import { AgspaymentComponent } from './agspayment/agspayment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SmsService } from './services/sms.service';
import { Toast } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { EnquiryPopupComponent } from './enquiry-popup/enquiry-popup.component';
import { CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaceOrderComponent,
    CustomerRegistrationComponent,
    CourierTrackingComponent,
    AgspaymentComponent,
    DashboardComponent,
    OrderSummaryComponent,
    ProfileSettingsComponent,
    OrderListComponent,
    EnquiryPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NgxUiLoaderModule,
  ],
  providers: [SmsService,Toast,{provide: LocationStrategy, useClass: HashLocationStrategy},CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
