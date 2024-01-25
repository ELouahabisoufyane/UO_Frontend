import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

import {ConferenceService} from "../../services/conference.service";
import {ParticipantService} from "../../services/participant.service";
import {AuthService} from "../../services/auth.service";
import {Chart} from "chart.js";
import {registerables} from "chart.js";
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public nParticipant :number=0;
  public nConference:number=0;
  public titres: string[] = [];
  public np: number[] = [];
  public na: number[] = [];
  public taux: any;
  public sommeNP:any;
  public sommeNA:any;



  constructor(public sS:ConferenceService,public auth:AuthService,private cs:ConferenceService,private ps:ParticipantService ) {

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
    );

    this.sS.getStatistique().subscribe(
      {
        next:(data)=>{
          data.forEach(d=>{
            this.titres.push(d.titre);
            this.np.push(d.nbPrresence);
            this.na.push(d.nbAbssence);


          })
          this.taux=this.calculerSomme(this.np)*100/(this.calculerSomme(this.na)+this.calculerSomme(this.np));
          this.sommeNA =this.calculerSomme(this.na);
          this.sommeNP =this.calculerSomme(this.np);
          this.createChart();
          this.barChart();
          console.log(this.np)
        }
      }
    )


  }

  public calculerSomme(valeurs:any): number {
    return valeurs.reduce((acc:any, valeur:any) => acc + valeur, 0);
  }
  private createChart(): void {
    if (this.sommeNP > 0 && this.sommeNA > 0) {
      const d = {
        labels: ['Presence', 'Absence'],
        datasets: [
          {

            data: [this.sommeNP , this.sommeNA],
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

  private barChart(): void {
    const data = {
      labels: this.titres, // Use titles as x-axis labels
      datasets: [
        {
          label: 'Conférences',
          data: this.np, // Use np as y-axis data
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    new Chart('myBar', {
      type: 'bar', // Use 'horizontalBar' for horizontal bar chart
      data: data,
    });
  }



}
