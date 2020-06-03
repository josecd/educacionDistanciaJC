import { Observable, Subscription } from 'rxjs';
import { Itecacher } from './../../../../interfaces/teacher.interface';
import { UserServiceService } from './../../../../services/user/user-service.service';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import * as firebase from "firebase";
import { Iadmin } from 'src/app/interfaces/admin.interface';
import { Istudent } from 'src/app/interfaces/student.interface';
import { globals } from 'src/environments/golbals';


@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.component.html',
  styleUrls: ['./login-alumno.component.scss']
})
export class LoginAlumnoComponent implements OnInit {

  adminModel: Iadmin = {}
  studentModel: Istudent = {}
  teacherModel: Itecacher = {}
  loginForm: FormGroup;
  errorMessage: string = '';
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'Escriba una contraseña más larga' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)' }
    ],
  };

  adminObs$: Observable<any>;
  adminSub: Subscription;
  studentObs$: Observable<any>;
  astudentSub: Subscription;
  teacherObs$: Observable<any>;
  teacher: Subscription;

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _user: UserServiceService
  ) {

  }

  ngOnInit(): void {
    this.LoginForm();
  }
  loadUser() {


  }

  LoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
      },
    );
  }

  async login(value) {
    this.auth.loginUser(value).then(
      data => {
        const uid = data.user.uid;
        this.adminObs$ = this._user.login(uid)
        this.adminSub = this.adminObs$.subscribe(res => {
          globals.type = res.type;
          globals.name = res.name;
          globals.estado = true;
          if (res?.type === 'ADMIN') {
            this.router.navigateByUrl('/inicio-administrador');
          } else if (res?.type === 'STUDENT') {
            this.router.navigateByUrl('/inicio-estudiante');
          } else if (res?.type === 'TEACHER') {
            this.router.navigateByUrl('/inicio-maestro');  
          }else{
            console.log('Regresa');
          }
        })
        // this.router.navigateByUrl('/administrador');
      }, err => {
        Swal.fire('Ojo', 'Usuario y/o contraseña incorrectos', 'warning');
        console.log(err);
      }).catch(
        err => {
          Swal.fire('Ops!', 'Al parecer ocurrió un error, intenta más tarde', 'error');
        }
      );
  }



}
