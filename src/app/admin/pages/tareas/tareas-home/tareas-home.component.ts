import { OnlineFrameComponent } from './../../../../modals/admin/online/online-frame/online-frame.component';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { globals } from './../../../../../environments/golbals';
import { AdminService } from './../../../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TareasCreateComponent } from '../tareas-create/tareas-create.component';

@Component({
  selector: 'app-tareas-home',
  templateUrl: './tareas-home.component.html',
  styleUrls: ['./tareas-home.component.scss']
})
export class TareasHomeComponent implements OnInit {
  userType = globals.type;
  idUser = globals.udi;
  //Aqui comienza la tabla
  displayedColumns: string[] = ['name', 'email', 'acciones'];
  dataSource: any;
  lengthTable: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //Termina la tabla

  tareasObs$: Observable<any>;
  tareasSub: Subscription;
  materiaObs$: Observable<any>;
  materiaSub: Subscription;
  id: any;
  idMateria: any;
  materiasData = [];
  test
  dataMateria: any;
  constructor(
    private router: Router,
    private _admin: AdminService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.idMateria = this.route.snapshot.paramMap.get("idMateria");
    console.log(this.id, this.idMateria);

    this.loadMaterias();
    this.loadData();

  }
  ngOnDestroy() {
    if (this.tareasSub) {
      this.tareasSub.unsubscribe();
    }
  }
  async loadMaterias() {
    this.tareasObs$ = this._admin.getTareasbyTeacher(this.idUser, this.id);
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

  async loadData() {
    this.materiaObs$ = await this._admin.getMateriaByIdGroup(this.id, this.idMateria);
    this.materiaSub = await this.materiaObs$.subscribe(res => {
      this.dataMateria = res;
      console.log(this.dataMateria);
    });
  }


  changeStatus(id,estado) {
    console.log(id);
    
    this._admin.updateStatusTarea(id, estado)
      .then(res => {
        console.log('Correco');
      }).catch(error => {
        console.warn('Error');
      })
  }
  opdenCreateTask() {
    this.dialog.open(TareasCreateComponent, {
      // maxWidth: '500px',
      disableClose: false,
      data: {
        dataContet: this.dataMateria
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
  goTasks(id) {
    this.router.navigate(['/tareas', id]);
  }
}
