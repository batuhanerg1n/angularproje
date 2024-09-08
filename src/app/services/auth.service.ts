import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { response } from 'express';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_key = "AIzaSyC096hUcYtd5spXwoVRIHRFSenH_2UEQYk";
  //  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  user = new BehaviorSubject<User|null>(null);
  url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  url1 = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  constructor(private http: HttpClient) { }
  register(email: string, password: string) {
    return this.http.post<AuthResponse>(this.url + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        //observable, subject =>rxjs
        this.handleUser(response.email, response.localId, response.localId, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }
  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.url1 + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        //observable, subject =>rxjs
        this.handleUser(response.email, response.localId, response.localId, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }
  autoLogin(){
    if(localStorage.getItem("user")==null){
      return;
    }
    const user =JSON.parse(localStorage.getItem("user")|| "{}");
    const loadedUser= new User(user.email,user.id,user._token, new Date( user._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  private handleError(err: HttpErrorResponse) {
    let message = "hata oluştu";

    if (err.error.error) {
      switch (err.error.error.message) {
        case "EMAIL_EXISTS":
          message = "bu mail adresi zaten kullanılıyor."
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "bir süre bekleyip tekrar deneyiniz."
          break;
        case "EMAIL_NOT_FOUND":
          message = "email adresi bulunamadı";
          break;
        case "INVALID_PASSWORD":
          message = "hatalı parola";
          break;
      }
    }

    return throwError(() => message);
  }

  private handleUser(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + (Number(expiresIn) * 1000));
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate  // Burada hesapladığınız 'expirationDate' kullanılmalı.
    );
    console.log('Token:', user.token);
    this.user.next(user);
    localStorage.setItem("user",JSON.stringify(user));
    
  }
}