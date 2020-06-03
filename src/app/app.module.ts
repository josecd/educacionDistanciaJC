import { ErrorPageComponent } from './componets/error/error-page/error-page.component';
import { AuthGuard } from './guards/auth.guard';
import { MaterialModule } from './material-module';
import { environment } from './../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbWindowModule, NbSidebarModule, NbToastrModule, NbMenuModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UserHomeComponent } from './user/pages/home/user-home/user-home.component';
import { AdminHomeComponent } from './admin/pages/home/admin-home/admin-home.component';
import { ProfesoresHomeComponent } from './admin/pages/profesores/profesores-home/profesores-home.component';
import { ProfesoresCreateComponent } from './admin/pages/profesores/profesores-create/profesores-create.component';
import { ProfesoresEditComponent } from './admin/pages/profesores/profesores-edit/profesores-edit.component';
import { AlumnosHomeComponent } from './admin/pages/alumnos/alumnos-home/alumnos-home.component';
import { AlumnosCreateComponent } from './admin/pages/alumnos/alumnos-create/alumnos-create.component';
import { AlumnosEditComponent } from './admin/pages/alumnos/alumnos-edit/alumnos-edit.component';
import { TareasHomeComponent } from './admin/pages/tareas/tareas-home/tareas-home.component';
import { TareasCreateComponent } from './admin/pages/tareas/tareas-create/tareas-create.component';
import { TareasEditComponent } from './admin/pages/tareas/tareas-edit/tareas-edit.component';
import { MateriasHomeComponent } from './admin/pages/materias/materias-home/materias-home.component';
import { MateriasCreateComponent } from './admin/pages/materias/materias-create/materias-create.component';
import { MateriasEditComponent } from './admin/pages/materias/materias-edit/materias-edit.component';
import { LoginAlumnoComponent } from './componets/admin/login/login-alumno/login-alumno.component';
import { HeaderAdminComponent } from './componets/admin/header/header-admin/header-admin.component';
import { SidebarAdminComponent } from './componets/admin/sidebar/sidebar-admin/sidebar-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfesorHomeComponent } from './admin/pages/home/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './admin/pages/home/alumno-home/alumno-home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    AdminHomeComponent,
    ProfesoresHomeComponent,
    ProfesoresCreateComponent,
    ProfesoresEditComponent,
    AlumnosHomeComponent,
    AlumnosCreateComponent,
    AlumnosEditComponent,
    TareasHomeComponent,
    TareasCreateComponent,
    TareasEditComponent,
    MateriasHomeComponent,
    MateriasCreateComponent,
    MateriasEditComponent,
    LoginAlumnoComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    ErrorPageComponent,
    ProfesorHomeComponent,
    AlumnoHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NbWindowModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),

    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbIconModule
  ],
  providers: [NbWindowModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
