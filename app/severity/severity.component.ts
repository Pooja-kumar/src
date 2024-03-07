import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { SeverityResponse } from './severity.response.model';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {
  severityResponse: SeverityResponse;
  auditId: number;
  projectExecutionStatus: string;
  remedialActionDuration: string;
  constructor(private checklistService: ChecklistService) {
   }

  ngOnInit(): void {
    this.severityResponse = this.checklistService.getSeverityResponse();
    console.log(this.severityResponse);
    
    this.auditId = this.severityResponse.auditId;
    this.projectExecutionStatus = this.severityResponse.projectExecutionStatus;
    this.remedialActionDuration = this.severityResponse.remedialActionDuration;
  }

}
