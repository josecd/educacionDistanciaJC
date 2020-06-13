import { MateriasCreateGroupComponent } from './../../materias/materias-create-group/materias-create-group.component';
import { MatDialog } from '@angular/material/dialog';
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

  //False es igual alumnos, true iguala a materias.
  statusTable: boolean=false;
  constructor(
    private route: ActivatedRoute,
    private _admin: AdminService,
    private router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    
    this.loadtUsuarios();
  }
  ngOnDestroy() {
    if (this.usuairoSub) {
      this.usuairoSub.unsubscribe()
    }

  }

  loadtUsuarios() {
    this.statusTable= false;
    this.usuariosObs$ = this._admin.getAlumnosByGroup(this.id);
    this.usuairoSub = this.usuariosObs$.subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.lengthTable = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  
    })
  }

  loadMaterias() {
    this.statusTable= true;
    this.usuariosObs$ = this._admin.getMateriasBygroup(this.id);
    this.usuairoSub = this.usuariosObs$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
        this.lengthTable = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }

  goToAlumno() {

  }

  
  goToMateria() {

  }

  addMateriaGrupo(){
    this.dialog.open(MateriasCreateGroupComponent, {
      // maxWidth: '500px',
      // height: '100%',
      disableClose: false,
      data: this.id,
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

  goVerGrupo(id) {
    this.router.navigate(['/modificar-grupos', id]);
    console.log('ddd');
    
    // this.router.navigateByUrl('/modificar-grupos',id); 
  }

}
