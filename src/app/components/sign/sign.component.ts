import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit{
  public signupForm!: FormGroup;
  public message!: string;

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }


  // Getter pour accéder facilement aux champs du formulaire
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {

    // Vérifiez si le formulaire est valide avant de soumettre
    if (this.signupForm.invalid) {
      alert("champ required")
      return;
    }
    let f = this.signupForm.value;

    // Vérifiez si les mots de passe correspondent
    if (f.password !== f.confirmPassword) {
      this.message='Les mots de passe ne correspondent pas'
      return;
    }

  }


}
