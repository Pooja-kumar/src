import { AuditDetails } from "./audit.details.model";

export class SeverityRequest {
    ProjectName: string = "";
    ProjectManagerName: string = "";
    ApplicationOwnerName: string = "";
    Auditdetails =  new AuditDetails();
}