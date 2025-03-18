import { Routes } from '@angular/router';
import { ProfessorAdicionarComponent } from './professor/professor-adicionar/professor-adicionar.component';
import { ProfessorListarComponent } from './professor/professor-listar/professor-listar.component';
import { ProfessorEditarComponent } from './professor/professor-editar/professor-editar.component';

export const routes: Routes = [
    { path: 'professor/adicionar', component: ProfessorAdicionarComponent },
    { path: 'professor/listar', component: ProfessorListarComponent },
    { path: 'professor/editar/:id', component: ProfessorEditarComponent }
];
