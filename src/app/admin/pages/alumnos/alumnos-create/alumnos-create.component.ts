import { Subscription, Observable } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-create',
  templateUrl: './alumnos-create.component.html',
  styleUrls: ['./alumnos-create.component.scss']
})
export class AlumnosCreateComponent implements OnInit {
  errorMessage: string = '';
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    startPassword: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'Escriba una contraseña más larga' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)' }
    ]
    ,
    name: [
      { type: 'required', message: 'El nombre es necesario' },

    ]
  };

  userForm: FormGroup;
  grupoObs$:Observable<any>;
  grupoSub: Subscription;

  dataGroup: any;
  constructor(
    public dialogRef: MatDialogRef<AlumnosCreateComponent>,
    public formBuilder: FormBuilder,
    private _admin :AdminService
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadGroud();
  }

  loadForm() {
    this.userForm = this.formBuilder.group(
      {
        startPassword: new FormControl(
          '12345687',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        type: new FormControl(
          'STUDENT',
          Validators.compose([
            Validators.required,
          ])
        ),
        idGroup: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        )
        
      },
    );
  }
  async  subirArchivo() {

    Swal.fire({
      title: 'Creando usuario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      
          this._admin.addNewUser(this.userForm).then(res => {
            Swal.hideLoading();
            Swal.close();
            this.close();
          })
      }
    })
  }

  loadGroud(){
    this.grupoObs$ = this._admin.getGrupos();
    this.grupoSub = this.grupoObs$.subscribe(res=>{
      this.dataGroup = res;
      console.log(this.dataGroup);
      
    })
  }

  close() {
    this.dialogRef.close();
  }
}
