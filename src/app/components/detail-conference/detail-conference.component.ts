import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Conference} from "../../Modele/Conference";
import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {Participant} from "../../Modele/Participant";
import {Chart, registerables} from "chart.js";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WebSocketService} from "../../services/web-socket.service";
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
  public p :number=0;
  public a : number =0;
  public presenceUpdateMessage!: string;

  public  currentPageP: number=0;
  pagesizeP:number=8;
  totalPagesP :number=0;
  pagesP!: Array<any>;
  public pts !: Participant[];
  public chercher!: FormGroup;


  constructor(private ws :WebSocketService,private ro:ActivatedRoute,public fb:FormBuilder ,private cs:ConferenceService,private ps:ParticipantService ) {

  }
  ngOnInit(): void {


    this.ws.initWebSocket().then(() => {
      this.ws.subscribe('socket/presenceUpdate', (event) => {

        console.log('Received presence update:', event.body);
          if(event.body){
            this.handleGetpagePresences();
          }
          this. presenceUpdateMessage = event.body;


      });
    });
    /*
    this.ws.connect();
    this.ws.subscribe((message) => {
      this.presenceUpdateMessage = message;

    });*/
    this.conferenceId=this.ro.snapshot.params['id'];
    this.cs.getConference(this.conferenceId).subscribe({
      next: (data) => {
       this.conference=data;

      }

    });


    this.chercher=this.fb.group(
      {keyword:this.fb.control(null)}
    );
    this.cs.getAllPresences(this.conferenceId,this.currentPageP,this.pagesizeP).subscribe(
      {
        next :(data)=>{

          this.presences=data['content'];
          this.pagesP=new Array(data['totalPages']);
          this.totalPagesP=data['totalPages'];
          this.p=data['totalElements'];
          console.log(this.p);
          this.createChart();

        }
      }
    );
    this.cs.getAllAbsences(this.conferenceId).subscribe(
      {
        next :(data)=>{
          this.a=data.length;
          console.log(this.a);
          this.createChart();

        }
      }
    );


  }

  gotopageP(i:number){
    this.currentPageP=i;

    this.handleGetpagePresences();


  }

  gotopreviousP(){
    if(this.currentPageP==0)
      this.gotopageP(this.currentPageP);
    else{
      this.currentPageP--;
      this.gotopageP(this.currentPageP);}
  }
  gotonextP(){
    if(this.currentPageP==this.totalPagesP-1)
      this.gotopageP(this.currentPageP);
    else{
      this.currentPageP++;
      this.gotopageP(this.currentPageP);}

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



  private handleGetpagePresences() {





  }

  private handlechercherAbsences() {

  }
  private createChart(): void {
    if (this.p >= 0 && this.a >= 0) {
      const d = {
        labels: ['Presence', 'Absence'],
        datasets: [
          {

            data: [this.p , this.a],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 3,
          },
        ],
      };

      new Chart('myChart', {
        type: 'pie',
        data: d,
      });
    }
  }


  handlechercherParticipant() {
    let k=this.chercher.value.keyword;
    if(k){
      this.ps.chercherUnParticipant(k).subscribe(
        {
          next:(data)=>{
            this.pts =data;


          }
        }
      )}

  }
}
