import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navCtlr:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authMemberState.subscribe(state => {
        if (state) {
          // this.router.navigate(['member']);
          this.navCtlr.navigateRoot(['member'])
        } else {
          this.authenticationService.authTrainerState.subscribe(statetrainer=>{
            if (statetrainer){
              // this.router.navigate(['trainer']);
              this.navCtlr.navigateRoot(['trainer'])
            }else{
              // this.router.navigate(['public']);
              this.navCtlr.navigateRoot(['public'])
            }
          })
        }
      });
    });
  }
}
