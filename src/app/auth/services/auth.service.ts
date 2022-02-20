import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
  authURL = environment.baseUrl;
  isLogged = false;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  public login(auth: Auth): Observable<any> {
    console.log(auth);
    return this.http.post<any>(`${this.authURL}/auth/login/`, auth);
  }

  public register(register: Register): Observable<any> {
    console.log(register);
    return this.http.post<any>(`${this.baseUrl}/user`, register)
  }

  verificaAutenticacion(): Observable<boolean> {

    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      );

  }


  /*login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth ),
                tap( auth => localStorage.setItem('token', auth.id ) ),
              );
  }*/

  logout() {
    this._auth = undefined;
  }

}
