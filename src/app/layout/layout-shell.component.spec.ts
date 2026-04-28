import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LayoutShellComponent } from './layout-shell.component';

describe('LayoutShellComponent', () => {
  let fixture: ComponentFixture<LayoutShellComponent>;
  let component: LayoutShellComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutShellComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle and close mobile menu', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should expose title signal', () => {
    expect(component.title()).toBe('Evaluación Angular');
  });

  it('should render brand title and navigation links', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Evaluación Angular');
    const links = Array.from(el.querySelectorAll('a.nav__item')).map((a) =>
      a.getAttribute('routerLink')
    );
    expect(links).toContain('/');
    expect(links).toContain('/users');
    expect(links).toContain('/repositories');
  });
});
