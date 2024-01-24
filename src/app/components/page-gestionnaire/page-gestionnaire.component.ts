import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ConferenceService} from "../../services/conference.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Conference} from "../../Modele/Conference";
import * as moment from "moment";

@Component({
  selector: 'app-page-gestionnaire',
  templateUrl: './page-gestionnaire.component.html',
  styleUrls: ['./page-gestionnaire.component.css']
})
export class PageGestionnaireComponent implements OnInit {

  public conference! :Conference ;

  constructor(public auth:AuthService,public cs:ConferenceService, public r :Router)
  { }


  ngOnInit(): void {
    this.cs.getConferenceByDate(this.obtenirDateActuelle()).subscribe(
      {
        next :(data)=>{
          this.conference=data;
        }}
    )

  }
  obtenirDateActuelle(): string {
    const dateActuelle = new Date();
    return dateActuelle.toISOString().split('T')[0];
  }


  goto(id: number) {
    this.r.navigateByUrl("admin/detail/"+id);

  }
}
