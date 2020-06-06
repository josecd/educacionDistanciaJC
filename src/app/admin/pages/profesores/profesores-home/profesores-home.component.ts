import { ProfesoresCreateComponent } from './../profesores-create/profesores-create.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './../../../../services/admin/admin.service';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profesores-home',
  templateUrl: './profesores-home.component.html',
  styleUrls: ['./profesores-home.component.scss']
})
export class ProfesoresHomeComponent implements OnInit {
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'email', 'acciones'];
  dataSource
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //Termina la tabla
  profesorObs$:Observable<any>;
  profesorSub: Subscription;
  lengthTable:any;
  constructor(
    private _admin: AdminService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }
  ngOnDestroy() {
    if (this.profesorSub) {
      this.profesorSub.unsubscribe();
    }
  }
  loadMaterias(){
    this.profesorObs$ = this._admin.getMaestrosAndAlumnos('TEACHER');
    this.profesorSub = this.profesorObs$.subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.lengthTable = res.length;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    this.dialog.open(ProfesoresCreateComponent, {
      // maxWidth: '500px',
      // height: '100%',
      disableClose: false,

    });
  }
}
