import { Subscription, Observable } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './materias-create-group.component.html',
  styleUrls: ['./materias-create-group.component.scss']
})
export class MateriasCreateGroupComponent implements OnInit {
  errorMessage: string = '';
  error_messages = {
    idTeacher: [
      { type: 'required', message: 'El profesor es requerido' },
    ],
    idSubject: [
      { type: 'required', message: 'La materia es requerida' },
    ]
    
  };

  userForm: FormGroup;

  materiaObs$: Observable<any>;
  materiaSub: Subscription;
  dataMateria:any;

  profesoresObs$: Observable<any>;
  profesoresSub:Subscription;
  dataProfesor: any;

  idGroup
  constructor(
    public dialogRef: MatDialogRef<MateriasCreateGroupComponent>,
    public formBuilder: FormBuilder,
    private _admin: AdminService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
    console.log(data);
    
    this.idGroup = data

  }

  ngOnInit(): void {
    this.loadMateria();
    this.loadProfesor();
    this.loadForm();
    
  }

  loadForm() {
    this.userForm = this.formBuilder.group(
      {
        idSubject: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        idTeacher: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        )
      },
    );
  }
  sendData() {
    Swal.fire({
      title: 'Guardando materia.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        this._admin.setMateriaByGroup(this.idGroup,this.userForm.value).then(res => {
          Swal.hideLoading();
          Swal.close();
          this.close();
        });
      }
    });
  }

  loadMateria(){
    this.materiaObs$ = this._admin.getMaterias();
    this.materiaSub = this.materiaObs$.subscribe(res=>{
      this.dataMateria = res;
    })
  }
  
  loadProfesor(){
    this.profesoresObs$ = this._admin.getMaestrosAndAlumnos('TEACHER');
    this.profesoresSub = this.profesoresObs$.subscribe(res=>{
      this.dataProfesor = res;
    })
  }

  close() {
    this.dialogRef.close();
  }
}
