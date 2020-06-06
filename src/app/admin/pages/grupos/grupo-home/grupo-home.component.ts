import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { AdminService } from './../../../../services/admin/admin.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-grupo-home',
  templateUrl: './grupo-home.component.html',
  styleUrls: ['./grupo-home.component.scss']
})
export class GrupoHomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'nivel', 'acciones'];
  dataSource:any;
  lengthTable:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  grupoObs$: Observable<any>;
  grupoSub: Subscription;

  constructor(
    private router: Router,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }
  ngOnDestroy() {
    if (this.grupoSub) {
      this.grupoSub.unsubscribe(); 
    }
  }
  loadMaterias(){
    this.grupoObs$ = this._admin.getGrupos();
    this.grupoSub = this.grupoObs$.subscribe(res=>{
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

  goVerGrupo(id){
    this.router.navigate(['/modificar-grupos',id]);

    // this.router.navigateByUrl('/modificar-grupos',id); 
  }
}
