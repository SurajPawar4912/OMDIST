import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {



  ngOnInit(): void {
  }
  isLogin = true; // Toggle between login and registration
  loginData = {
    email: '',
    password: ''
  };
  registerData = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  
  loginSubmitted = false;
  registerSubmitted = false;

  constructor(private router: Router,
    private api:APIService,
    private loader:LoaderService
  ) {}

  onLoginSubmit(): void {
    this.loginSubmitted = true;
    console.log("Valoidatiaon Sts",this.isValidLoginForm());
    if (this.isValidLoginForm()) {
      this.loader.start_loading();
      let dd={
        modal:"login",
        sub_modal:"customer",
        email:this.loginData.email,
        pass:this.loginData.password
      }
      this.api.post_api(dd).subscribe((res)=>{
        this.loader.stop_loading();
        console.log("Response",res);
      },(error)=>{
        this.loader.stop_loading();
      })
      
    }
  }

  onRegisterSubmit(): void {
    this.registerSubmitted = true;

    if (this.isValidRegisterForm()) {
      this.loader.start_loading();
      let val_list=[];
      val_list.push(

      );

      let dd={
        modal:"login",
        sub_modal:"customer",
        email:this.loginData.email,
        pass:this.loginData.password
      }
      this.api.post_api(dd).subscribe((res)=>{
        this.loader.stop_loading();
        console.log("Response",res);
      },(error)=>{
        this.loader.stop_loading();
      })
    }
  }

  isValidLoginForm(): any {
    return this.loginData.email && this.isValidEmail(this.loginData.email) && this.loginData.password.length >= 6;
  }

  isValidRegisterForm():any{
    return this.registerData.name && this.registerData.email && this.isValidEmail(this.registerData.email) && this.registerData.phone && this.registerData.password.length >= 6;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  toggleForm(): void {
    this.isLogin = !this.isLogin;
    this.loginSubmitted = false;
    this.registerSubmitted = false;
  }
}
