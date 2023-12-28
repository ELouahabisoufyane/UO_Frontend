import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Conference} from "../../Modele/Conference";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {Participant} from "../../Modele/Participant";
import {Presence} from "../../Modele/Presence";

@Component({
  selector: 'app-detail-conference',
  templateUrl: './detail-conference.component.html',
  styleUrls: ['./detail-conference.component.css']
})
export class DetailConferenceComponent implements OnInit{

  conferenceId! :number;
  public conference !:Conference;
  public participants ! : Participant[];
  public presences ! : Participant[];
  clicked : boolean=false;



  constructor(private ro:ActivatedRoute ,private cs:ConferenceService,private ps:ParticipantService ) {

  }
  ngOnInit(): void {
    this.conferenceId=this.ro.snapshot.params['id'];
    this.cs.getConference(this.conferenceId).subscribe({
      next: (data) => {
       this.conference=data;

      }

    });


    this.cs.getAllAbsences(this.conferenceId).subscribe(
      {
        next :(data)=>{
          this.participants=data;
        }
      }
    )
    this.cs.getAllPresences(this.conferenceId).subscribe(
      {
        next :(data)=>{
          this.presences=data;
        }
      }
    )

  }


  setAccepted(p: Participant) {
    this.cs.setPresence(this.conferenceId,p.id).subscribe(
      {
        next:(data)=>{
          alert("bien marquer")
          this.ngOnInit();
        }
      }
    )



  }

  setRefused(p: Participant) {

  }

  clickedFonction() {
    this.clicked =true;
  }




}
