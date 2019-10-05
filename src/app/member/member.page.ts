import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  pages = [
    {
      title: 'Traniner',
      url: '/member/menu/trainer-list',
      icon:'md-home'
    },
    {
      title: 'Food',
      url: '/member/menu/foods',
      icon:'md-create'
    }
  ];
  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
