import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UO_Front';
  a!:any;
  constructor(public auths:AuthService ,public route: Router) { }

  ngOnInit(): void {

    this.a= localStorage.getItem("user");
    if(this.a){
      this.auths.getUser(this.a).subscribe(
        {
          next :(data)=>{
            this.auths.authenticatedUser=data;
          }}
      )
    }}

}
