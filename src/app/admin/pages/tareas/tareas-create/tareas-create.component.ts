import { AdminService } from './../../../../services/admin/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tareas-create',
  templateUrl: './tareas-create.component.html',
  styleUrls: ['./tareas-create.component.scss']
})
export class TareasCreateComponent implements OnInit {
  tareasForm: FormGroup;
  videoForme: FormGroup;
  dataContext
  imageSrc
  idByGroup
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),

  });
  constructor(
    public dialogRef: MatDialogRef<TareasCreateComponent>,
    public formBuilder: FormBuilder,
    private _admin: AdminService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private _storageService: StorageService

  ) {
    this.dataContext = data.dataContet;
    this.idByGroup = data
    console.log(this.idByGroup);
    
  }

  ngOnInit(): void {
    this.loadForm();
  }
  loadForm() {

    this.tareasForm = this.formBuilder.group(
      {
        type: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        description: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        url: new FormControl(
          '  ',
          Validators.compose([
            Validators.required,
          ])
        ),
        
        idByGroup: new FormControl(
          this.dataContext._id,
          Validators.compose([
            Validators.required,
          ])
        )
      },
    );
  }

  async subirArchivo() {
    Swal.fire({
      title: 'Creando tarea.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        if (this.tareasForm.value.type === 'VIDEO') {
          let archivo = this.datosFormulario.get('archivo');
          this._storageService.uploadProfilePicture(archivo).then(res => {
            this.tareasForm.patchValue({ url: res })
          
            this._admin.addTask(this.dataContext, this.tareasForm.value).then(res => {
              Swal.hideLoading()
              Swal.close()
              this.mensajeArchivo = 'No hay un archivo seleccionado';
              this.datosFormulario = new FormData();
              this.nombreArchivo = '';
              this.URLPublica = '';
              this.close()
            })
          })
        } else if (this.tareasForm.value.type === 'ONLINE') {

          const idSesion = new Date().getMilliseconds();
          this.tareasForm.patchValue({ url: idSesion })
          this._admin.addTask(this.dataContext, this.tareasForm.value)
            .then(res => {
              Swal.hideLoading()
              Swal.close()
              this.mensajeArchivo = 'No hay un archivo seleccionado';
              this.datosFormulario = new FormData();
              this.nombreArchivo = '';
              this.URLPublica = '';
              this.close()
            }).catch(error => {
              console.warn('Error', error);

            })
        } else {
          this._admin.addTask(this.dataContext, this.tareasForm.value)
            .then(res => {
              Swal.hideLoading()
              Swal.close()
              this.mensajeArchivo = 'No hay un archivo seleccionado';
              this.datosFormulario = new FormData();
              this.nombreArchivo = '';
              this.URLPublica = '';
              this.close()
            }).catch(error => {
              console.warn('Error', error);
            })
        }


      }
    })
  }

  public cambioArchivo(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  close() {
    this.dialogRef.close();
  }
}
