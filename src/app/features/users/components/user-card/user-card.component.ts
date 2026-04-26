import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  readonly user = input.required<User>();
}

