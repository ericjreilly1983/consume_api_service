import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Member } from './member';

@Injectable({

	 providedIn: 'root',
})

export class UsersService {

  apiUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  serveUsers(): Observable<Member[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map((users: any) => {
          return users.map(user => { 
            return {
              name: user.name, 
              email: user.email, 
              address: user.address.street 
            }
          })
        })
      );
  }
}