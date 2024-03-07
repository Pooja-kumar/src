import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Questions } from "../checklist-form/checklist-question.model";

@Injectable({providedIn: 'root'})
export class DataSharingService {
    public checkListSubject = new Subject<Array<Questions>>();
    public username = new Subject<string>();

    constructor() {}

    sendQuestions(questions: Questions[]) {
        this.checkListSubject.next(questions);
    }

    sendUsername(username:string) {
        this.username.next(username);
        console.log(this.username);
        
    }
}