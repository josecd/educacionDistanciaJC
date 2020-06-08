import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions'
import { ToasterserviceService } from '../toaster/toasterservice.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminRef: AngularFirestoreCollection<any>;
  adminDocRef: AngularFirestoreDocument;
  adminObs$: Observable<any>;
  constructor(
    private afs: AngularFirestore,
    public toaster: ToasterserviceService,
  ) { }

  //Usuarios

  getUsers(){
    return this.afs.collection('users').valueChanges();
  }
  getNotifications(){
    return this.afs.collection('notifications').valueChanges();
  }

  addNewUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      var message = firebase.functions().httpsCallable('addAdmin')
      message({ text: user.value }).then(result => {
        var sanitizedMessage = result;
        if (sanitizedMessage.data.success) {
          this.toaster.showToast('top-right', "success", "Usuario agregado");
        } else if (sanitizedMessage.data.error) {
          if (sanitizedMessage.data.error = 'The email address is already in use by another account.') {
            console.log(sanitizedMessage.data.error);

            this.toaster.showToast('top-right', "warning", "La dirección de correo electrónico ya está en uso por otra cuenta.");

          } else if (sanitizedMessage.data.error = 'The email address is already in use by another account.') {
          }
        }
        resolve(result)
      }, err => {
        reject(err)
      }).catch(err => {
      });
    })

  }


  //Grupos
  getGrupos() {
    this.adminRef = this.afs.collection('groups')
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }

  getGrupoById(id) {
    return this.afs.collection('groups').doc(id).valueChanges()

  }


  ///Materias
  getMaterias() {
    this.adminRef = this.afs.collection('subjects')
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }
  getMateriasCalificacionesByunidad(idMateria, idUnidad) {
    this.adminRef = this.afs.collection('subjects').doc(idMateria).collection(idUnidad);
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }
  getMateriasCalificacionesByAlumno(idMateria, idUnidad, idAlumno) {
    this.adminRef = this.afs.collection('subjects').doc(idMateria).collection(idUnidad, ref => ref.where('idStudent', '==', idAlumno))
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }
  setMateria(data): Promise<any> {
    console.log(data);

    return new Promise((resolve, reject) => {
      const id = this.afs.createId();
      this.afs.collection('subjects').doc(id).set({
        created_at: new Date(),
        updated_at: new Date(),
        name: data.name,
        horario: data.horario,
        numberUnits: data.numberUnits,
        _id: id
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }


  ///Profesores

  getMaestrosAndAlumnos(type) {
    this.adminRef = this.afs.collection('users', ref => ref.where('type', '==', type))
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }

  //Calificaciones
  getAlumnosByGroup(idGroup){
    return this.afs.collection('groups').doc(idGroup).collection('students').valueChanges();
  }
  
  getCalificacionesByGroup(idGroup, unidad) {
    return this.afs.collection('groups').doc(idGroup).collection('calif',ref => ref.where('unidad','==',unidad)).valueChanges()
  }

  getCalificacionesByAlumno(idGroup, unidad,idAlumno) {
    return this.afs.collection('groups').doc(idGroup).collection('calif',ref => ref.where('unidad','==',unidad).where('idAlumno','==',idAlumno)).valueChanges()

  }

}
