import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {

  private readonly urlRepositories = 'https://gist.githubusercontent.com/caev03/628509e0b3fe41dd44f6a2ab09d81ef9/raw/f847eafbecca47287ff0faec4de1329b874f5711/repositories.json';
  private http = inject(HttpClient);

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.urlRepositories);
  }
}
