import { Subscription, Observable } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias-create',
  templateUrl: './materias-create.component.html',
  styleUrls: ['./materias-create.component.scss']
})
export class MateriasCreateComponent implements OnInit {

  errorMessage: string = '';
  error_messages = {
    numberUnits: [
      { type: 'required', message: 'El numero de unidades es necesario' },
    ],
    horario: [
      { type: 'required', message: 'El horario es necesario' },
    ]
    ,
    name: [
      { type: 'required', message: 'El nombre es necesario' },

    ]
  };

  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MateriasCreateComponent>,
    public formBuilder: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.loadForm();

  }

  loadForm() {
    this.userForm = this.formBuilder.group(
      {
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        horario: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        numberUnits: new FormControl(
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
      title: 'Creando usuario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        this._admin.setMateria(this.userForm.value).then(res => {
          Swal.hideLoading();
          Swal.close();
          this.close();
        });
      }
    });
  }


  close() {
    this.dialogRef.close();
  }
}
