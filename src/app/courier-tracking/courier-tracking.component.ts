import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { SmsService } from '../services/sms.service';
import { APIService } from '../services/api.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../services/domain.service';

@Component({
  selector: 'app-courier-tracking',
  templateUrl: './courier-tracking.component.html',
  styleUrls: ['./courier-tracking.component.scss']
})
export class CourierTrackingComponent implements OnInit {

  tracking_data:any;
  payment_data:any;
  payment_sts="pending";

  
  constructor(
    private loader:LoaderService,
    private sms:SmsService,
    private domain:DomainService,
    public route:Router,
    private activatedRoute:ActivatedRoute,
    private api:APIService){
      this.activatedRoute.params.subscribe((params:any) => {
        let tracking_id=params['id'];
        let payment_mode=params['sts'];
        this.submitted = true;
        if(tracking_id)
        {
          if(payment_mode=="paid")
          {
            this.sms.print_success("Payment Sucessful");
          }else if(payment_mode=="faild")
          {
            this.sms.print_error("Payment Faild");
          }else if(payment_mode=="cancel"){
            this.sms.print_error("Payment Faild");
          }else{

          }
          this.trackingId=tracking_id;
          this.onTrack();
        }
    
        
      });

     }

  ngOnInit(): void {
  }
  trackingId: string = '';
  trackingInfo: any = null;
  submitted: boolean = false;

  onTrack(): void {
    
    this.submitted = true;

    if (!this.trackingId) {
      this.sms.print_error("Please Enter Tracking ID")
      return;
    }
    let dd={
      modal:"tracking",
      sub_modal:"fetch",
      id:this.trackingId
    };
    this.loader.start_loading();
    this.api.post_api(dd).subscribe((res)=>{
      this.loader.stop_loading();
      if(res.length>0)
      { 
        this.tracking_data=res[0];
    
        this.fetchTrackingInfo(this.trackingId);
      }else{
        this.sms.print_error("No Records Found");
      }
    },(error)=>{
      this.loader.stop_loading();
      this.sms.print_error("Something Went Wrong");
    });

  }

  backBtn(){
    this.route.navigateByUrl("home");
  }
  fetchTrackingInfo(id:any) {
    let dd={
      modal:"payment",
      sub_modal:"check_tracking",
      id:this.trackingId
    };
    this.loader.start_loading();
    this.api.post_api(dd).subscribe((res)=>{
      this.loader.stop_loading();
      if(res.length>0)
      {
        this.payment_data=res[0];
        this.payment_sts=(this.payment_data.pay_sts=="success")?"paid":this.payment_data.pay_sts;
      }else{
            this.payment_data={};
            this.payment_sts="pending";
      }
   
    },(error)=>{
      this.loader.stop_loading();
    });
  }
  pay_now(x:any)
  {
    this.loader.start_loading();
  
    let dd={
      modal:"payment",
      sub_modal:"generate_order",
      amount:Number(x.price)*100,
      receipt:x.cust_name,
      tracking_id:x.tracking_id,
      order_dt:JSON.stringify(x)
    };
    this.api.post_api(dd).subscribe((res)=>{
      this.loader.stop_loading();
      let order_data=JSON.parse(res.order_data);
      console.log("Order Data",order_data);
      if(order_data)
      {
        let order_id=order_data.id;
        let tracking_id=x.tracking_id;
        let url="https://omdistributer.in/admin/pay/#payment/"+order_id+"/"+tracking_id;
        window.open(url,"_blank");
        console.log("Order ID ",order_data.id);
      }
    },(error)=>{
      this.loader.stop_loading();
    })
  }
  get_amount(amt:any)
  {
    return Number(amt);
  }
  share_link(dt:any)
  {
    let url=this.domain.base_url+"tracking/"+dt.tracking_id+"/";
    let final_url="https://api.whatsapp.com/send/?text="+url;
   // let final_url="https://wa.me/?text="+url;
    console.log("Final Url ",final_url);
    window.open(final_url,"_blank");
  }
}
