import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RepositoriesList } from './repositories-list';
import { Repository } from '../../models/repository.model';

describe('RepositoriesList', () => {
  let component: RepositoriesList;
  let fixture: ComponentFixture<RepositoriesList>;
  let httpMock: HttpTestingController;

  const mockRepos: Repository[] = [
    {
      id: 1,
      name: 'a',
      description: 'd',
      language: 'TS',
      stars: 1,
      createdAt: '2020-01-01',
      ownerId: 1,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoriesList],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RepositoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const req = httpMock.expectOne((r) => r.url.includes('repositories.json'));
    req.flush(mockRepos);
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
