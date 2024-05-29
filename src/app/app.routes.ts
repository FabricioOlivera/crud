import { Routes } from '@angular/router';
import { ListEmployesComponent } from './components/list-employes/list-employes.component';
import { CreateEmployesComponent } from './components/create-employes/create-employes.component';

export const routes: Routes = [
  {
    path: '',
    component: ListEmployesComponent,
  },
  {
    path: 'create-employe',
    component: CreateEmployesComponent,
  },
   {
    path: 'detail-employe/:detail',
    component: CreateEmployesComponent
   },
  {
    path: 'edit-employe/:id',
    component: CreateEmployesComponent,
  },
  {
    path: '**',
    component: ListEmployesComponent,
  }
];
