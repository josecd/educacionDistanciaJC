import { AdminService } from './../../../../services/admin/admin.service';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  userMenu = [
    { title: 'Salir', subtitle: 'Bienvenido,', icon: 'log-out-outline', data: { id: 'logot' } }];

  userNotification = [

  ]
  not='Notificaciones'
  num= 2
  menuItems = [];
  user: any;
  tipo: any;
  imgProfile: any;
  dataUser: any;
  userObs$: Observable<any>;
  userSub: Subscription;
  datas = []
  ico='https://u01.appmifile.com/images/2017/11/12/53df27d1-ce89-49dc-ae19-2c122efb0c34.png'
  lengthTable
  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private authService: AuthServiceService,
    private router: Router,
    public dialog: MatDialog,
    private auth: AngularFireAuth,
    private _admin: AdminService

  ) {
    this.menuService.onItemClick()
    .subscribe((event) => {

      switch (event.item.title) {
        case "notificaiones":

        break;
        case "Salir":
          this.logout();
          break;
      }
    });

    this.loadUsers()

    this.menuService.onItemClick()
      .subscribe((event) => {

        switch (event.item.title) {
          case "test":
            this.goToNotification(event.item.link)
            break;
          case "Salir":
            this.logout();
            break;
        }
      });
  }

  async loadUsers() {
    this.userObs$ = await this._admin.getUsers();
    this.userSub = this.userObs$.subscribe(res => {
      this.datas = res;
      this.userNotification = []

      this.datas.forEach(async element => {

        const r = {
          title: element.name +"   "+element.type ,
          link: '/inicio/' + element._id,
          subtitle: element.type +'<br>'
        }
        this.userNotification.push(r)
        // this.addMenuItem(element.name, element._id)
      });
      this.lengthTable = this.userNotification.length;
      
      this.datas = []
    })
  }

  addMenuItem(title, url) {
    this.menuService.addItems([{
      title: title,
      icon: 'plus-outline',
      url: url,
    }]);
  }


  ngOnInit(): void {
    const auths = this.auth.authState.subscribe(res => {
      this.user = res.displayName;
      this.imgProfile = res.photoURL;
      this.dataUser = res
      auths.unsubscribe()
    })
  }


  logout() {
    this.authService.logOut().then(() => {
      // this.component.showHeader = false
      this.router.navigate(['/login']);
    })
  }

  goToNotification(id) {
    this.router.navigate(['/inicio', id]);
    this.userNotification = []
    this.loadUsers()
  }

  toggle() {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }
}
