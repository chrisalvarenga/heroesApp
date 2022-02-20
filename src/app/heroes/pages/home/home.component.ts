import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {

  name = '';
  get auth() {
    return this.authService.auth;
  }

  constructor( private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('user')!;
  }

  logout() {
    this.router.navigate(['./auth']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('logged');
  }

}
