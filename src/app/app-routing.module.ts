import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CourierTrackingComponent } from './courier-tracking/courier-tracking.component';
import { AgspaymentComponent } from './agspayment/agspayment.component';

const routes: Routes = [
 {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
},{
  path:'place_order',
  component:PlaceOrderComponent
}
,{
  path:'register',
  component:CustomerRegistrationComponent
}
,{
  path:'tracking',
  component:CourierTrackingComponent
}
,{
  path:'tracking/:id/:sts',
  component:CourierTrackingComponent
},
{
  path:'tracking/:id',
  component:CourierTrackingComponent
},
{
  path:'agspay/:id',
  component:AgspaymentComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
