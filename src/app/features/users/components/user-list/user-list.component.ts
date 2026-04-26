import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  readonly user = input.required<User>();
  readonly selected = input<boolean>(false);
}

