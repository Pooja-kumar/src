import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Questions } from '../checklist-form/checklist-question.model';
import { AuditService } from '../services/audit.service';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-audit-type',
  templateUrl: './audit-type.component.html',
  styleUrls: ['./audit-type.component.css']
})
export class AuditTypeComponent implements OnInit {
  auditForm: FormGroup;
  questions$: Array<Questions> = [];
  username$: string;

  constructor(private auditService: AuditService, 
    private transferData: DataSharingService
    ,private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('Token') == null) {
      this.router.navigateByUrl('/');
    }
    this.username$ = localStorage.getItem('Username');
    
    this.auditForm = new FormGroup({
      'auditType': new FormControl(null, Validators.required)
    })
    
  }

  onAuditSubmit() {
    this.auditService.onPostAuditType(this.auditForm.get('auditType').value);
  }
}
