import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutShellComponent {
  readonly title = signal('Evaluación Angular');
  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}

