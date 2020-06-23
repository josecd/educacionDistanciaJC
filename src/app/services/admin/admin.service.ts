import { returnDocumentsWithId } from './../../helpers/returnDocuments.helper';
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

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }
  getNotifications() {
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
  getMateriaById(id) {
    return this.afs.collection('subjects').doc(id).valueChanges();
  }
  getMateriaByIdGroup(idGroup, idSubject) {
    return this.afs.collection('groups').doc(idGroup).collection('subjects').doc(idSubject).valueChanges();
  }
  getMateriasBygroup(idGroup) {
    this.adminRef = this.afs.collection('groups').doc(idGroup).collection('subjects');
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }
  getMateriasBygroupFfilter(idGroup, idTeacher) {
    return this.afs.collection('groups').doc(idGroup).collection('subjects', ref => ref.where('idProfesor', '==', idTeacher)).valueChanges();

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

  async setMateriaByGroup(idGroup, data): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const id = this.afs.createId();
      const f = await this.afs.collection('groups').doc(idGroup).collection('subjects').doc(id).set({
        created_at: new Date(),
        updated_at: new Date(),
        _id: id,
        idGroud: idGroup,
        idSubject: data.idSubject,
        idTeacher: data.idTeacher,
        idProfesor: data.idTeacher._id,
        idMateria: data.idSubject._id
      }).then(res => {
        resolve(res)
      })
        .catch(error => reject(error))
    })
  }

  ///Profesores

  getMaestrosAndAlumnos(type) {
    this.adminRef = this.afs.collection('users', ref => ref.where('type', '==', type))
    this.adminObs$ = this.adminRef.valueChanges();
    return this.adminObs$;
  }

  //Calificaciones
  getAlumnosByGroup(idGroup) {
    return this.afs.collection('groups').doc(idGroup).collection('students').valueChanges();
  }

  getCalificacionesByGroup(idGroup, unidad) {
    return this.afs.collection('groups').doc(idGroup).collection('calf', ref => ref.where('unidad', '==', unidad)).valueChanges()
  }

  getCalificacionesByAlumno(idGroup, unidad, idAlumno) {
    return this.afs.collection('groups').doc(idGroup).collection('calf', ref => ref.where('unidad', '==', unidad).where('idAlumno', '==', idAlumno)).valueChanges()

  }

  //Tareas
  getTareasbyTeacher(idTeacher, idMAteria) {
    return this.afs.collection('task', ref => ref.where('idGroup', '==', idMAteria).where('idProfesor', '==', idTeacher).orderBy('created_at', 'desc')).valueChanges();
  }
  getTareasbyTeacherEntregas(id) {
    return this.afs.collection('task').doc(id).collection('taskStudents').valueChanges()
  }

  async getTareasbyStudent(id, idStudent): Promise<any> {
    return new Promise(async (resolve, reject) => {
      

    const d=  await this.afs.collection('task').doc(id).collection('taskStudents', ref => ref.where('idUser', '==', idStudent)).ref.get().then(returnDocumentsWithId).then().then(f=>resolve(f[0]))
    });
  }

  getTareaById(id) {
    return this.afs.collection('task').doc(id).valueChanges();
  }
  getTareasByIdGroup(idGroup) {
    return this.afs.collection('task', ref => ref.where('idByGroup', '==', idGroup)).valueChanges();
  }
  // getTareasByIdGroupCalificaciones(idGroup,idUser) {
  //   return this.afs.collection('task').doc(idGroup).collection('taskStudents',ref=>ref.where('idUser','==',idUser).where('califica')).valueChanges();
  // }

  
  updateStatusTarea(id, estado): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.afs.collection('task').doc(id).update({
        updated_at: new Date(),
        status: estado
      }).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    });
  }
  addTask(data, form): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const id = this.afs.createId();
      const f = await this.afs.collection('task').doc(id).set({
        created_at: new Date(),
        updated_at: new Date(),
        _id: id,
        idGroup: data.idGroud,
        idMateria: data.idMateria,
        idProfesor: data.idProfesor,
        dataTeacher: data.idTeacher,
        dataMateria: data.idSubject,
        status: 'ACTIVO',
        type: form.type,
        description: form.description,
        name: form.name,
        url: form.url,
        idByGroup: form.idByGroup
      }).then(res => { resolve(res) })
        .catch(error => { reject(error) })
    })
  }

  addTaskStudents(idUser, idTask, form): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const id = this.afs.createId();
      const f = await this.afs.collection('task').doc(idTask).collection('taskStudents').doc(id).set({
        created_at: new Date(),
        updated_at: new Date(),
        _id: id,
        cal: 'Sin calificar',
        idTask: idTask,
        idUser: idUser,
        description: form.description,
        url: form.url,

        nameTask: form.nameTask,
        descriptionTask: form.descriptionTask,

        status: 'ACTIVO',
        type: form.type,

      }).then(res => {
        resolve(res)
      })
        .catch(error => { reject(error) })
    })
  }


  updateTaskStudents(idTask,idTaskStudent, form): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const f = await this.afs.collection('task').doc(idTask).collection('taskStudents').doc(idTaskStudent).update({
        updated_at: new Date(),
        cal: form.calificacion,
      }).then(res => {
        resolve(res)
      })
        .catch(error => { reject(error) })
    })
  }

  async getHorario(id): Promise<any> {
    return new Promise(async (resolve, reject) => {
    const d=  await this.afs.collection('groups').doc(id).collection('horario').ref.get().then(returnDocumentsWithId).then().then(f=>{resolve(f[0])
  
     })

      
  });
  }
  subirHorario( idGroup,form): Promise<any> {
    console.log(form);
    return new Promise(async (resolve, reject) => {
      const id =this.afs.createId()
      const f = await this.afs.collection('groups').doc(idGroup).collection('horario').doc(id).set({
        _id: id,
        created_at: new Date(),
        updated_at: new Date(),
        status: 'ACTIVO',

        url: form.horario,
      }).then(res => {
        resolve(res)
      })
        .catch(error => { reject(error) })
    })
  }

  updateHorario( id,idGroup ,form): Promise<any> {
    console.log(form);
    return new Promise(async (resolve, reject) => {
      const f = await this.afs.collection('groups').doc(idGroup).collection('horario').doc(id).update({
        updated_at: new Date(),
        url: form.horario,
      }).then(res => {
        resolve(res)
      })
        .catch(error => { reject(error) })
    })
  }
}
