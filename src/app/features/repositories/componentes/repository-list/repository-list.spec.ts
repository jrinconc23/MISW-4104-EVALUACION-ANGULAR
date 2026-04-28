import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RepositoryList } from './repository-list';
import { Repository } from '../../models/repository.model';

const mockRepository: Repository = {
  id: 1,
  name: 'demo-repo',
  description: 'Descripción de prueba',
  language: 'TypeScript',
  stars: 42,
  createdAt: '2020-06-15',
  ownerId: 1,
};

describe('RepositoryList', () => {
  let component: RepositoryList;
  let fixture: ComponentFixture<RepositoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryList);
    fixture.componentRef.setInput('repository', mockRepository);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render repository name, language and stars', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('demo-repo');
    expect(el.textContent).toContain('TypeScript');
    expect(el.textContent).toContain('42');
  });
});
