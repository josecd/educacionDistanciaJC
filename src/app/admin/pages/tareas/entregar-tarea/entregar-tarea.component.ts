import { Observable, Subscription } from 'rxjs';
import { AdminService } from './../../../../services/admin/admin.service';
import { globals } from 'src/environments/golbals';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entregar-tarea',
  templateUrl: './entregar-tarea.component.html',
  styleUrls: ['./entregar-tarea.component.scss']
})
export class EntregarTareaComponent implements OnInit {
  tareasForm: FormGroup;
  idUser=globals.udi;
  nameUser = globals.name;
  dataTask
  imageSrc
  imageSrc2
  status
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  tareasObs$: Observable<any>;
  tateasSub:Subscription;
  info
  calf
  constructor(
    public dialogRef: MatDialogRef<EntregarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private _storageService: StorageService,
    public formBuilder: FormBuilder,
    private _admin : AdminService
  ) {
    console.log(data);
    this.status = data.tarea.status
    this.dataTask = data;
    this.loadInformation();
    this.loadForm();

   }
   loadInformation(){
    this._admin.getTareasbyStudent(this.dataTask.tarea._id, this.idUser).then(res=>{
      this.info = res
      this.imageSrc2 = res.url
      this.calf = res.cal
      console.log(this.info);
      
    })
   }
   loadForm() {

    if (!this.info) {
      this.tareasForm = this.formBuilder.group(
        {
          nameTask: new FormControl(
            this.dataTask.tarea.name,
            Validators.compose([
              Validators.required,
            ])
          )
          ,
          type: new FormControl(
            this.dataTask.tarea.type,
            Validators.compose([
              Validators.required,
            ])
          ),
          descriptionTask: new FormControl(
            this.dataTask.tarea.description,
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
            ' test ',
            Validators.compose([
              Validators.required,
            ])
          ),
          idTask: new FormControl(
            this.dataTask.idTarea,
            Validators.compose([
              Validators.required,
            ])
          ),
          idUser:new FormControl(
            this.idUser,
            Validators.compose([
              Validators.required,
            ])
          ),
        },
      );
    }else{
      console.log('ds');
      
      this.tareasForm = this.formBuilder.group(
        {
          nameTask: new FormControl(
            this.dataTask.tarea.name,
            Validators.compose([
              Validators.required,
            ])
          )
          ,
          type: new FormControl(
            this.dataTask.tarea.type,
            Validators.compose([
              Validators.required,
            ])
          ),
          descriptionTask: new FormControl(
            this.dataTask.tarea.description,
            Validators.compose([
              Validators.required,
            ])
          ),
          description: new FormControl(
            this.info.description,
            Validators.compose([
              Validators.required,
            ])
          ),
          url: new FormControl(
            ' test ',
            Validators.compose([
              Validators.required,
            ])
          ),
          idTask: new FormControl(
            this.dataTask.idTarea,
            Validators.compose([
              Validators.required,
            ])
          ),
          idUser:new FormControl(
            this.idUser,
            Validators.compose([
              Validators.required,
            ])
          ),
        },
      );
    }
    
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
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  subirArchivo(){
    console.log(this.tareasForm.value);
    Swal.fire({
      title: 'Creando tarea.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()

          let archivo = this.datosFormulario.get('archivo');
          this._storageService.uploadProfilePicture(archivo).then(res => {
            console.log('entre');
            
            this.tareasForm.patchValue({ url: res })
            this._admin.addTaskStudents(this.nameUser,this.dataTask.tarea._id,this.tareasForm.value).then(res => {
              Swal.hideLoading()
              Swal.close()
              this.mensajeArchivo = 'No hay un archivo seleccionado';
              this.datosFormulario = new FormData();
              this.nombreArchivo = '';
              this.URLPublica = '';
              this.close()
            })
          })

        
      }
    })
  }
}
