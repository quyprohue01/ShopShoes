import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
<<<<<<< HEAD
  NameLogin = new BehaviorSubject("");
  NameLoginAdmin = new BehaviorSubject("")
  constructor(private http: HttpClient) { }
=======
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  NameLogin = new BehaviorSubject("")
  constructor(private http : HttpClient) { }
>>>>>>> df5603a550ba95f0500d3de674e3915428b5ee34
  // các phương thức
  mockapi = 'https://644732497bb84f5a3e39d8b7.mockapi.io/users'
  getList(): Observable<User[]> {
    return this.http.get<User[]>('https://644732497bb84f5a3e39d8b7.mockapi.io/users')
  }
  add(data: any): Observable<User[]> {
    return this.http.post<User[]>('https://644732497bb84f5a3e39d8b7.mockapi.io/users', data)
  }
  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`https://644732497bb84f5a3e39d8b7.mockapi.io/users?username=${username}&password=${password}`)
  }
  setNameLogin(name: string) {
    this.NameLogin.next(name)
  }

  getNameLogin() {
    return this.NameLogin.asObservable()
  }
  // update(id:any,data: any):Observable<any>{
  //   return this.http.patch<any>(`${this.url}/${id}`,data)
  // }
}
