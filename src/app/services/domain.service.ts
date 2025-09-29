import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class DomainService {

    constructor() { }
      mode="dev";

      base_url="https://omdistributer.in/";
      main_url=this.base_url+'om/admin/';
      pay_url=this.mode=='prod'?"https://omdistributer.in/om/admin/":"https://omdistributer.in/om/admin/";
      modal_url=this.main_url+"modal/modal.php";
      img_url=this.main_url+"img/";

      get_main_url(){
        return this.main_url;
      }

      get_modal_url(){
        return this.modal_url;
      }
      get_img_url()
      {
        return this.img_url;
      }

      generatePaymentUrl(bid:any)
      {
        return this.pay_url+bid;
      }

    }

