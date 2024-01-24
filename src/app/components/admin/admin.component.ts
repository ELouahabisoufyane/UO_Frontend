import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public auths:AuthService ,public route: Router) { }

  ngOnInit(): void {
  }
  handlelogout(){

    this.auths.logout();
  }

  goto() {
    let user= this.auths.authenticatedUser
    if(user.role=="admin"){
      this.route.navigateByUrl('admin/conference')
    }
    else{
      this.route.navigateByUrl('admin/gest')
    }

  }
}
