// src/app/modal.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { EnquiryPopupComponent } from '../../app/enquiry-popup/enquiry-popup.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  openModal(type:any) {
    const factory = this.resolver.resolveComponentFactory(EnquiryPopupComponent);
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    componentRef.instance.openModal(type);
  }
}

