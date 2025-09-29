


  import { Component, ElementRef, ViewChild } from '@angular/core';
import { APIService } from '../services/api.service';
import { DbService } from '../services/db.service';
import { SmsService } from '../services/sms.service';
import { LoaderService } from '../services/loader.service';

  @Component({
    selector: 'app-enquiry-popup',
    templateUrl: './enquiry-popup.component.html',
    styleUrls: ['./enquiry-popup.component.scss']
  })
  export class EnquiryPopupComponent  {
    
    data:any=[];
    projectPopUp:any=false;
    modalType="";
    constructor(
      private api:APIService,
      private sms:SmsService,
      private loader:LoaderService
    ) {}
  
    // Open Modal
    openModal(type:any) {
      this.modalType=type;
      this.projectPopUp = true;
    }
  
    // Close Modal
    closeModal() {
      this.projectPopUp = false;
    }
  
    // Handle "Get Quote" logic here
    getQuote() {
      if(!this.data.name)
      {
        this.sms.print_error("please Enter Full Name");
        return;
      }

      if(!this.data.email)
        {
          this.sms.print_error("please Enter Email");
          return;
        }

        if(!this.data.contact)
          {
            this.sms.print_error("please Enter Contact");
            return;
          }

          if(this.modalType=="quote")
          {

          if(!this.data.service)
          {
            this.sms.print_error("Please Select Service Type");
            return;
          }
          if(!this.data.city)
            {
              this.sms.print_error("Please Select City");
              return;
            }
          }

          
          if(this.modalType=="refund" || this.modalType=="cancel")
            {
              if(!this.data.tracking)
                {
                  this.sms.print_error("Please Enter Tracking Number");
                  return;
                }
            }

            if(!this.data.message)
              {
                this.sms.print_error("Please Describe Your Product Or Requirement");
                return;
              }

              this.submit_reuqest();
      
    }

    submit_reuqest()
    {
     var val_list=[];
     let sub_modal="";
if(this.modalType=="refund" )
{
  sub_modal="add_return_enq";
  val_list.push(
    this.data.name,
    this.data.email,
    this.data.message,
    this.data.contact,
    this.data.tracking
   );
}else if(this.modalType=="cancel")
  {
    sub_modal="add_cancel_enq";
    val_list.push(
      this.data.name,
      this.data.email,
      this.data.message,
      this.data.contact,
      this.data.tracking
     );
  }
else{
  sub_modal="add_quote_enq";
     val_list.push(
      this.data.name,
      this.data.email,
      this.data.message,
      this.data.city,
      this.data.service,
      this.data.contact
     );

    }
      let dd={
        modal:"enquiry",
        sub_modal:sub_modal,
        "val_list":val_list
      }
      this.loader.start_loading();
      this.api.post_api(dd).subscribe((res)=>{
        this.closeModal();

        this.sms.print_success("Your Request is Submitted");
        console.log("Request Response",res);
        this.loader.stop_loading();

      },(error:any)=>{
        this.loader.stop_loading();
        this.sms.print_error("Something Went Wrong Try Again");
      })
    }
  }
  
