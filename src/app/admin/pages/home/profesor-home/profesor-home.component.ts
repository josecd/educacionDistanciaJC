import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { UserServiceService } from './../../../../services/user/user-service.service';
import { Component, OnInit } from '@angular/core';
import * as type from '../../../../../environments/golbals';
@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.scss']
})
export class ProfesorHomeComponent implements OnInit {

  constructor(
    private _user : UserServiceService,
    private _auth : AuthServiceService
  ) { 
      this.load()
  }

  load(){
  this._auth.getCurrentUser().then(res=>{
    console.log(res);
    
  })
  }

  ngOnInit(): void {
    console.log(type.globals);
    
  }

}
