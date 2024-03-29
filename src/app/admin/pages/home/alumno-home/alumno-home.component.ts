import { UserServiceService } from './../../../../services/user/user-service.service';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { AdminService } from './../../../../services/admin/admin.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { globals } from 'src/environments/golbals';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as type from '../../../../../environments/golbals';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.scss']
})
export class AlumnoHomeComponent implements OnInit {

  userType = globals.type;
  idGroup = globals.data;
  idUser = globals.udi
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'email', 'acciones'];
  dataSource: any;
  lengthTable: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //Termina la tabla

  grupoObs$: Observable<any>;
  grupoSub: Subscription;

  userObs$: Observable<any>;
  userSub: Subscription;

  constructor(
    private router: Router,
    private _admin: AdminService,
    private _user: UserServiceService
  ) {
    console.log(this.idGroup);
    
   }

  ngOnInit(): void {
    console.log(this.idGroup);

    this.loadUser();

  }
  ngOnDestroy() {
    if (this.grupoSub) {
      this.grupoSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  loadUser(){
    this.userObs$ = this._user.login(this.idUser);
    this.userSub = this.userObs$.subscribe(res=>{
      this.grupoObs$ = this._admin.getMateriasBygroup(res.idGroup._id);
      this.grupoSub = this.grupoObs$.subscribe(res => {
        console.log(res);
        
        this.dataSource = new MatTableDataSource(res);
        this.lengthTable = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    });
  }

  //Metodo para el filtro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goTareasEntregar(id) {

    this.router.navigate(['/entregar-tareas', id._id]);
    // this.router.navigateByUrl('/modificar-grupos',id); 
  }
}
