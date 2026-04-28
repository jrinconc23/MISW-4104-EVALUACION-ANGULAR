import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UsersListComponent } from './users-list.component';
import { User } from '../../models/user.model';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: 1,
      username: 'u1',
      name: 'User One',
      email: 'u1@example.com',
      avatarUrl: 'https://example.com/a.png',
      role: 'dev',
      location: 'CO',
      repoIds: [10],
    },
    {
      id: 2,
      username: 'u2',
      name: 'User Two',
      email: 'u2@example.com',
      avatarUrl: 'https://example.com/b.png',
      role: 'dev',
      location: 'AR',
      repoIds: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne((r) => r.url.includes('users.json')).flush(mockUsers);
    httpMock.expectOne((r) => r.url.includes('repositories.json')).flush([]);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list users and show first as selected in detail', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('User One');
    expect(el.textContent).toContain('u1@example.com');
  });

  it('should change selected user on row click', () => {
    const el = fixture.nativeElement as HTMLElement;
    const rows = el.querySelectorAll('button.md__row');
    expect(rows.length).toBe(2);
    (rows[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.textContent).toContain('User Two');
  });

  it('should filter users by search query', () => {
    component.query.set('Two');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('User Two');
    expect(el.textContent).not.toContain('User One');
  });
});
