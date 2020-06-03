import { AuthGuard } from './guards/auth.guard';
import { ProfesorHomeComponent } from './admin/pages/home/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './admin/pages/home/alumno-home/alumno-home.component';
import { ErrorPageComponent } from './componets/error/error-page/error-page.component';
import { AdminHomeComponent } from './admin/pages/home/admin-home/admin-home.component';
import { UserHomeComponent } from './user/pages/home/user-home/user-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAlumnoComponent } from './componets/admin/login/login-alumno/login-alumno.component';


const routes: Routes = [
  { path: '',redirectTo: 'inicio',pathMatch: 'full'},
  { path: 'inicio', component: UserHomeComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginAlumnoComponent},
  { path: 'inicio-administrador', component: AdminHomeComponent,canActivate: [AuthGuard] },
  { path: 'inicio-maestro', component: ProfesorHomeComponent,canActivate: [AuthGuard] },
  { path: 'inicio-estudiante', component: AlumnoHomeComponent,canActivate: [AuthGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
