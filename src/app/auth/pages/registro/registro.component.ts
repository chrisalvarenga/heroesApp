import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router) { this.error = '';
    this.requestFailed = false}

  ngOnInit(): void {
  }

  register(): void {
    const register = new Register(this.name, this.lastName, this.email, this.password, this.confirmPassword, this.roles as any);
    console.log(register);
    if(this.confirmPassword === this.password){
   
      this.authService.register(register).subscribe(
        response => {
          this.router.navigate(['/heroes']);
          console.log(response);
        },err => {
          console.log('error')});
      
    }else{
      this.error = "password don't match";
      this.requestFailed = true;
    }
  }


}
