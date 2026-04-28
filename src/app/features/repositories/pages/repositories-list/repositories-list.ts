import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';
import { RepositoryList } from '../../componentes/repository-list/repository-list';
import { RepositoryService } from '../../services/repository-service';

@Component({
  selector: 'app-repositories-list',
  imports: [RepositoryList],
  templateUrl: './repositories-list.html',
  styleUrl: './repositories-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesList {
  private readonly repositoryService = inject(RepositoryService);

  readonly pageSize = 10;
  readonly page = signal(1);
  readonly query = signal('');

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly repositories = toSignal(
    this.repositoryService.getRepositories().pipe(
      tap(() => this.error.set(null)),
      catchError(() => {
        this.error.set('No se pudieron cargar los repositorios.');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ),
    { initialValue: [] }
  );

  readonly filteredRepositories = computed(() => {
    const q = this.query().trim().toLowerCase();
    const repos = this.repositories();
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  });

  readonly totalPages = computed(() => {
    const total = this.filteredRepositories().length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  });

  readonly pagedRepositories = computed(() => {
    const repos = this.filteredRepositories();
    const start = (this.page() - 1) * this.pageSize;
    return repos.slice(start, start + this.pageSize);
  });

  constructor() {
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

  prevPage() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  nextPage() {
    this.page.update((p) => Math.min(this.totalPages(), p + 1));
  }
}
