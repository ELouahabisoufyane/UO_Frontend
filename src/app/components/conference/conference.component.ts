import {Component, OnInit} from '@angular/core';
import {Participant} from "../../Modele/Participant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParticipantService} from "../../services/participant.service";
import {Conference} from "../../Modele/Conference";
import {ConferenceService} from "../../services/conference.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css'],

})
export class ConferenceComponent implements OnInit{


  conferences!: Conference[];
  private errorMessage: any;
  addConferenceForm!: FormGroup;
  conference!:Conference;
  updateConference!: FormGroup;
  oldConference!:Conference;
  chercher!: FormGroup;
  action:string="all";
  public  currentPage: number=0;
  pagesize:number=4;
  totalPages :number=0;
  pages!: Array<any>;
  constructor(public cs:ConferenceService, private fb: FormBuilder ,private r :Router)
  { }
  ngOnInit(): void {
    this.chercher=this.fb.group(
      {keyword:this.fb.control(null)}
    );
    this.handleGetpageConferences();
    this.addConferenceForm = this.fb.group(
      {

        titre: this.fb.control(null, [Validators.required]),
        date: this.fb.control(null, [Validators.required]),
        conferencier: this.fb.control(null, [Validators.required])
      }
    );
    this.updateConference=this.fb.group(
      {

        id: this.oldConference?.id,
        titre: this.oldConference?.titre,
        date: this.oldConference?.date,
        conferencier: this.oldConference?.conferencier

      }


    );
  }
  public handlegetAllConferences(){
    this.cs.getAllconferences().subscribe(
      {
        next :(data)=>{
          this.conferences=data;
        },
        error:(err)=>{
          this.errorMessage=err;
        }}

    );



  }
  public handleaddConference() {
    this.conference= this.addConferenceForm.value;
    this.cs.addConference(this.conference).subscribe({
        next: (data) => {
          alert("bien ajouter");
          this.ngOnInit();

        }
      }
    );
  }
  public handleDeleteConference(p: Conference) {
    let conf=confirm("êtes-vous sûr de vouloir supprimer");
    if(conf==false)
      return;
    else{
      this.cs.deleteConference(p.id).subscribe(
        {
          next:(data)=>{
            this.ngOnInit();
          }
        }
      )
    }

  }


  public handleupdateConference() {
    let t= this.updateConference.value;

    this.cs.updateConference(t).subscribe({
        next: (data) => {
          alert("bien modifier");
          this.ngOnInit();
        }
      }
    );

  }

  public getoldConference(p: Conference) {
    this.oldConference=p;
    this.ngOnInit();
  }


  public handleGetpageConferences(){
    this.cs.getpageConferences(this.currentPage).subscribe(
      data=>{

        this.conferences=data['content'];

        this.pages=new Array(data['totalPages']);
        this.totalPages=data['totalPages'];
      },
      error => {
        console.log(error.error.message);
      }



    )
  }
  handlechercherConference() {
    this.action="chercher";
    let k=this.chercher.value.keyword;
    if(k){
      this.cs.chercherConference(k,this.currentPage,this.pagesize).subscribe(
        {
          next:(data)=>{
            this.conferences=data['content'];
            this.pages=new Array(data['totalPages']);
            this.totalPages=data['totalPages'];

          }
        }
      )}
    else {
      this.handleGetpageConferences();
    }

  }
  gotopage(i:number){
    this.currentPage=i;
    if(this.action=="all")
      this.handleGetpageConferences();
    else
      this.handlechercherConference();

  }

  gotoprevious(){
    if(this.currentPage==0)
      this.gotopage(this.currentPage);
    else{
      this.currentPage--;
      this.gotopage(this.currentPage);}
  }
  gotonext(){
    if(this.currentPage==this.totalPages-1)
      this.gotopage(this.currentPage);
    else{
      this.currentPage++;
      this.gotopage(this.currentPage);}

  }


  consulterDetail(id: number) {
    this.r.navigateByUrl("/admin/detail/"+id)


  }
}
