import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { RepositoryDetail } from './repository-detail';
import { Repository } from '../../models/repository.model';
import { User } from '../../../users/models/user.model';

describe('RepositoryDetail', () => {
  let component: RepositoryDetail;
  let fixture: ComponentFixture<RepositoryDetail>;
  let httpMock: HttpTestingController;

  const mockRepos: Repository[] = [
    {
      id: 7,
      name: 'repo-seven',
      description: 'Full desc',
      language: 'Go',
      stars: 3,
      createdAt: '2021-05-01',
      ownerId: 99,
    },
  ];

  const mockUsers: User[] = [
    {
      id: 99,
      username: 'owner99',
      name: 'Owner Ninety Nine',
      email: 'owner@example.com',
      avatarUrl: 'https://example.com/a.png',
      role: 'dev',
      location: 'CO',
      repoIds: [7],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '7' })) },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RepositoryDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne((r) => r.url.includes('repositories.json')).flush(mockRepos);
    httpMock.expectOne((r) => r.url.includes('users.json')).flush(mockUsers);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
