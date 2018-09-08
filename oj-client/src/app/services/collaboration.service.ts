import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
declare var io: any; // io is already imported in .angular.cli.json
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  collaborationSocket: any;
  private _userSource = new Subject<string>();
  constructor() { }

  init(editor: any, sessionId: string): Observable<string> {
    // window.location.origin: the server location on the current page
    // for example, the current page on the browser is "localhost:3000/problems/1", the window.location.origin = "http/location:3000"
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });


    // wait for 'message' event
    // when receive the message, for now just print the message
    this.collaborationSocket.on("message", (message) => {
      console.log('message received from the server: ' + message);
    });

    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collobration: editor changed by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on("userChange", (data: string[]) => {
      console.log('collaboration user change: ' + data);
      this._userSource.next(data.toString());
    });

    return this._userSource.asObservable();
  }

  change(delta: string) : void {
    this.collaborationSocket.emit("change", delta);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }
}
