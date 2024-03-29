import { VerHorarioComponent } from './admin/pages/horario/horario/ver-horario/ver-horario.component';
import { TareasPorMateriaAlumnoComponent } from './admin/pages/tareas/tareas-por-materia-alumno/tareas-por-materia-alumno.component';
import { TareasEntregasComponent } from './admin/pages/tareas/tareas-entregas/tareas-entregas.component';
import { TareasHomeComponent } from './admin/pages/tareas/tareas-home/tareas-home.component';
import { GrupoModificarComponent } from './admin/pages/grupos/grupo-modificar/grupo-modificar.component';
import { AlumnosHomeComponent } from './admin/pages/alumnos/alumnos-home/alumnos-home.component';
import { GrupoHomeComponent } from './admin/pages/grupos/grupo-home/grupo-home.component';
import { MateriasHomeComponent } from './admin/pages/materias/materias-home/materias-home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfesorHomeComponent } from './admin/pages/home/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './admin/pages/home/alumno-home/alumno-home.component';
import { ErrorPageComponent } from './componets/error/error-page/error-page.component';
import { AdminHomeComponent } from './admin/pages/home/admin-home/admin-home.component';
import { UserHomeComponent } from './user/pages/home/user-home/user-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAlumnoComponent } from './componets/admin/login/login-alumno/login-alumno.component';
import { ProfesoresHomeComponent } from './admin/pages/profesores/profesores-home/profesores-home.component';


const routes: Routes = [
  { path: '',redirectTo: 'inicio-administrador',pathMatch: 'full'},
  // { path: 'iniciouser', component: UserHomeComponent,
  { path: 'inicio', component: UserHomeComponent},
  { path: 'inicio/:id', component: UserHomeComponent,canActivate: [AuthGuard]},

  { path: 'login', component: LoginAlumnoComponent},

  //Administrador
  { path: 'inicio-administrador', component: AdminHomeComponent,canActivate: [AuthGuard] },
  { path: 'materias', component: MateriasHomeComponent,canActivate: [AuthGuard] },
  { path: 'maestros', component: ProfesoresHomeComponent,canActivate: [AuthGuard] },
  { path: 'alumnos', component: AlumnosHomeComponent,canActivate: [AuthGuard] },
  { path: 'grupos', component: GrupoHomeComponent,canActivate: [AuthGuard] },
  { path: 'modificar-grupos/:id', component: GrupoModificarComponent,canActivate: [AuthGuard] },
  { path: 'alumno-grupo', component: GrupoHomeComponent,canActivate: [AuthGuard] },


  

  //Mastro
  { path: 'inicio-maestro', component: ProfesorHomeComponent,canActivate: [AuthGuard] },
  { path: 'calificaciones/:id/', component: MateriasHomeComponent,canActivate: [AuthGuard] },
  { path: 'tareas/:id/:idMateria', component: TareasHomeComponent,canActivate: [AuthGuard] },
  { path: 'tareas/:id', component: TareasEntregasComponent,canActivate: [AuthGuard] },

  
  //Estudiante
  { path: 'inicio-estudiante', component: AlumnoHomeComponent,canActivate: [AuthGuard]},
  { path: 'entregar-tareas/:id', component: TareasPorMateriaAlumnoComponent,canActivate: [AuthGuard] },
  // { path: 'calificaciones-tareas/:id', component: TareasPorMateriaAlumnoComponent,canActivate: [AuthGuard] },

  { path: 'horario', component: VerHorarioComponent,canActivate: [AuthGuard]},

  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
