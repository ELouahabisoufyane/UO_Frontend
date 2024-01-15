import { Injectable } from '@angular/core';
import {Participant} from "../Modele/Participant";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  apiBaseUrl:string= "http://localhost:8089";

  constructor(private http:HttpClient) { }

  public getAllparticipants():Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiBaseUrl+"/participant/getAll");
  }

  public addParticipant(participant: Participant):Observable<Participant> {
    return this.http.post<Participant>(this.apiBaseUrl+"/participant/addOne",participant);
  }

  public updateParticipant(participant: Participant):Observable<Participant> {
    return this.http.put<Participant>(this.apiBaseUrl+"/participant/updateOne",participant);
  }

  public deleteParticipant(id: number): Observable<void> {
    return this.http.delete<void>(this.apiBaseUrl+"/participant/delete/"+id);
  }

  public getpageParticipants(p: number) : Observable<any>{
    return this.http.get(this.apiBaseUrl+'/participant/list/'+p);
  }

  public chercherParticipant(k: string, p: number, s: number):Observable<any>{
    return this.http.get(this.apiBaseUrl+'/participant/chercher?mc='+k+'&page='+p+'&size='+s);

  }


  public getParticipant(id:number): Observable<Participant>{
    return this.http.get<Participant>(this.apiBaseUrl+'/participant/getOne/'+id);
  }
}
