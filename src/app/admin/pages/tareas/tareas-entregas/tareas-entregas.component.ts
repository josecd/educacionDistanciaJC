import { CalificarProfesorComponent } from './../calificar-profesor/calificar-profesor/calificar-profesor.component';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { globals } from './../../../../../environments/golbals';
import { AdminService } from './../../../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tareas-entregas',
  templateUrl: './tareas-entregas.component.html',
  styleUrls: ['./tareas-entregas.component.scss']
})
export class TareasEntregasComponent implements OnInit {
  userType = globals.type; 
  idUser = globals.udi;
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'email','calf', 'acciones'];
  dataSource: any;
  lengthTable: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //Termina la tabla

  tareasObs$: Observable<any>;
  tareasSub: Subscription;
  id:any;
  idMateria:any;
  materiasData = [];
  test
  constructor(
    private router: Router,
    private _admin: AdminService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    console.log(this.idUser);

    this.id = this.route.snapshot.paramMap.get("id");    
    this.loadMaterias();
    
  }
  ngOnDestroy() {
    if (this.tareasSub) {
      this.tareasSub.unsubscribe();
    } 
  }
  async loadMaterias() {
    this.tareasObs$ = this._admin.getTareasbyTeacherEntregas(this.id);
    this.tareasSub = this.tareasObs$.subscribe(res => {
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

  opdenCalf(user){
      this.dialog.open(CalificarProfesorComponent, {
        // maxWidth: '500px',
        disableClose: false,
        data:user
      });
    
  }
}
