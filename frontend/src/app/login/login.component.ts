import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  token: String = '';
  constructor(private service: ServicesService, private router: Router) {
    if (document.cookie.split('token=')[1] == 'undefined') {
      this.router.navigate(['/login']);
    }
  }
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.service.login(loginForm.value).subscribe((data: any) => {
        console.log(data);

        this.token = data.token;

        document.cookie = `token=${this.token}`;
      });
      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 1000);
    } else {
      console.log('Form is invalid');
    }
  }
}
