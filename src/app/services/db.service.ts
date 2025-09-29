import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  admin_key="ADMINM_S0999";
  footer_data:any=new Subject;
  login_storage_key="login_details009";

  DB_STORE_KEY={
    KEY:"KEY",
    TEMP_DATA:"TEMP_DATA",
    TRANSACTION_DETAILS:"TRANSACTION_DETAILS",

  }

  myDate:any;
  constructor(
    private datePipe: DatePipe
  )
  {

   }

  get_page_list()
  {
    return  [
      {id:"homepage",name:'Homepage'},
      {id:"subpage",name:'Subpage'},
      {id:"innerpage",name:'innerpage'},
      {id:"other",name:'Other'}
    ];
  }
  get_category_type_list()
  {
    return  [
      {id:"normal",name:'normal'},
      {id:"product",name:'product'},
      {id:"service",name:'service'},
      {id:"portfolio",name:'portfolio'},
      {id:"package",name:'package'},
      {id:"other",name:'other'}
    ];
  }
  get_type_list()
  {
    return [
      {id:"page",name:"page"},
      {id:"block",name:"block"},
      {id:"section",name:"section"},
      {id:"sub_page",name:"sub_page"},
      {id:"full_page",name:"full_page"}
    ]
  }
  get_menu_list()
  {
    return [
      {
        name:"all"
      },
      {
        name:"admin"
      },
      {
        name:"pages"
      },
      {
          name:"dashboard"
      },
      {
        name:"setting"
      }
    ];
  }

  get_admin_key()
  {
     return this.admin_key;
  }

  save_data(key:any,obj:any)
  {
    localStorage.setItem(key,obj);
  }

  get_data(key:any)
  {
    let dd:any=localStorage.getItem(key);
    return dd;
  }

get_login_key(){
  return this.login_storage_key;
}

  get_previous_date(day:number){
  this.myDate=new Date();
  this.myDate.setDate(this.myDate.getDate()-day);
  this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  return this.myDate;
  }

  get_post_date(day:number){
    this.myDate=new Date();
  this.myDate.setDate(this.myDate.getDate()+day);
  this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  return this.myDate;
  }

  get_date(){
  this.myDate=new Date();
  this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  return this.myDate;
  }
  isJson(str:any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  get_date_time(){
    this.myDate=new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy, h:mm a');
    return this.myDate;
  }

  get_date_year(){
    this.myDate=new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy');
    return this.myDate;
  }
  generateNO()
  {
    var dt = new Date();
    var no=Math.floor(Math.random() * 10) + 1;
    var n1=moment(dt).format("DDMMYYYY");
    return n1+"_"+no;
  }

}
