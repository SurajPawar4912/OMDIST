import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomainService } from './domain.service';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';

import { DbService } from './db.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}),
};
const httpOptions_upload = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),

};

@Injectable({
  providedIn: 'root'
})
export class APIService {

  data:any=[];
  key="123456";
  customer_id:any="";
  conversionEncryptOutput: string="";
  conversionDecryptOutput:string="";
  constructor(
    private HTTP:HttpClient,
    private domain:DomainService
    )
  {
    this.data.modal_url=this.domain.get_modal_url();
  }

  set(keys:any, value:any){

    var encrypted = CryptoJS.AES.encrypt(keys,value);
    return encrypted.toString();
  }
  post_api(dd:any)
  {
    let token=this.get_token();
    let httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','token':token
      }),
    };

   return this.HTTP.post<any>(this.data.modal_url,dd,httpOptions1);
  }

  image_upload_api(dd:any){
    return this.HTTP.post<any>(this.data.modal_url,dd,httpOptions_upload);
  }

  get_token(){

    var token_g:any = moment().format("HHmmss");
    console.log("TOKEN",token_g);
    var secrete_no:any = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    var secret_text:any = token_g * secrete_no + "" + "" + secrete_no;
  
  
  this.data.text1=secret_text;
          console.log(this.data.text1);
          const CryptoJSAesJson = {
            stringify: function (cipherParams:any) {
                const vbJsonString:any = {
                  ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
                };
                if (cipherParams.iv) {
                  vbJsonString['iv'] = cipherParams.iv.toString()
                };
                if (cipherParams.salt) {
                  vbJsonString['s'] = cipherParams.salt.toString()
                };
                return JSON.stringify(vbJsonString);
            },
            parse: function (jsonStr:any) {
                const vbJsonParse = JSON.parse(jsonStr);
                const cipherParams = CryptoJS.lib.CipherParams.create({
                  ciphertext: CryptoJS.enc.Base64.parse(vbJsonParse.ct)
                });
                if (vbJsonParse.iv) {
                  cipherParams['iv'] = CryptoJS.enc.Hex.parse(vbJsonParse.iv)
                }
                if (vbJsonParse['s']) {
                  cipherParams.salt = CryptoJS.enc.Hex.parse(vbJsonParse.s)
                }
                return cipherParams;
            }    
        }
            this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.data.text1,this.key,{format: CryptoJSAesJson}).toString();
    return this.conversionEncryptOutput;
          }
    
}