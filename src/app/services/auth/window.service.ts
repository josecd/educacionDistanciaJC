import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  confirmationResult: any;
  constructor() { }

  get windowRef() {
    return window;
  }

  setWnd
}
