import { Routes } from '@angular/router';

import { LayoutShellComponent } from './layout/layout-shell.component';
import { HomeComponent } from './features/home/components/home.component';
import { UsersListComponent } from './features/users/pages/users-list/users-list.component';
import { RepositoriesList } from './features/repositories/pages/repositories-list/repositories-list';
import { RepositoryDetail } from './features/repositories/pages/repository-detail/repository-detail';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'repositories', component: RepositoriesList },
      { path: 'repositories/:id', component: RepositoryDetail },
    ]
  }
];
