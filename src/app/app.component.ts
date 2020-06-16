import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from './services/user/user-service.service';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from './services/auth/auth-service.service';
import { Component } from '@angular/core';
import { globals } from 'src/environments/golbals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eduacionDistanciJC';
  userObs$: Observable<any>;
  userSub: Subscription;
  showHeader: boolean = globals.estado;
  load: boolean = false;
  test = globals
  constructor(
    private _auth: AuthServiceService,
    private _user: UserServiceService,
    private auth: AngularFireAuth,
    private router: Router,
  ) {
    this.loadUser();

  }
  ngOnInit() {
  }

  async loadUser() {
    const auths = await this.auth.authState.subscribe(res => {
      if (res?.uid) {
        console.log(res.uid);
        globals.udi = res.uid;

        this.userObs$ = this._user.login(res.uid);
        this.userSub = this.userObs$.subscribe(user => {
          globals.type = user.type;
          globals.name = user.name;

          console.log(user);
            globals.data = user;
           
          globals.estado = true;
          if (user.type === 'STUDENT') {
            this.router.navigate(['inicio-estudiante']);

          } else if (user.type === 'TEACHER') {
            this.router.navigate(['inicio-maestro']);

          } else {
            this.router.navigate(['inicio-administrador']);

          }
          this.showHeader = true;
          this.load = true;
        })
      } else if (res?.uid === null) {
        console.log(res.uid);
        globals.estado = false;
        this.showHeader = false;
        this.load = true
        this.router.navigate(['login']);
      }

    })

    // this.userObs$ = this._user.login(uid)
    // this.userSub = this.userObs$.subscribe(res => {
    //   globals.type = res.type;
    //   globals.name = res.name;
    //   globals.estado = true;
    // })

  }
}
