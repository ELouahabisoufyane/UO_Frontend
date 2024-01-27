import {Component, OnInit} from '@angular/core';
import {User} from "../../Modele/User";
import {ActivatedRoute} from "@angular/router";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit  {

  users!: User[];
  addUserForm!: FormGroup;
  updateUserForm!: FormGroup;
  user!:User;
  public  messageUsernameErreur: any;
  public  messagePasswordErreur: any;
  public  messageRoleErreur: any;
  constructor(private ro:ActivatedRoute ,private auth:AuthService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.addUserForm = this.fb.group(
      {
        username: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null),
        password: this.fb.control(null, [Validators.required]),
        role: this.fb.control(null, [Validators.required])
      }
    );

    this.handlegetAllUsers();
    this.updateUserForm=this.fb.group(
      {

        id: this.user?.id,
        username: this.user?.username,
        email: this.user?.email,
        password: this.user?.password,
        role: this.user?.role


      }


    );

  }
  public handlegetAllUsers(){
    this.auth.getAllUsers().subscribe(
      {
        next :(data)=>{
          this.users=data;
        }}

    );



  }

  handleDeleteUser(u: User) {
    let conf=confirm("êtes-vous sûr de vouloir supprimer");
    if(conf==false)
      return;
    else{
      this.auth.deleteUser(u.id).subscribe(
        {
          next:(data)=>{
            this.ngOnInit();
          }
        }
      )
    }



  }

  getoldUser(u: User) {
    this.user=u;
    this.ngOnInit();

  }

  handleaddUser() {
    let u =this.addUserForm.value;
    if(this.addUserForm.valid){
    this.auth.addUser(u).subscribe({
        next: (data) => {
          alert("bien ajouter");
          this.ngOnInit();

        }
      }
    );
    }
    else{
      if(this.addUserForm.get("username")?.invalid){
        this.messageUsernameErreur="Username est requis "
      }
      if(this.addUserForm.get("password")?.invalid){
        this.messagePasswordErreur="Password est requis "

      }
      if(this.addUserForm.get("role")?.invalid){
        this.messageRoleErreur="Role est requis "

      }

    }
  }

  handleupdateUser() {
    let t= this.updateUserForm.value;

    this.auth.updateUser(t).subscribe({
        next: (data) => {
          alert("bien modifier");
          this.ngOnInit();
        }
      }
    );


  }
}
