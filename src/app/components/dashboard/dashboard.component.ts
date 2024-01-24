import {Component, OnInit} from '@angular/core';
import {Conference} from "../../Modele/Conference";
import {Participant} from "../../Modele/Participant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WebSocketService} from "../../services/web-socket.service";
import {ActivatedRoute} from "@angular/router";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {AuthService} from "../../services/auth.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public nParticipant :number=0;
  public nConference:number=0;

  constructor(public auth:AuthService,private cs:ConferenceService,private ps:ParticipantService ) {

  }
  ngOnInit(): void {
    this.ps.getAllparticipants().subscribe(
      {
        next :(data)=>{
          this.nParticipant=data.length;

        }}
    );
    this.cs.getAllconferences().subscribe(
      {
        next :(data)=>{
          this.nConference=data.length;
        }
      }
    )
    const d = {
      labels: [
        'Presence',
        'Absence'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.nConference,this.nParticipant],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 3
      }]
    };

    new Chart("myChart", {

      type: 'pie',
      data: d,

    })

  }

}
