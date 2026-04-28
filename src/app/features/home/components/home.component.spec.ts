import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should include links to users and repositories modules', () => {
    const el = fixture.nativeElement as HTMLElement;
    const routerLinks = Array.from(el.querySelectorAll('a[routerLink]')).map((a) =>
      a.getAttribute('routerLink')
    );
    expect(routerLinks).toContain('/users');
    expect(routerLinks).toContain('/repositories');
  });

  it('should show main heading', () => {
    const el = fixture.nativeElement as HTMLElement;
    const h1 = el.querySelector('h1.hero__title');
    expect(h1?.textContent?.trim()).toContain('Conceptos web con Angular');
  });
});
