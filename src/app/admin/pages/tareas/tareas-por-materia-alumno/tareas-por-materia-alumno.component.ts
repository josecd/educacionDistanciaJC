import { OnlineFrameComponent } from './../../../../modals/admin/online/online-frame/online-frame.component';
import { EntregarTareaComponent } from './../entregar-tarea/entregar-tarea.component';
import { UserServiceService } from './../../../../services/user/user-service.service';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { AdminService } from './../../../../services/admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { globals } from 'src/environments/golbals';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as type from '../../../../../environments/golbals';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tareas-por-materia-alumno',
  templateUrl: './tareas-por-materia-alumno.component.html',
  styleUrls: ['./tareas-por-materia-alumno.component.scss']
})
export class TareasPorMateriaAlumnoComponent implements OnInit {
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

  id
  constructor(
    private router: Router,
    private _admin: AdminService,
    private _user: UserServiceService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.id = this.route.snapshot.paramMap.get("id");    
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
      this.grupoObs$ = this._admin.getTareasByIdGroup(this.id);
      this.grupoSub = this.grupoObs$.subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.lengthTable = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    
  }

  //Metodo para el filtro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTareaEntregar(tarea){
   
      this.dialog.open(EntregarTareaComponent, {
        // width: '100%',
        // height:'100%',
        disableClose: true,
        data: {
          idTarea: this.id,
          tarea: tarea
        }
      });
    
  }
  opdenCreateTaskOnline(id) {
    this.dialog.open(OnlineFrameComponent, {
      width: '100%',
      // height:'100%',
      disableClose: true,
      data: id
    });
  }
}
