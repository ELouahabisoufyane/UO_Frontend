import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Conference} from "../../Modele/Conference";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {Participant} from "../../Modele/Participant";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

@Component({
  selector: 'app-detail-conference',
  templateUrl: './detail-conference.component.html',
  styleUrls: ['./detail-conference.component.css']
})
export class DetailConferenceComponent implements OnInit{

  conferenceId! :number;
  public conference !:Conference;
  public participants: Participant[] = [];
  public presences  : Participant[]=[];
  clicked : boolean=false;
  public l :number=0;
  public ll : number =0;

  public  currentPageA: number=0;
  pagesizeA:number=8;
  totalPagesA :number=0;
  pagesA!: Array<any>;
  public  currentPageP: number=0;
  pagesizeP:number=8;
  totalPagesP :number=0;
  pagesP!: Array<any>;


  constructor(private ro:ActivatedRoute ,private cs:ConferenceService,private ps:ParticipantService ) {

  }
  ngOnInit(): void {
    this.conferenceId=this.ro.snapshot.params['id'];
    this.cs.getConference(this.conferenceId).subscribe({
      next: (data) => {
       this.conference=data;

      }

    });


    this.handleGetpageAbsences();
    this.handleGetpagePresences();


  }
  gotopage(i:number){
    this.currentPageA=i;

      this.handleGetpageAbsences();


  }



  gotoprevious(){
    if(this.currentPageA==0)
      this.gotopage(this.currentPageA);
    else{
      this.currentPageA--;
      this.gotopage(this.currentPageA);}
  }
  gotonext(){
    if(this.currentPageA==this.totalPagesA-1)
      this.gotopage(this.currentPageA);
    else{
      this.currentPageA++;
      this.gotopage(this.currentPageA);}

  }
  gotopageP(i:number){
    this.currentPageP=i;

    this.handleGetpagePresences();


  }

  gotopreviousP(){
    if(this.currentPageP==0)
      this.gotopage(this.currentPageP);
    else{
      this.currentPageP--;
      this.gotopage(this.currentPageP);}
  }
  gotonextP(){
    if(this.currentPageP==this.totalPagesP-1)
      this.gotopage(this.currentPageP);
    else{
      this.currentPageP++;
      this.gotopage(this.currentPageP);}

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


  private handleGetpageAbsences() {
    this.cs.getAllAbsences(this.conferenceId,this.currentPageA,this.pagesizeA).subscribe(
      {
        next :(data)=>{

          this.participants=data['content'];
          this.pagesA=new Array(data['totalPages']);
          this.totalPagesA=data['totalPages'];
          this.ll=data['totalElements'];
        }
      }
    )


  }
  private handleGetpagePresences() {

    this.cs.getAllPresences(this.conferenceId,this.currentPageP,this.pagesizeP).subscribe(
      {
        next :(data)=>{

          this.presences=data['content'];
          this.pagesP=new Array(data['totalPages']);
          this.totalPagesP=data['totalPages'];
          this.l=data['totalElements'];

        }
      }
    )


  }

  private handlechercherAbsences() {

  }


}
