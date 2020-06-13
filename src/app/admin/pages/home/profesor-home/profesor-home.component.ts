import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { async } from '@angular/core/testing';
import { AdminService } from './../../../../services/admin/admin.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { globals } from 'src/environments/golbals';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as type from '../../../../../environments/golbals';
import { MatTableDataSource } from '@angular/material/table';
import { TareasCreateComponent } from '../../tareas/tareas-create/tareas-create.component';
@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.scss']
})
export class ProfesorHomeComponent implements OnInit {
  userType = globals.type;
  idUser = globals.udi;
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

  materiaObs$: Observable<any>;
  materiaSub: Subscription;

  materiasData = [];
  test
  constructor(
    private router: Router,
    private _admin: AdminService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }
  ngOnDestroy() {
    if (this.grupoSub) {
      this.grupoSub.unsubscribe();
    } 
  }
  async loadMaterias() {
    console.log('inicio');

    this.grupoObs$ = this._admin.getGrupos();
    this.grupoSub = this.grupoObs$.subscribe(res => {
      this.materiasData = []
      this.dataSource = []
      console.log(res);
      res.forEach(async element => {
        this.materiaObs$ = this._admin.getMateriasBygroupFfilter(element._id, this.idUser);
        this.materiaSub = this.materiaObs$.subscribe(ress => {
        // this.materiasData = []

          ress.forEach(async elements => {
            console.log(elements);
            if (elements._id) {
              if (element._id === elements.idGroud) {
                const data={
                  elementos: elements,
                  nameGroup: element.name
                }
                this.materiasData.push(data)
              }
            }
          });
          this.dataSource = new MatTableDataSource(this.materiasData);
          console.log(this.materiasData);

        });
      });

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

  goVerGrupo(id,idmateria) {
    this.router.navigate(['/modificar-grupos', id,idmateria]);

    // this.router.navigateByUrl('/modificar-grupos',id); 
  }

  goTasks(id,idmateria){
    this.router.navigate(['/tareas', id,idmateria ]);
  }

  goCalf(){


  }

}
