import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../interfaces/auth.interface';
import { Register } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent implements OnInit {

  name = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  roles = ['USER'];
  error: string;
  requestFailed: boolean;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.error = '';
    this.requestFailed = false
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  register(): void {
    const register = new Register(this.name, this.lastName, this.email, this.password, this.confirmPassword, this.roles as any);
    if (this.name != '' && this.lastName != '' && this.email != '' && this.password != '' && this.confirmPassword != '') {
      if (this.confirmPassword === this.password) {
        this.authService.register(register).subscribe(
          response => {
            const login = new Auth(this.email, this.password);
            this.authService.login(login).subscribe(
              res => {
                this.authService.isLogged = true;
                localStorage.setItem('token', res.data.accesToken);
                localStorage.setItem('user', res.data.user.name);
                localStorage.setItem('logged', 'true');
                this.router.navigate(['/heroes']);
              }
            )
          }, err => {
            this.error = err.error.message;
            this.requestFailed = true;
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            })
          });
      } else {
        this.error = "password don't match";
        this.requestFailed = true;
      }
    } else {
      this.error = "You must complete all the fields";
      this.requestFailed = true;
    }
  }


}
