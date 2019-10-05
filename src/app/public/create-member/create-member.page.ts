import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService} from 'src/app/services/authentication.service';
import {User,UserInit} from '../../interface';
@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.page.html',
  styleUrls: ['./create-member.page.scss'],
})
export class CreateMemberPage implements OnInit {

  password:string;

  user: User = UserInit;
  constructor(
    public navCtlr:NavController,
    private authService:AuthenticationService
    ) {}

  ngOnInit() {
  }
  nav(){
    this.navCtlr.navigateForward(['public','create-trainer'])
  }

  save(){
    this.authService.createUser(this.user.email,this.password,"member",this.user)
  }
}
