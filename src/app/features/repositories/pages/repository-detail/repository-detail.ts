import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of, startWith, switchMap } from 'rxjs';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user-service';
import { UserCardComponent } from '../../../users/components/user-card/user-card.component';
import { Repository } from '../../models/repository.model';
import { RepositoryService } from '../../services/repository-service';

type DetailViewModel =
  | { status: 'loading' }
  | { status: 'invalid-id' }
  | { status: 'error'; message: string }
  | { status: 'not-found' }
  | { status: 'ok'; repository: Repository; owner: User | null };

@Component({
  selector: 'app-repository-detail',
  imports: [DatePipe, RouterLink, UserCardComponent],
  templateUrl: './repository-detail.html',
  styleUrl: './repository-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly repositoryService = inject(RepositoryService);
  private readonly userService = inject(UserService);

  readonly vm = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const raw = params.get('id');
        const id = raw ? Number(raw) : NaN;
        if (!raw || Number.isNaN(id)) {
          return of<DetailViewModel>({ status: 'invalid-id' });
        }
        return forkJoin({
          repos: this.repositoryService.getRepositories(),
          users: this.userService.getUsers(),
        }).pipe(
          map(({ repos, users }) => {
            const repository = repos.find((r) => r.id === id);
            if (!repository) {
              return { status: 'not-found' } satisfies DetailViewModel;
            }
            const owner = users.find((u) => u.id === repository.ownerId) ?? null;
            return { status: 'ok', repository, owner } satisfies DetailViewModel;
          }),
          catchError(() =>
            of<DetailViewModel>({
              status: 'error',
              message: 'No se pudieron cargar los datos del repositorio.',
            })
          ),
          startWith<DetailViewModel>({ status: 'loading' })
        );
      })
    ),
    { initialValue: { status: 'loading' } satisfies DetailViewModel }
  );
}
