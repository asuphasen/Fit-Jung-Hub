import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { Platform, ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interface'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authMemberState = new BehaviorSubject(false);
  authTrainerState = new BehaviorSubject(false);

  constructor(
    private afd: AngularFireDatabase,
    private afa: AngularFireAuth,
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navCtlr: NavController,
    private afs: AngularFirestore,
  ) {
    this.checkLogin()
  }

  checkLogin() {
    this.afa.authState.subscribe(user => {
      if (user) {
        var uid = user.uid;
        localStorage.setItem('uid', uid);
        this.afs.collection('user_role').doc(uid).get().subscribe(data => {
          var role = data.data().role;
          if (role == 'trainer') {
            this.authTrainerState.next(true)
          } else if (role == 'member') {
            this.authMemberState.next(true)
          }
        })
        // this.afd.database.ref(`users_role/${uid}`).once('value',snap=>{
        //   var role = snap.val();
        //   if(role=='trainer'){
        //     this.authTrainerState.next(true)
        //   }else if(role=='member'){
        //     this.authMemberState.next(true)
        //   }
        // })
      }
    })
  }

  async login(email: string, password: string) {
    const loading = await this.loadingController.create({
      message: 'Login...',
    });
    const toast = await this.toastController.create({
      message: 'Can not login',
      duration: 2000
    });
    await loading.present();
    this.afa.auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result) {
          var uid = result.user.uid;
          this.afd.database.ref(`users_role/${uid}`).once('value', snap => {
            loading.dismiss();
            var role = snap.val();
            if (role == 'trainer') {
              // this.router.navigate(['trainer']);
              this.navCtlr.navigateRoot(['trainer'])
              this.authTrainerState.next(true)
            } else if (role == 'member') {
              // this.router.navigate(['member']);
              this.navCtlr.navigateRoot(['member'])
              this.authMemberState.next(true)
            }
          })
        }
      })
      .catch(error => {
        loading.dismiss();
        toast.present();
      })
  }
  async logout() {
    const loading = await this.loadingController.create({
      message: 'Login...',
    });
    const toast = await this.toastController.create({
      message: 'Can not logout',
      duration: 2000
    });
    await loading.present();
    this.afa.auth.signOut()
      .then(() => {
        loading.dismiss();
        // this.router.navigate(['public']);
        this.navCtlr.navigateRoot(['public'])
      })
      .catch(error => {
        loading.dismiss();
        toast.present();
      })
  }

  checkID(id) {
    console.log(id, id.length)
    if (id.length != 13) {
      console.log('length invalid')
      return false;
    }
    console.log('length ok')
    for (var i = 0, sum = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
    }

    if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12))) {
      console.log('card invalid')
      return false;
    }
    console.log('length ok')
    return true;
  }
  async createUser(email: string, password: string, usertype: string, user: User) {
    const loading = await this.loadingController.create({
      message: 'creating account...',
    });

    await loading.present();
    this.afa.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        var uid = res.user.uid;
        this.afs.collection('user_role').doc(uid).set({ role: usertype })
        this.afs.collection('users_data').doc(uid).set({ ...user, uid: uid, role: usertype })
        this.authTrainerState.next(true)
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentToast("can not create account please try again.")
      })
    // if (this.checkID(user.idcard.toString()) || usertype != 'trainer') {
    //   this.afa.auth.createUserWithEmailAndPassword(email, password)
    //     .then(res => {
    //       var uid = res.user.uid;
    //       this.afs.collection('user_role').doc(uid).set({ role: usertype })
    //       this.afs.collection('users_data').doc(uid).set({ ...user, uid: uid })
    //       loading.dismiss();
    //     }, err => {
    //       loading.dismiss();
    //       this.presentToast("can not create account please try again.")
    //     })
    // } else {
    //   loading.dismiss();
    //   this.presentToast("ID Card invalid.")
    // }

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  isAuthenticatedMember() {
    return this.authMemberState.value;
  }
  isAuthenticatedTrainer() {
    return this.authTrainerState.value;
  }


}
