import { UserServiceService } from './../user/user-service.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";
import { globals } from 'src/environments/golbals';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  confirmationResult: any;
  private COLLECTION_END = 'users';
  userEmpty = {
    _id: '',
    name: '',
    phoneNumber: '',
    created_at: null,
    isDeleted: false,
    role: "USER_ROLE",
    status: "INACTIVE",
    updated_at: null,
    address: ''
  };
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private _user: UserServiceService
  ) { }

  loginUser(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(res => {

            })

            resolve(res);
          },
          err => reject(err)
        );
    });
  }


  logOut() {
    globals.estado = false

    return this.auth.signOut().then(res => {
      globals.estado = false

    })
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  register(data, appVerifier): Promise<any> {

    return new Promise(async (resolve, reject) => {
      const u = await this.getFirstUserByPhoneNumber(data.phoneNumber);
      let res;
      if (u._id) {
        res = {
          ok: false,
          message: 'El usuario que intenta registrar ya existe',
        };
        return resolve(res);
      }

      this.doSignInPhone(data, appVerifier).then(
        response => {
          console.log(response);

          if (response) { return resolve({ ok: true }); }
        }
      ).catch(err => reject(err));

    });
  }

  private doSignInPhone(data, appVerifier): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithPhoneNumber('' + data.phoneNumber, appVerifier).then(
        result => {
          console.log('result', result);
          this.confirmationResult = result;
          return resolve(true);
        },
        err => {
          console.log('se obtiene');
          return reject(err);
        },
      ).catch(err => {
        console.log('Error');
        return reject(err);
      });
    });
  }

  getFirstUserByPhoneNumber(phoneNumber): Promise<any> {
    console.log('phoneNumber desde l', phoneNumber);
    return new Promise((resolve, reject) => {
      this.db.collection(`${this.COLLECTION_END}`, ref => ref.where('phoneNumber', '==', `${phoneNumber}`)).valueChanges().subscribe(
        (data) => {
          console.log('validando');
          if (data.length > 0) {
            console.log('el usuario con el phone', data[0]);
            resolve(data[0]);
          } else {
            resolve(this.userEmpty);
          }
        }
      );
    });
  }

  verifyLoginCode(verificationCode) {
    return new Promise((resolve, reject) => {
      this.confirmationResult.confirm(verificationCode).then(
        async result => {
          let name: any;
          let phoneNumber: any
          console.log(result.user);
          if (!name) { return resolve(result.user); }

          const user = result.user;

          const us = {
            _id: user.uid,
            name,
            phoneNumber: phoneNumber.toString(),
          };

          await this._user.addUserFirestore(us).then(
            () => resolve(result.user)
          ).catch(
            err => reject(err)
          );

          user.updateProfile({
            displayName: name,
          }).then(async () => {
            console.log('Actualización existosa');

          }, (error: any) => {
            reject(error);
          });
        })
        .catch(error => reject(error));
    });
  }

}
