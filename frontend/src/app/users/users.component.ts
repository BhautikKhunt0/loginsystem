import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private service: ServicesService, private router: Router) {
    this.service.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data.users;
    });
  }

  ngOnInit() {
    if (!document.cookie.includes('token')) {
      this.router.navigate(['/login']);
    }
    this.service.getUsers();
  }
}
