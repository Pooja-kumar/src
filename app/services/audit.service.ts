import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Questions } from "../checklist-form/checklist-question.model";

@Injectable({providedIn: 'root'})
export class AuditService{
    questions$: Array<Questions> = [];
    CHECKLIST_URL = environment.CHECKLIST_URL;

    constructor(private http: HttpClient, private router: Router) {}

    onPostAuditType(auditType: string) {
      localStorage.setItem('auditType', auditType);
        this.http.get<Array<Questions>>(this.CHECKLIST_URL+'?auditType='+auditType).subscribe((questions: Array<Questions>) => {
            this.questions$ = questions;
            // console.log(this.questions$);
            if(!(localStorage.getItem('Token') == null)) {
              this.router.navigateByUrl('/checklist');
            }
            else {
              this.router.navigateByUrl('/');
            }
          });
    }

    getQuestions() : Array<Questions> {
        return this.questions$;
    }
}