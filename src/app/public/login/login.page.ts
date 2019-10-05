import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  constructor(
    public navCtlr: NavController,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  nav() {
    this.navCtlr.navigateForward(['public', 'create-member'])
  }
  login() {
    if (this.email && this.password) {
      this.authenticationService.login(this.email, this.password)
    }
  }
}
