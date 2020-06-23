import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from './../../../../../services/admin/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calificar-profesor',
  templateUrl: './calificar-profesor.component.html',
  styleUrls: ['./calificar-profesor.component.scss']
})
export class CalificarProfesorComponent implements OnInit {

  linkTask
  tareasForm: FormGroup;
  idTask
  idTaskStudent
  calf
  constructor(
    public dialogRef: MatDialogRef<CalificarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private _admin: AdminService,
    public formBuilder: FormBuilder,

  ) {

    console.log(data);
    this.linkTask = data.url
    this.idTask = data.idTask
    this.idTaskStudent = data._id
    this.calf = data.cal
  }


  ngOnInit(): void {
    this.loadForm();
  }


  loadForm() {

    this.tareasForm = this.formBuilder.group(
      {
        calificacion: new FormControl(
          this.calf,
          Validators.compose([
            Validators.required,
          ])
        )
      },
    );
  }
  updateCalf() {
    this._admin.updateTaskStudents(this.idTask, this.idTaskStudent, this.tareasForm.value).then(res => {
      this.dialogRef.close();

    }).catch(error => {
      console.warn("error ", error);

    })
  }
  close() {
    this.dialogRef.close();
  }
}
