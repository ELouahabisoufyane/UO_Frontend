import {Component, OnInit} from '@angular/core';
import {User} from "../../Modele/User";
import {ActivatedRoute} from "@angular/router";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit  {

  users!: User[];
  addUserForm!: FormGroup;
  constructor(private ro:ActivatedRoute ,private auth:AuthService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.addUserForm = this.fb.group(
      {
        username: this.fb.control(null),
        email: this.fb.control(null),
        password: this.fb.control(null),
        role: this.fb.control(null)
      }
    );

    this.handlegetAllUsers();

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


  }

  getoldUser(u: User) {

  }

  handleaddUser() {
    let u =this.addUserForm.value;
    this.auth.addUser(u).subscribe({
        next: (data) => {
          alert("bien ajouter");
          this.ngOnInit();

        }
      }
    );

  }
}
