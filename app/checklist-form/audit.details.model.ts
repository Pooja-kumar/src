import { questions } from "./questions.model";

export class AuditDetails {
    Type: string = "";
    Date: string = "";
    questions : questions[] = [];
}