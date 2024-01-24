import { Injectable } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient :any


  public mapEndpointSubscription: Map<string, any> = new Map();

  public async initWebSocket() :Promise<void> {
    return new Promise((resolve) => {
      if (!this.stompClient) {
        const ws = new SockJS('http://localhost:8089/socket');
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, resolve);
      } else {
        resolve();
      }
    })
  }
  public async subscribe(name: string, fnc: (event:any) => void) {
    const subscription = this.stompClient.subscribe(`/${name}`, (event: any) => {
      if (event.headers['content-type'] === 'application/json;charset=UTF-8') {
        // Si le contenu est de type JSON, parsez-le
        fnc({ ...event, body: JSON.parse(event.body) });
      } else {
        // Sinon, traitez-le comme une chaîne de texte
        fnc({ ...event, body: event.body });
      }
    });
    this.mapEndpointSubscription.set(name, subscription);
  }

  public unsubscribeToWebSocketEvent(name: string) {
    const subscription = this.mapEndpointSubscription.get(name);
    if (subscription) {
      subscription.unsubscribe();
    }
  }
  public send(name: string, body: any) {
    this.stompClient.send(`/app/socket/${name}`, {}, JSON.stringify(body));
  }


}
