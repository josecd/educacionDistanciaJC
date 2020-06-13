import { AdminService } from './../../../../services/admin/admin.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { TareasCreateComponent } from 'src/app/admin/pages/tareas/tareas-create/tareas-create.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-online-frame',
  templateUrl: './online-frame.component.html',
  styleUrls: ['./online-frame.component.scss']
})
export class OnlineFrameComponent implements OnInit {
  id
  url
  taskObs$:Observable<any>;
  taskSub:Subscription;
  estado
  constructor(
    public dialogRef: MatDialogRef<TareasCreateComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    public sanitizer: DomSanitizer,
    private _Admin: AdminService
  ) {

    this.id = data
    console.log(this.id);
    this.url = "https://10.0.0.19/" + this.id.url
    this.loadTask();
  }
  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }

  loadTask(){
    this.taskObs$ = this._Admin.getTareaById(this.id._id);
    this.taskSub = this.taskObs$.subscribe(data=>{
      this.estado = this.data;
    })
  }

  changeStatus(estado){
    this._Admin.updateStatusTarea(this.id._id,estado)
    .then(res=>{console.log('Correco');
    }).catch(error=>{console.warn('Error');
    })
  }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
