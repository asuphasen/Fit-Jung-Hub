import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Platform, ToastController, LoadingController, ActionSheetController, AlertController, NavController, ModalController } from '@ionic/angular';
import { MapPage } from '../map/map.page';
import { LatLng } from '@ionic-native/google-maps';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';


import {User,UserInit} from '../../interface'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User = UserInit;
  isModal = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navCtlr: NavController,
    public modalController: ModalController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private FireStorage: AngularFireStorage,
    private alertController: AlertController,
    private geolocation: Geolocation,
    private http: HttpClient,
  ) {

  }


  ngOnInit() {
    var uid = localStorage.getItem('uid')
    this.userService.getProfile(uid).subscribe(user => {
      this.user = user;
    })
  }

  onChangeTime(e) {
    console.log(e)
  }

  save() {
    this.userService.updateProfile(this.user).then(() => {
      console.log(this.user.address.location.location)
      if (this.user.address.location.location.lat && this.user.address.location.location.lng) {
        this.saveLocation(this.user.address.location.location.lat, this.user.address.location.location.lng);
      }
      this.showToast("Saved")
    }, err => {
      this.showToast("Can not save please try again.")
    })
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async openmap() {
    this.geolocation.getCurrentPosition()
      .then(resp => {
        console.log(resp.coords.latitude, resp.coords.longitude)
        let loc: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
        this.getPlaces(loc)
      })
      .catch(error => {
        console.log(error)
      })
  }

  saveLocation(latitude, longitude) {
    let uid = localStorage.getItem('uid')
    const firestore = firebase.firestore();
    const geofirestore: GeoFirestore = new GeoFirestore(firestore);
    const geocollection: GeoCollectionReference = geofirestore.collection('trainer_location');
    geocollection.doc(uid).set({
      name: uid,
      score: 100,
      coordinates: new firebase.firestore.GeoPoint(latitude, longitude)
    }).then(val => {
      console.log('Save location success', val)
    }).catch(err => {
      console.log('Save location error!!!', err)
    })
  }

  getPlaces(loc: LatLng) {
    var apiUrl = 'http://mongkail.com:8200/api/v1/maps/place';
    var query = `${loc.lat},${loc.lng}`;
    var url = `${apiUrl}?query=${query}&language=th&key=${environment.googleConfig.apiKey}`;
    console.log(url)
    this.http
      .get(url)
      .subscribe((data: any) => {
        if (data.status == "OK") {
          try {
            if (data.results[0]) {
              console.log(data.results[0])
              this.user.address.name = data.results[0].formatted_address;
              this.user.address.location = data.results[0].geometry
            }
          } catch (error) {
            console.log(error)
          }
        } else {

        }
      }, error => {
        console.log(error)
      })
  }


  private alertMessage: string = '';

  async toCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selete',
      mode: 'ios',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            console.log('Take picture');
            this.takePicture(1);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            console.log('Gallery');
            this.takePicture(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Upload image',
      message: this.alertMessage,
      buttons: ['Close'],
      mode: 'ios'
    });
    await alert.present();
  }

  takePicture(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    }


    this.camera.getPicture(options).then(async (imageData) => {
      const loading = await this.loadingController.create({
        spinner: "bubbles",
        cssClass: "loading",
        mode: 'ios'
      });
      await loading.present();

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      const ref = this.FireStorage.storage.ref('images/' + localStorage.getItem('uid') + '/' + Date.now() + '.jpg');
      const uploadTask = ref.putString(base64Image, 'data_url');
      uploadTask.on('state_changed', snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload ${progress}%`);
      }, error => {
        this.alertMessage = 'Upload image fail!.';
        this.presentAlert();
        loading.dismiss();
        console.log('Upload image : Data error! :', error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            console.log('File available at', downloadURL);
            this.user.image_url = downloadURL;
            this.userService.updateProfile(this.user).then(() => {
              this.showToast("Saved")
            }, err => {
              this.showToast("Can not save please try again.")
            })
            loading.dismiss();
            // this.firebase.database.ref('images').push(jsonData).then(() => {
            //   this.alertMessage = 'Upload image success.';
            //   this.presentAlert();
            //   loading.dismiss();
            //   console.log('Upload image : Upload image success.');
            // }).catch(err => {
            //   this.alertMessage = 'Upload image url fail!.';
            //   this.presentAlert();
            //   loading.dismiss();
            //   console.log('Upload image : Data error! :', err);
            // })
          })
          .catch(error => {
            this.alertMessage = 'Get image url fail!.';
            this.presentAlert();
            loading.dismiss();
            console.log('Get image url fail! :', error);
          })
      })
    })
  }

  toGallery() {
    this.router.navigate(['gallery']);
  }

}
