import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Participant} from "../../Modele/Participant";
import {ParticipantService} from "../../services/participant.service";

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.css']
})
export class AdherentComponent implements OnInit  {

  public participants!: Participant[];
  private errorMessage: any;
  addParticipantForm!: FormGroup;
  participant!:Participant;
  updateParticipant!: FormGroup;
  oldParticipant!:Participant;
  chercher!: FormGroup;
  action:string="all";
  public  currentPage: number=0;
  pagesize:number=4;
  totalPages :number=0;
  pages!: Array<any>;
  constructor(public ps:ParticipantService, private fb: FormBuilder)
  { }
  ngOnInit(): void {

    this.handleGetpageParticipants();
    this.handleGetpageParticipants();
    this.chercher=this.fb.group(
      {keyword:this.fb.control(null)}
    );

    this.addParticipantForm = this.fb.group(
      {
        civilite: this.fb.control(null),
        rfidCardId: this.fb.control(null),
        nom: this.fb.control(null),
        prenom: this.fb.control(null),
        ddn: this.fb.control(null),
        email: this.fb.control(null),
        tel: this.fb.control(null),
        adresse: this.fb.control(null),
        commune:this.fb.control(null),
        fonction:this.fb.control(null),
        codepos:this.fb.control(null),
        montantUFC:this.fb.control(null),
        montantADAUO:this.fb.control(null)
      }
    );
    this.updateParticipant=this.fb.group(
      {

        id: this.oldParticipant?.id,
        civilite: this.oldParticipant?.civilite,
        rfidCardId: this.oldParticipant?.rfidCardId,
        nom: this.oldParticipant?.nom,
        prenom: this.oldParticipant?.prenom,
        ddn:this.oldParticipant?.ddn,
        email: this.oldParticipant?.email,
        tel: this.oldParticipant?.tel,
        adresse: this.oldParticipant?.adresse,
        commune:this.oldParticipant?.commune,
        fonction:this.oldParticipant?.fonction,
        codepos:this.oldParticipant?.codepos,
        montantUFC:this.oldParticipant?.montantUFC,
        montantADAUO:this.oldParticipant?.montantADAUO

      }


    );
  }
  public handlegetAllParticipants(){
    this.ps.getAllparticipants().subscribe(
      {
        next :(data)=>{
          this.participants=data;
        },
        error:(err)=>{
          this.errorMessage=err;
        }}

    );



  }
  public handleaddParticipant() {
    this.participant= this.addParticipantForm.value;
    this.ps.addParticipant(this.participant).subscribe({
        next: (data) => {
          alert("bien ajouter");
          this.ngOnInit();

        }
      }
    );
  }
  public handleDeleteParticipant(p: Participant) {
    let conf=confirm("êtes-vous sûr de vouloir supprimer");
    if(conf==false)
      return;
    else{
      this.ps.deleteParticipant(p.id).subscribe(
        {
          next:(data)=>{
            this.ngOnInit();
          }
        }
      )
    }

  }


  public handleupdateParticipant() {
    let t= this.updateParticipant.value;

    this.ps.updateParticipant(t).subscribe({
        next: (data) => {
          alert("bien modifier");
          this.ngOnInit();
        }
      }
    );

  }

  public getoldParticipant(p: Participant) {
    this.oldParticipant=p;
    this.ngOnInit();
  }


  public handleGetpageParticipants(){
    this.ps.getpageParticipants(this.currentPage).subscribe(
      data=>{

        this.participants=data['content'];

        this.pages=new Array(data['totalPages']);
        this.totalPages=data['totalPages'];

      },
      error => {
        console.log(error.error.message);
      }



    );

  }
  handlechercherParticipant() {
    this.action="chercher";
    let k=this.chercher.value.keyword;
    if(k){
      this.ps.chercherParticipant(k,this.currentPage,this.pagesize).subscribe(
        {
          next:(data)=>{
            this.participants=data['content'];
            this.pages=new Array(data['totalPages']);
            this.totalPages=data['totalPages'];

          }
        }
      )}
    else {
      this.handleGetpageParticipants();
    }

  }
  gotopage(i:number){
    this.currentPage=i;
    if(this.action=="all")
      this.handleGetpageParticipants();
    else
      this.handlechercherParticipant();

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

}
