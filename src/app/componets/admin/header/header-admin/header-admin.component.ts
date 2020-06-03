import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
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
    // {title: 'Editar Perfil'},
    { title: 'Salir', subtitle: 'Bienvenido,', icon: 'log-out-outline', data: { id: 'logot' } }];
  user: any;
  tipo: any;
  imgProfile: any;
  dataUser: any;
  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private authService: AuthServiceService,
    private router: Router,
    public dialog: MatDialog,
    private auth: AngularFireAuth,

  ) { 
    this.menuService.onItemClick()
    .subscribe((event) => {

      switch (event.item.title) {

        case "Salir":
          this.logout();
          break;
      }
    });
  }

  ngOnInit(): void {
    const auths = this.auth.authState.subscribe(res => {
      this.user = res.displayName;
      this.imgProfile = res.photoURL;
      this.dataUser = res
      auths.unsubscribe()
    })
  }


  logout(){
    this.authService.logOut().then(() => {
      // this.component.showHeader = false
      this.router.navigate(['/login']);
    })
  }
  toggle() {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }
}
