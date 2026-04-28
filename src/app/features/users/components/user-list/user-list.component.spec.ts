import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;

  const mockUser: User = {
    id: 2,
    username: 'jdoe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatarUrl: 'https://example.com/x.png',
    role: 'Dev',
    location: 'CO',
    repoIds: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    fixture.componentRef.setInput('user', mockUser);
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render user name', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Jane Doe');
  });

  it('should apply selected class when selected', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();
    const root = fixture.nativeElement.querySelector('.item');
    expect(root?.classList.contains('is-selected')).toBe(true);
  });
});
