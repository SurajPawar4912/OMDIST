import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../services/api.service';
declare var Razorpay:any
@Component({
  selector: 'app-agspayment',
  templateUrl: './agspayment.component.html',
  styleUrls: ['./agspayment.component.scss']
})
export class AgspaymentComponent implements OnInit {


  final_payment_sts:any=false;
  data:any=[];
  loader: any;
  API: any;
  order_id="";
  customer_id=0;

  constructor(public router:Router,
    private api:APIService,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params:any) => {
      this.order_id=params['id'];
    
     this.pay_now(this.order_id);
 
    });
   }

  ngOnInit(): void {
  }

  start_payment(){
    console.log("payment started");
    // this.pay_now();
    

  }
  
  get_order_details(order_id:any)
  {
    return new Promise((resolve,reject)=>{
      let dd={
        modal:"payment",
        sub_modal:"customer_details_with_order_id",
        order_id:order_id
      }
      this.api.post_api(dd).subscribe((res)=>{
        resolve(res);
      },(error)=>{
        reject(error);
      })
    });
  }
  update_payment_sts(id:any,val_list:any,sts:any)
  {
    let dd={
      modal:"payment",
      sub_modal:"update_sts",
      id:id,
      val_list:val_list,
      cid:this.customer_id
    }
    this.api.post_api(dd).subscribe((res)=>{

    
     
    },(error)=>{
     
    })
  }

  update_wallet(amount:any)
  {
    let dd={
      modal:"wallet",
      sub_modal:"update_amount",
      id:this.customer_id,
      amount:amount
    }
    this.api.post_api(dd).subscribe((res)=>{
      console.log("Wallet Update Balance",res);
    },(error)=>{
     
    })
  }




  pay_now(order_id:any){

    this.get_order_details(order_id).then((order_data:any)=>{
    console.log("order_data",order_data);  
   
    var merchant_key="rzp_test_ahT6pNPaKWMEfb";
    var amount= 10;
    var name="OM DISTRIBUTOR";
    var description="any";
    this.customer_id=(order_data && order_data[0].cid);
    var customer_name=(order_data && order_data[0].cust_name);
    var customer_contact=(order_data && order_data[0].cust_contact);
    var customer_email=(order_data && order_data[0].cust_email);

    let paying_amount=(order_data && order_data[0].paying_amount);
    {
   // this.loader.start_loading();
      var options:any = {
        // "key": merchant_key,
        "order_id":order_id,
        "amount": paying_amount,
        "currency": "INR",
        "name": name,
        "description": description,
        "prefill": {
                    "name": customer_name,
                    "contact": "+91"+customer_contact,
                    "email": customer_email
                    },
        "notify": {
                    "sms": true,
                    "email": true
                    },
                    "reminder_enable": true,

        "modal": {
                      "ondismiss":()=>{
                        this.final_payment_sts="failed";
                          console.log('Checkout form closed');
                          let val_list=[];
                          val_list.push("00","00","failed","user has cancled or transaction faild ");
                          this.update_payment_sts(order_id,val_list,"failed");  
                          this.router.navigateByUrl('bad-request');
                      }
                    },
        "handler": (response:any)=>{
          console.log("response of paynoe",response);
        
          // let val_list=[];
          //     val_list.push(response.razorpay_payment_id,response.razorpay_signature,"success","paid from razorpay");
          //     this.update_payment_sts(order_id,val_list,"success");  

          let dd={
                    modal:'payment',
                    sub_modal:'check_status',
                    order_id:response.razorpay_order_id,
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_signature:response.razorpay_signature,
        }
          this.api.post_api(dd).subscribe((result:any)=>{
            if (result.payment_status == "success") {

              this.final_payment_sts="success";
              let val_list=[];
              val_list.push(response.razorpay_payment_id,response.razorpay_signature,"success","paid from razorpay");
              this.update_payment_sts(order_id,val_list,"success");
              this.update_wallet(Number(paying_amount/100));
              this.router.navigateByUrl('browser-paid');
             
            }else{

                   // payment capture mannual and update status
                   this.final_payment_sts="failed";
                   let val_list=[];
                   val_list.push(response.razorpay_payment_id,response.razorpay_signature,"pending","pening to capture");
                   this.router.navigateByUrl('browser-cancel');
               
                  //  this.caturePayment(response,paying_amount).then((cap_res)=>{
                  // });
             

                }
          });


  

          }
        }
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response:any)=>{
      console.log("FAIL",response);
     // this.router.navigateByUrl("browser-cancel");
     this.router.navigateByUrl("browser-cancel").then((x)=>{
      window.location.reload();
    });
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
});
// this.loader.stop_loading();
    rzp1.open();
  }


});

}

caturePayment(payment_id:any,paying_amount:any)
{
  return new Promise((resolve,reject)=>{
  let dd={
    modal:"payment",
    sub_modal:"capture",
    pay_id:payment_id,
    amount:paying_amount
  }
  this.api.post_api(dd).subscribe((result:any)=>{
    resolve(result);
  },(error)=>{
    resolve("error");
  });
});
}

}
