import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResponse } from "../login-form/login.response.model";
import { map } from "rxjs";
import { LoginRequest } from "../login-form/login.request.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    loginResponse : LoginResponse;
    loginRequest: LoginRequest;

    AUTHORIZATION_URL = environment.AUTHORIZATION_URL;

    constructor(private http: HttpClient) {}

    login() {
        this.loginResponse = new LoginResponse();
        
        return this.http.get(this.AUTHORIZATION_URL, {responseType: 'text'})
        .pipe(map((responseData: string) => {
            this.loginResponse.token = responseData;
            return this.loginResponse;
        }));
    }

    // remove the top function
    onlogin(req) {
        this.loginResponse = new LoginResponse();

        return this.http.post<LoginResponse>(this.AUTHORIZATION_URL, req);
    }
}