import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { SmsService } from '../services/sms.service';
import { APIService } from '../services/api.service';
import { EnquiryPopupComponent } from '../enquiry-popup/enquiry-popup.component';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  data:any=[];
  contact_no="7972756985";
  BusinessName="OM DISTRIBUTER";
  support_email="omdistributer4@gmail.com";
  businessAddress=`1738 Dhage Ali, Raviwar peth wai.
                        Near kalubai mandir
                        Tal WAI, Dist Satara 
                        Pin 412803`;
  constructor(
    private loader:LoaderService,
    private sms:SmsService,
    private modal:ModalServiceService,
    private api:APIService,
    private router:Router) { }

  ngOnInit(): void {
  }
  goToPlaceOrder()
  {
this.router.navigateByUrl("place_order")
  }

  goToTrackOrder()
  {
    this.router.navigateByUrl("tracking")

  }

  goToRegister()
  {
    this.router.navigateByUrl("register")
  }

  open_modal(type:any)
  {
    this.modal.openModal(type);
  }
 
  send_message()
  {


    
      if(!this.data.customer_name)
      {
        this.sms.print_error("Please Enter Your Name");
        return;
      }

      if(!this.data.customer_email)
        {
          this.sms.print_error("Please Enter Email");
          return;
        }

        if(!this.data.message)
          {
            this.sms.print_error("Please Enter Your Message");
            return;
          }

          this.loader.start_loading();
          let val_list=[];
          val_list.push(this.data.customer_name,this.data.customer_email,this.data.message);
          let dd={
            modal:"enquiry",
            sub_modal:"add",
            val_list:val_list
          }
          this.api.post_api(dd).subscribe((res)=>{
            this.loader.stop_loading();
            this.sms.print_success("We have Recevied Your Request Our Team will Get back To You.");
            this.data.customer_name="";
            this.data.customer_email="";
            this.data.message="";
          },(error)=>{
            this.loader.stop_loading();
            this.sms.print_error("Something went wrong try again");
          })

  }
}
