import {Participant} from "./Participant";

export class Conference {
  id!:number;
  titre!:string;
  date!:Date;
  conferencier!:string;
  participants ! :Participant[];

}
