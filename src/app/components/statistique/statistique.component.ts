import {Component, OnInit} from '@angular/core';
import {ConferenceService} from "../../services/conference.service";
import {Statistique} from "../../Modele/Statistique";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit{

  statistiques!: Statistique[];


  constructor(private cs:ConferenceService) {
  }
  ngOnInit(): void {
    this.getStatistique();

  }

  public getStatistique(){
    this.cs.getStatistique().subscribe(
      {
        next : (data)=>{
          this.statistiques=data;
        }
      }
    )
  }

}
