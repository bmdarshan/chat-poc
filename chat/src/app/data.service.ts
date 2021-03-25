import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subject: WebSocketSubject<any> = webSocket('ws://192.168.0.251:8080');
  observable: Observable<any> | undefined;
  constructor(private http: HttpClient) {}

  getWebsocketConnection() {
    return this.subject;
  }

  getWebsocketData(): Observable<any> {
    return (this.observable = new Observable(observer =>
      this.subject.subscribe(
        payload => observer.next(payload), // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      )
    ));
  }

  pushWebsocketData(args: any) {
    this.subject.next(args);
  }

  getData(args: { url: string }) {
    return Observable.create(
      (observer: {
        next: (arg0: any) => void;
        complete: () => void;
        error: (arg0: any) => void;
      }) => {
        this.http
          .get<any>(args.url)
          .pipe(res => res)
          .subscribe(
            result => {
              observer.next(result);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
      }
    );
  }

  postData(args: { url: string; body: any }) {
    return Observable.create(
      (observer: {
        next: (arg0: any) => void;
        complete: () => void;
        error: (arg0: any) => void;
      }) => {
        this.http
          .post<any>(args.url, args.body)
          .pipe(res => res)
          .subscribe(
            result => {
              observer.next(result);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
      }
    );
  }
}
