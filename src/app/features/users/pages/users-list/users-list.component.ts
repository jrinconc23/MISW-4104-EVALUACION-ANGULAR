import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, UserListComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  private readonly userService = inject(UserService);

  readonly pageSize = 5;
  readonly page = signal(1);
  readonly query = signal('');

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly selectedUser = signal<User | null>(null);

  readonly users = toSignal(
    this.userService.getUsers().pipe(
      tap(() => this.error.set(null)),
      catchError(() => {
        this.error.set('No se pudieron cargar los usuarios.');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ),
    { initialValue: [] }
  );

  readonly filteredUsers = computed(() => {
    const q = this.query().trim().toLowerCase();
    const users = this.users();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  });

  readonly totalPages = computed(() => {
    const total = this.filteredUsers().length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  });

  readonly pagedUsers = computed(() => {
    const users = this.filteredUsers();
    const start = (this.page() - 1) * this.pageSize;
    return users.slice(start, start + this.pageSize);
  });

  constructor() {
    effect(() => {
      const users = this.filteredUsers();
      if (!users.length) return;
      const selected = this.selectedUser();
      if (selected && users.some((u) => u.id === selected.id)) return;
      this.selectedUser.set(users[0]);
    });

    effect(() => {
      const total = this.totalPages();
      const p = this.page();
      if (p > total) this.page.set(total);
      if (p < 1) this.page.set(1);
    });

    effect(() => {
      this.query();
      this.page.set(1);
    });
  }

  selectUser(user: User) {
    this.selectedUser.set(user);
  }

  prevPage() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  nextPage() {
    this.page.update((p) => Math.min(this.totalPages(), p + 1));
  }
}

