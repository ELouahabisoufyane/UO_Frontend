import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Modele/User";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string= "http://localhost:8089";
  authenticatedUser!:User;
  public us!:string;
  constructor(private http:HttpClient, private router :Router,private cookieService: CookieService) { }


  Login(user:User):Observable<User>{

    return this.http.post<User>(this.baseUrl+"/user/login",user);

  }
  addUser(user:User):Observable<any>{

    return this.http.post<User>(this.baseUrl+"/user/addOne",user);

  }

  authenticateUser(user:User){

    this.authenticatedUser=user;
    localStorage.setItem("user",user.username);

  }

  isAuthenticated(){
    return localStorage.getItem("user")!=null;
  }
  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");

  }


  getAllUsers():Observable<User[]> {

    return this.http.get<User[]>(this.baseUrl+"/user/getAll")

  }
  public getUser(id :string):Observable<User>{
    return this.http.get<User>(this.baseUrl+"/user/getOne/"+id);
  }
}
