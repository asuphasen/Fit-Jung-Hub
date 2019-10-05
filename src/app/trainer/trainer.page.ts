import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {

  pages = [
    {
      title: 'Home',
      url: '/trainer/menu/home',
      icon:'md-home'
    },
    {
      title: 'Edit profile',
      url: '/trainer/menu/edit-profile',
      icon:'md-create'
    },
    // {
    //   title: 'Map',
    //   url: '/trainer/menu/map',
    //   icon:'map'
    // }
  ];
  constructor(
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
