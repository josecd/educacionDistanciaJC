import { AdminService } from './../../../../services/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { globals } from 'src/environments/golbals';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasCreateComponent } from '../../materias/materias-create/materias-create.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  userType = globals.type;
    //Aqui comienza la tabla
    displayedColumns: string[] = ['name', 'email', 'acciones'];
    dataSource:any;
    lengthTable:any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    //Termina la tabla
    
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