import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../services/data.service';
declare var ace: any; // we must declare ace, since the ace is not wroten by typescript, use type any.

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  public languages: string[] = ['Java', 'Python', 'C++'];
  language: string = 'Java';
  sessionId: string; // problem Id used as sessio Id
  output: string = '';
  editor: any;

  users: string;
  subscriptionUsers: Subscription;
  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        //Type your code here
      }  
    }`,
    'Python': `class Solution:
    def example():
            # write your python code here.`,
    
    'C++':`#include <iostream>
    using namespace std;
    int main(){
      // Type your code here
    }`
  };

  constructor(private collaboration: CollaborationService, 
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
    this.collaboration.restoreBuffer();
  }
  initEditor(): void {
    // "editor" is the id in html
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    
    this.resetEditor();


    document.getElementsByTagName('textarea')[0].focus(); // to make sure focus is editor area

    this.subscriptionUsers = this.collaboration.init(this.editor, this.sessionId)
      .subscribe(users => this.users = users);

    this.editor.lastAppliedChange = null;

    this.editor.on("change", (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) // editor latest change 
      {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }
  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode(
        "ace/mode/" + this.language.toLowerCase()
    );
  }

  setLanguage(language: string): void{
    this.language = language;
    // when language changes, need to reset the editor
    this.resetEditor();
  }

  submit(): void {
    let code = this.editor.getValue();
    console.log(code);
    const data = {
      code: code,
      lang: this.language.toLowerCase()
    }
    this.dataService.buildAndRun(data).then(res => this.output = res);
  }
}
