import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToasterserviceService {

  constructor(
    private toastrService: NbToastrService
  ) { }

  showToast(position, status,  message) {
    this.toastrService.show(
      status || 'Exito',
      message,
      { position, status , duration: 4000 });
  }
}
