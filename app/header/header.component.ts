import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserNotLoggedIn: boolean = localStorage.getItem('Username') == null;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  OnlogOff() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Username');
    this.router.navigateByUrl("/");
  }
}
