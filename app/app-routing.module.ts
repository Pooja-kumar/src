import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTypeComponent } from './audit-type/audit-type.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SeverityComponent } from './severity/severity.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'audit-type', component: AuditTypeComponent },
  { path: 'checklist', component: ChecklistFormComponent },
  { path: 'severity', component: SeverityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
