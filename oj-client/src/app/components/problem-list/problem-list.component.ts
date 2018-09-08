import { Component, OnInit, OnDestroy } from '@angular/core';
import { Problem } from '../../models/problem.model'
import { DataService } from '../../services/data.service';
import { InputService } from '../../services/input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit, OnDestroy {
  // private problems list inside the component
  problems: Problem[];
  subscriptionProblems: Subscription;

  searchTerm: String = '';
  subscriptionInput: Subscription;

  // inject data service in constructor
  constructor(private dataService: DataService,
              private inputService: InputService) { }

  ngOnInit() {
    //initialize problems in this class
    this.getProblems();
    this.getSearchTerm();
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }

  getProblems() {
    this.subscriptionProblems = this.dataService.getProblems()
    .subscribe(problems => this.problems = problems);
  }

  getSearchTerm(): void {
    this.subscriptionInput = this.inputService.getInput()
                                .subscribe(
                                  inputTerm => this.searchTerm = inputTerm
                                );
  }
}
