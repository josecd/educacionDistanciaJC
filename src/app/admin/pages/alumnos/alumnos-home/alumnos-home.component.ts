import { AlumnosCreateComponent } from './../alumnos-create/alumnos-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumnos-home',
  templateUrl: './alumnos-home.component.html',
  styleUrls: ['./alumnos-home.component.scss']
})
export class AlumnosHomeComponent implements OnInit {
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'email', 'acciones'];
  dataSource
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //Termina la tabla
  
  alumnoObs$:Observable<any>;
  alumnoSub: Subscription;

  grupoObs$:Observable<any>;
  grupoSub: Subscription;

  dataGroup: any;
  constructor(
    private _admin: AdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadMaterias();
    this.loadGroud();
  }

  ngOnDestroy() {
    if (this.alumnoSub) {
      this.alumnoSub.unsubscribe();
    }
    if (this.grupoSub) {
        this.grupoSub.unsubscribe();
    }
  }

  loadMaterias(){
    this.alumnoObs$ = this._admin.getMaestrosAndAlumnos('STUDENT');
    this.alumnoSub = this.alumnoObs$.subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }

  loadGroud(){
    this.grupoObs$ = this._admin.getGrupos();
    this.grupoSub = this.grupoObs$.subscribe(res=>{
      this.dataGroup = res;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goCreateAlumno() {
    this.dialog.open(AlumnosCreateComponent, {
      // maxWidth: '500px',
      // height: '100%',
      disableClose: false,

    });
  }
}
