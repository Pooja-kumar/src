import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { SeverityRequest } from "../checklist-form/severity.request.model";
import { SeverityResponse } from "../severity/severity.response.model";

@Injectable({providedIn: 'root'})
export class ChecklistService {
    severityResponse: SeverityResponse;
    SEVERITY_URL = environment.SEVERITY_URL;

    constructor(private router: Router, private http: HttpClient) {
        this.severityResponse = new SeverityResponse();
    }

    onPostChecklist(response: SeverityRequest) {
        console.log(response);
        
        this.http.post<SeverityResponse>(this.SEVERITY_URL, response)
            .subscribe(res => {
                this.severityResponse = res;
                console.log(this.severityResponse);
                    console.log("ROUTE");
                    
                    this.router.navigateByUrl('/severity');
                
            })
    }

    getSeverityResponse(): SeverityResponse {
        return this.severityResponse;
    }
}