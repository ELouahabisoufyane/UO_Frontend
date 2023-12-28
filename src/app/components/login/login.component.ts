import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginGroup!: FormGroup;

  errormessage:any;
  hide=true;
  constructor(
    private fb: FormBuilder,
    private router: Router) {


  }


  ngOnInit(): void {
    this.LoginGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }


  handleLogin() {
    let username =this.LoginGroup.value.username;
    let password = this.LoginGroup.value.password;
    if(username=="admin" && password=="admin"){
      this.router.navigateByUrl("/admin/dashboard");

    }
    else{
      this.errormessage="user not find";
    }



  }
  password_show_hide(){
    if(this.hide!=true)
      this.hide=true;
    else
      this.hide=false;
  }

}
