import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InputService {
    private inputSubject$ = new BehaviorSubject<String>('');

    constructor() { }

    changeInput(term) {
        this.inputSubject$.next(term);
    }

    getInput(): Observable<String> {
        return this.inputSubject$.asObservable();
    }
}

