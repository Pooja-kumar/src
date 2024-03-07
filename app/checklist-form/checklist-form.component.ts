import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditService } from '../services/audit.service';
import { ChecklistService } from '../services/checklist.service';
import { AuditDetails } from './audit.details.model';
import { Questions } from './checklist-question.model';
import { questions } from './questions.model';
import { SeverityRequest } from './severity.request.model';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {
  questions$: Array<Questions> = [];
  checklistform: FormGroup;

  response : SeverityRequest = new SeverityRequest();

  constructor(private auditService: AuditService, private formBuilder: FormBuilder, private checklistService: ChecklistService, private router: Router) { 
    
    this.checklistform = this.formBuilder.group({
      'pname': new FormControl(null, Validators.required),
      'mname': new FormControl(null, Validators.required),
      'oname': new FormControl(null, Validators.required),
      'datee': new FormControl(null, Validators.required),
      questionsC: new FormArray([]),
    });

  }

  get QuestionFromArray() {
    return this.checklistform.controls.questionsC as FormArray;
  }

  ngOnInit(): void {
    console.log('Token '+localStorage.getItem('Token'));
    
    if(localStorage.getItem('Token') == undefined || localStorage.getItem('Token') == null) {
      this.router.navigateByUrl('/');
    }
    this.questions$ = this.auditService.getQuestions();
    console.log(this.questions$);
    this.addCheckboxes();
  }

  private addCheckboxes() {
    console.log(this.questions$.length);
    
    this.questions$.forEach(()=>this.QuestionFromArray.push(new FormControl(false)));
  }
  OnChecklistSumbit() {
    const pnmae = this.checklistform.get('pname').value;
    const mname = this.checklistform.get('mname').value;
    const oname = this.checklistform.get('oname').value;
    const datee = this.checklistform.get('datee').value;
    const auditType = localStorage.getItem('auditType');
    const selectedQuestions = this.checklistform.value.questionsC
                 .map((checked, i) => checked ?this.questions$[i].questionNo : null)
                 .filter(v => v !== null);
      console.log(selectedQuestions);
    this.response = new SeverityRequest();
    this.response.ProjectName = pnmae;
    this.response.ProjectManagerName = mname;
    this.response.ApplicationOwnerName = oname;
    this.response.Auditdetails = new AuditDetails();
    this.response.Auditdetails.Type = auditType;
    this.response.Auditdetails.Date = datee;

    for(var i = 1; i < this.questions$.length; i++) {
      const ques = new questions();
      ques.questionNo = i;
      ques.question = selectedQuestions.includes(i);
      this.response.Auditdetails.questions.push()
    }

    this.checklistService.onPostChecklist(this.response);
  }
}
