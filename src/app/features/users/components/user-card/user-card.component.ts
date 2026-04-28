import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Repository } from '../../../repositories/models/repository.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  readonly user = input.required<User>();
  /** Si no se enlaza, no se muestra la sección (p. ej. tarjeta dentro del detalle de un repositorio). */
  readonly repositories = input<Repository[] | undefined>(undefined);
}
