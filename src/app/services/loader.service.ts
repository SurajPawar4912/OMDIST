/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    constructor(private loader:NgxUiLoaderService)
  {

  }

  async start_loading()
  {
    try{
      console.log("loader started");
     this.loader.startLoader('main_loader');

    }catch(e)
    {
      console.log("Error Stop Loading=>",e);
    }
  }

  stop_loading(){
    try{
      //this.loader.stop();
      console.log("loader stoped");
      this.loader.stopLoader('main_loader');
    }catch(e)
    {
      console.log("Error Stop Loading=>",e);
    }
  }

}
