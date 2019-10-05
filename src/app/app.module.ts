import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterPageModule } from './member/trainer-list/filter/filter.module';
import { AuthMemberGuardService } from './services/auth-member-guard.service';
import { AuthTrainerGuardService } from './services/auth-trainer-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps'
import { environment } from '../environments/environment'
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { TrainerDetailPageModule } from './member/trainer-list/trainer-detail/trainer-detail.module';
// import { MapPageModule } from './trainer/map/map.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // MapPageModule,
    FilterPageModule, 
    BrowserAnimationsModule,
    TrainerDetailPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthMemberGuardService,
    AuthTrainerGuardService,
    AuthenticationService,
    UserService,
    Geolocation,
    GoogleMaps,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
