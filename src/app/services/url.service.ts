import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }
  main_url='https://omdistributer.in/om/admin/';
  modal_url=this.main_url+'modal/modal.php';
  img_url=this.main_url+'img/';

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

  get_no_img_url()
  {
    return "assets/img/no_img.png";
  }

}
