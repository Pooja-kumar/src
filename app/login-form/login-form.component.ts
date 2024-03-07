import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { LoginService } from '../services/login.service';
import { LoginRequest } from './login.request.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  token: string;
  loginRequest: LoginRequest;
  isAuthorized = true;

  constructor(private loginService: LoginService, private router: Router, private transferData: DataSharingService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }
  onLogin() {
    console.log('Login Clicked');
    this.loginRequest = new LoginRequest();
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    console.log(this.loginRequest);
    
    
    // this.loginService.login().subscribe(loginResponse => {
    //   this.token = loginResponse.token;
    //   console.log(this.token);
    //   if(this.token) {
    //     localStorage.setItem('Username', this.loginRequest.username);
    //     localStorage.setItem("Token", this.token);
    //     if(!(localStorage.getItem('Token') == null)) {
    //       this.router.navigateByUrl('/audit-type');
    //     }
        
    //   }
    // });

    this.loginService.onlogin(this.loginRequest).subscribe(loginResponse => {
      this.token = loginResponse.token;
      console.log(this.token);

      if(this.token != 'unauthorized') {
        localStorage.setItem('Username', this.loginRequest.username);
        localStorage.setItem("Token", this.token);
          this.router.navigateByUrl('/audit-type');
      }
      else {
        this.isAuthorized = false;
      }
      
    })
    
  }
}
