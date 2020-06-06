import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MateriasCreateComponent } from '../materias-create/materias-create.component';

@Component({
  selector: 'app-materias-home',
  templateUrl: './materias-home.component.html',
  styleUrls: ['./materias-home.component.scss']
})
export class MateriasHomeComponent implements OnInit {
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'horario', 'unidades', 'acciones'];
  dataSource
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //Termina la tabla

  materiaObs$ : Observable<any>;
  materiaSub: Subscription;
  lengthTable:any;
  constructor(
    public dialog: MatDialog,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }
  ngOnDestroy() {
    if (this.materiaSub) {
      this.materiaSub.unsubscribe();
    }
  }
  loadMaterias(){
    this.materiaObs$ = this._admin.getMaterias();
    this.materiaSub = this.materiaObs$.subscribe(res=>{
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

  goCreateMateria() {
    this.dialog.open(MateriasCreateComponent, {
      // maxWidth: '500px',
      // height: '100%',
      disableClose: false,

    });
  }
}
 