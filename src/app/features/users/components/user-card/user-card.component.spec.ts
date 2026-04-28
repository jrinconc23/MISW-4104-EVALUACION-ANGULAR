import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: 1,
      username: 'jdoe',
      name: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'https://example.com/avatar.png',
      role: 'Developer',
      location: 'Remote',
      repoIds: [],
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user identity and mailto link', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('John Doe');
    expect(el.textContent).toContain('@jdoe');
    const mail = el.querySelector('a.email') as HTMLAnchorElement | null;
    expect(mail?.getAttribute('href')).toBe('mailto:john@example.com');
  });

  it('should show associated repositories when provided', () => {
    fixture.componentRef.setInput('repositories', [
      {
        id: 99,
        name: 'my-repo',
        description: 'Desc',
        language: 'TS',
        stars: 5,
        createdAt: '2020-06-01',
        ownerId: 1,
      },
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Repositorios asociados');
    expect(el.textContent).toContain('my-repo');
    expect(el.querySelector('a.repo-card')).toBeTruthy();
  });
});

