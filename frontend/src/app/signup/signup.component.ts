import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private service: ServicesService, private router: Router) {}
  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.service.signUp(signupForm.value).subscribe((data: any) => {
        document.cookie = `token=${data.token}`;
      });
      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 1000);
    } else {
      console.log('Form is invalid');
    }
  }
}
