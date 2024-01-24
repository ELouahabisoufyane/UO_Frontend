import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../Modele/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginGroup!: FormGroup;

  errormessage:any;
  public user: User = { id: Number(null), username: "",email:"", password: "", role:""};
  hide=true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService) {


  }


  ngOnInit(): void {
    this.LoginGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }


  handleLogin() {
    this.user.username =this.LoginGroup.value.username;
    this.user.password = this.LoginGroup.value.password;
    this.auth.Login(this.user).subscribe({
        next:(data) =>
        {
          if(data){

            this.auth.authenticateUser(data);


            this.router.navigateByUrl("/admin/dashboard");

          }
          else{
            this.errormessage="user not find";
          }

        }
      }
    )




  }
  password_show_hide(){
    if(this.hide!=true)
      this.hide=true;
    else
      this.hide=false;
  }

}
