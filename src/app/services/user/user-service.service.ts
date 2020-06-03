import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AppComponent } from './../../app.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  usersCollection: AngularFirestoreCollection<any>;
  usersRef: AngularFirestoreCollection<any>;
  userDocRef: AngularFirestoreDocument;
  users$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {

  }


   login(id){
    this.userDocRef = this.afs.collection('users').doc(id);
    this.users$ = this.userDocRef.valueChanges();
    return this.users$;
  }

  getAdminByIds(id){
    return this.afs.collection('admins').doc(id).valueChanges();
  }
  getstudentByIds(id){
    return this.afs.collection('students').doc(id).valueChanges();
  }
  getTeacherByIds(id){
    return this.afs.collection('teachers').doc(id).valueChanges();
  }

  async addUserFirestore(user): Promise<any> {
    return new Promise(
        async (resolve, reject) => {
        console.log('Creando user desde repository', user);
        const id = user._id.toString();
        user.created_at = new Date();
        user.updated_at = new Date();
        user.isDeleted = false;
        user.role = "USER_ROLE";
        user.status = "ACTIVE";
        await this.usersCollection.doc(id).set(user).then(
            () => resolve(user),
            err => resolve(err)
        ).catch(
            e => reject(e)
        );
    });
}
  changeDeleted(id,deleted): Promise<any>{
    return new Promise((resolve, reject) => {
    this.afs.collection('users').doc(id).update({
      updated_at: new Date(),
      isDeleted: deleted
    }).then(res=>{

      resolve(res)
    }).catch(err=>{
  

      reject(err)
    })
  });
  }

  updateUserImgProfile(id, data) {
    this.afs.collection('admin').doc(id).update({
      updated_at: new Date(),
      profilePicture: data
    }).then(res => {

    }).catch(err => {
    })
  }

  updateReference(id, reference) {
    this.afs.collection('users').doc(id).collection('references').doc(reference._id).update({
      updated_at: new Date(),
      name: reference.name,
      phoneNumber: reference.phoneNumber
    }).then(res => {
    }).catch(err => {
    })
  }

  updateCard(id, card) {
    this.afs.collection('users').doc(id).collection('cardInformation').doc(card._id).update({
      updated_at: new Date(),
      accountNumber: card.accountNumber,
      routeNumber: card.routeNumber
    }).then(res => {
    }).catch(err => {
    })
  }

  updateDataUser(id, data) {
    this.afs.collection('users').doc(id).update({
      updated_at: new Date(),
      name: data.name,
      managerName: data.managerName,
      companyName: data.companyName,
      address: data.address,
      addressCompany: data.addressCompany,
      phoneNumber: data.phoneNumber,
      phoneNumberCompany: data.phoneNumberCompany,
    }).then(res => {
    }).catch(err => {
    })
  }

  updateDataUserPicture(id, url): Promise<any>  {
    return new Promise((resolve, reject) =>{
    this.afs.collection('users').doc(id).update({
      updated_at: new Date(),
      profilePicture: url,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
  }

  updateDataCardImg(id, _id,url): Promise<any>  {
    return new Promise((resolve, reject) =>{
    this.afs.collection('users').doc(id).collection('cardInformation').doc(_id).update({
      updated_at: new Date(),
      photoUrl: url,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
  }

  updateDataCompanyImg(id, url): Promise<any> {
    return new Promise((resolve, reject) =>{
      this.afs.collection('users').doc(id).update({
        updated_at: new Date(),
        logoCompany: url,
      }).then(res => {
        resolve (res)
      }).catch(err => {
        reject(err)
      })
    })
  }


  getAllUsersNoDelete() {
    this.usersRef = this.afs.collection('users', ref => ref.where('isDeleted', '==', false))
    this.users$ = this.usersRef.valueChanges();
    return this.users$;
  }
  getAllUsersDelete() {
    this.usersRef = this.afs.collection('users', ref => ref.where('isDeleted', '==', true))
    this.users$ = this.usersRef.valueChanges();
    return this.users$;
  }
  getUserById(id) {
    this.userDocRef = this.afs.collection('users').doc(id);
    this.users$ = this.userDocRef.valueChanges();
    return this.users$;
  }
  getReferenceByID(id) {
    this.usersRef = this.afs.collection('users').doc(id).collection('references')
    this.users$ = this.usersRef.valueChanges();
    return this.users$;
  }

  getCardById(id) {
    this.usersRef = this.afs.collection('users').doc(id).collection('cardInformation')
    this.users$ = this.usersRef.valueChanges();
    return this.users$;
  }

  
}
