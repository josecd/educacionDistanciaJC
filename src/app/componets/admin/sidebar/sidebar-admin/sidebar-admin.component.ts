import { globals } from 'src/environments/golbals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  itemsAdmin = [
    {
      title: 'Dashboard',
      link: '/dashboard', 
      icon: 'home-outline'
    },
  
  ];
  typeUser = globals
  constructor() { }

  ngOnInit(): void {
    this.loadSidebar();
  }

  loadSidebar(){
    if (this.typeUser.type === 'ADMIN') {
      this.itemsAdmin=[
        {
          title: 'inicio',
          link: '/inicio-administrador', 
          icon: 'home-outline'
        },
        {
          title: 'Materias',
          link: '/materias', 
          icon: 'home-outline'
        },
        {
          title: 'Maestros',
          link: '/maestros', 
          icon: 'home-outline'
        },
        {
          title: 'Alumnos',
          link: '/alumnos', 
          icon: 'home-outline'
        },       
      ]
    }else if (this.typeUser.type === 'STUDENT') {
      this.itemsAdmin=[
        {
          title: 'inicio',
          link: '/inicio-estudiante', 
          icon: 'home-outline'
        }
      ]
    }else if(this.typeUser.type === 'TEACHER'){
      this.itemsAdmin=[
        {
          title: 'inicio',
          link: '/inicio-maestro', 
          icon: 'home-outline'
        }
      ]
    }
  }

}
