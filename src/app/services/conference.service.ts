import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Conference} from "../Modele/Conference";
import {Participant} from "../Modele/Participant";
import {Presence} from "../Modele/Presence";
import {Statistique} from "../Modele/Statistique";

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  apiBaseUrl:string= "http://localhost:8089";

  constructor(private http:HttpClient) { }

  public getAllconferences():Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiBaseUrl+"/conference/getAll");
  }

  public addConference(conference: Conference):Observable<Conference> {
    return this.http.post<Conference>(this.apiBaseUrl+"/conference/addOne",conference);
  }

  public deleteConference(id: number): Observable<void> {
    return this.http.delete<void>(this.apiBaseUrl+"/conference/delete/"+id);
  }

  public getpageConferences(p: number) : Observable<any>{
    return this.http.get(this.apiBaseUrl+'/conference/list/'+p);
  }

  public chercherConference(k: string, p: number, s: number):Observable<any>{
    return this.http.get(this.apiBaseUrl+'/conference/chercher?mc='+k+'&page='+p+'&size='+s);

  }


  public getConference(id:number): Observable<Conference>{
    return this.http.get<Conference>(this.apiBaseUrl+'/conference/getOne/'+id);
  }

  public addParticipant(idConf:number,idPart:number): Observable<Conference>{

   return this.http.post<Conference>(this.apiBaseUrl+'/conference/addParticipant/'+idConf,idPart);
  }

  public getAllAbsences(idConf:number): Observable<Participant[]>{

    return this.http.get<Participant[]>(this.apiBaseUrl+'/conference/'+idConf+'/participants');
  }


  public updateConference(conference: Conference):Observable<Conference> {
    return this.http.put<Conference>(this.apiBaseUrl+"/conference/update",conference);
  }

  public setPresence(conferenceId: number, id: number):Observable<void> {
    return this.http.post<void>(this.apiBaseUrl+'/conference/changeEtat/'+conferenceId,id);
  }
  public getAllPresences(idConf:number, p: number, s: number): Observable<any>{
    return this.http.get(this.apiBaseUrl+'/conference/'+idConf+'/presenteParticipants?page='+p+'&size='+s);
  }

  public getConferenceByDate(date:string):Observable<Conference>{
    return this.http.get<Conference>(this.apiBaseUrl+'/conference/getByDate/'+date);

  }

  public getStatistique():Observable<Statistique[]> {
    return this.http.get<Statistique[]>(this.apiBaseUrl+'/conference/getStatistiques');

  }

  public deleteConferences() : Observable<void> {
    return this.http.delete<void>(this.apiBaseUrl+"/conference/deleteTous");
  }
}
