import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grupo-modificar',
  templateUrl: './grupo-modificar.component.html',
  styleUrls: ['./grupo-modificar.component.scss']
})
export class GrupoModificarComponent implements OnInit {
  //Tabla
  displayedColumns: string[] = ['name', 'nivel', 'acciones'];
  dataSource: any;
  lengthTable: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //Usuarios
  usuariosObs$: Observable<any>;
  usuairoSub: Subscription;

  //Calificaciones
  califObs$: Observable<any>;
  califSub: Subscription;

  //Calificaciones
  grupoObs$: Observable<any>;
  grupoSub: Subscription;

  //Globales
  id: any;

  constructor(
    private route: ActivatedRoute,
    private _admin: AdminService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadtUsuarios();
  }

  loadtUsuarios() {
    let test
    this.usuariosObs$ = this._admin.getAlumnosByGroup(this.id);
    this.usuairoSub = this.usuariosObs$.subscribe(res => {

      res.forEach(async element => {
        this.grupoObs$ = this._admin.getGrupoById(element.idGroup)
        this.grupoSub = this.grupoObs$.subscribe(ress => {
          console.log(ress);
          element.nameGroup = ress.name
        })
        this.dataSource = new MatTableDataSource(res);
        this.lengthTable = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

      console.log(res);


    })
  }

  loadCalifiaciones() {

  }

  goToAlumno() {

  }
  //Metodo para el filtro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goVerGrupo(id) {
    this.router.navigate(['/modificar-grupos', id]);

    // this.router.navigateByUrl('/modificar-grupos',id); 
  }

}
