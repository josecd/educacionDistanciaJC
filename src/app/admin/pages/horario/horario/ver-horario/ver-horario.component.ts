import { UserServiceService } from './../../../../../services/user/user-service.service';
import { Observable, Subscription } from 'rxjs';
import { globals } from './../../../../../../environments/golbals';
import { AdminService } from './../../../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-horario',
  templateUrl: './ver-horario.component.html',
  styleUrls: ['./ver-horario.component.scss']
})
export class VerHorarioComponent implements OnInit {
  img
  id = globals.udi;
  userObs$: Observable<any>;
  userSub: Subscription;
  horarioObs$: Observable<any>;
  horarioSub: Subscription;
  dataHorario
  
  constructor(
    private _admin: AdminService,
    private _user: UserServiceService
  ) { }

  ngOnInit(): void {
    this.getHorario();
  }

  getHorario() {
    this.userObs$ = this._user.login(this.id);
    this.userSub = this.userObs$.subscribe(user => {
      console.log(user.idGroup._id);
       this._admin.getHorario(user.idGroup._id).then(res=>{
         console.log(res);
         this.img = res.url
       })
    })
  }
}
