import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-repository-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './repository-list.html',
  styleUrl: './repository-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryList {
  readonly repository = input.required<Repository>();
}
