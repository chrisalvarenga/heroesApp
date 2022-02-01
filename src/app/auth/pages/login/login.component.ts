import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  login(): void {
    const login = new Auth(this.email, this.password);
    this.authService.login(login).subscribe(
      response => {
        this.authService.isLogged = true;
        console.log(response);
        //console.log(response.data);
        console.log(response.data.accesToken);
        console.log(response.data.user.name);
        //console.log(response.toStr);
        localStorage.setItem('token', response.data.accesToken);
        localStorage.setItem('user', response.data.user.name);
        localStorage.setItem('logged', 'true');
        this.router.navigate(['/heroes'])
        //window.location.reload();
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log('error');
      }
    )
  }

  isLoggedUser(): void {
    let session = localStorage.getItem('token');
    console.log(session);
    if (session) {
      this.authService.isLogged = true;
    } else {
      this.authService.isLogged = false;
    }
  }



}
