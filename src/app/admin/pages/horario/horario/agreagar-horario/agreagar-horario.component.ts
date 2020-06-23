import { AdminService } from './../../../../../services/admin/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agreagar-horario',
  templateUrl: './agreagar-horario.component.html',
  styleUrls: ['./agreagar-horario.component.scss']
})
export class AgreagarHorarioComponent implements OnInit {
  tareasForm: FormGroup;
  imageSrc
  imageSrc2
  status
  idGroup
  dataHorario
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  constructor(
    public formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _admin : AdminService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgreagarHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {
    this.idGroup = data
    console.log(data);
    this.getHorario();
   }

  ngOnInit(): void {
    this.loadForm();
  }
  getHorario(){
    this._admin.getHorario(this.idGroup).then(res=>{
      this.dataHorario = res;
      this.imageSrc2 = res.url
      console.log(res);
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
  loadForm() {
      this.tareasForm = this.formBuilder.group(
        {
          horario: new FormControl(
           '',
            Validators.compose([
              Validators.required,
            ])
          )
          
        },
      );
  }

  subirArchivo(){
    console.log(this.tareasForm.value);
    Swal.fire({
      title: 'Creando horario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()

          let archivo = this.datosFormulario.get('archivo');
          this._storageService.uploadProfilePicture(archivo).then(res => {
            console.log('entre');
            
            this.tareasForm.patchValue({ horario: res })
            console.log(this.tareasForm.value);
            
            if (this.dataHorario) {
              this._admin.updateHorario( this.dataHorario._id,this.idGroup,this.tareasForm.value).then(res => {
                Swal.hideLoading()
                Swal.close()
                this.mensajeArchivo = 'No hay un archivo seleccionado';
                this.datosFormulario = new FormData();
                this.nombreArchivo = '';
                this.URLPublica = '';
                this.close()
              })
            }else{
              this._admin.subirHorario(this.idGroup,this.tareasForm.value).then(res => {
                Swal.hideLoading()
                Swal.close()
                this.mensajeArchivo = 'No hay un archivo seleccionado';
                this.datosFormulario = new FormData();
                this.nombreArchivo = '';
                this.URLPublica = '';
                this.close()
              })
            }
            
          })

        
      }
    })
  }
  close() {
    this.dialogRef.close();
  }
}
