import { Routes } from '@angular/router';

import { LayoutShellComponent } from './layout/layout-shell.component';
import { HomeComponent } from './features/home/components/home.component';
import { UsersListComponent } from './features/users/pages/users-list/users-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersListComponent }
    ]
  }
];
