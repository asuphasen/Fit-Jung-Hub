import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TrainerDetailPage } from './trainer-detail/trainer-detail.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.page.html',
  styleUrls: ['./trainer-list.page.scss'],
})
export class TrainerListPage implements OnInit {

  data;

  constructor(private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private userservice: UserService
  ) { }

  ngOnInit() {

    this.geolocation.getCurrentPosition()
    .then(resp => {
      console.log(resp.coords.latitude, resp.coords.longitude)
      const firestore = firebase.firestore();
      const geofirestore: GeoFirestore = new GeoFirestore(firestore);
      const geocollection: GeoCollectionReference = geofirestore.collection('trainer_location');
      const query: GeoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(resp.coords.latitude, resp.coords.longitude), radius: 100 });
      query.get().then((value: GeoQuerySnapshot) => {
        let listOfuser = value.docs.map(data => {
          return this.getTrainerData(data.id)
        })
        Promise.all(listOfuser).then(data => {
          this.data = data
        })
          .catch(err => {
            console.log("Get trainer data error!")
          })
      });
    })
    .catch(error => {
      console.log(error)
    })

    // this.getID().subscribe(data => {
    //   console.log(data)
    //   this.data = data
    // })
  }

  getTrainerData(uid) {
    return new Promise((resolve, reject) => {
      try {
        this.userservice.getUserDataById(uid, data => {
          resolve(data)
        })
      } catch (error) {
        resolve(null)
      }
    })
  }

  intersection(array1, array2) {
    console.log(array1, array2)

    if (typeof (array1) != 'object' && typeof (array2) != 'object') {
      let arr1 = []
      arr1.push(array1)
      let arr2 = []
      arr2.push(array2)
      return arr1.filter(value => -1 !== arr2.indexOf(value)).length ? true : false;
    }
    else if (typeof (array1) != 'object') {
      let arr1 = []
      arr1.push(array1)
      return arr1.filter(value => -1 !== array2.indexOf(value)).length ? true : false;
    }
    else if (typeof (array2) != 'object') {
      let arr2 = []
      arr2.push(array2)
      return array1.filter(value => -1 !== arr2.indexOf(value)).length ? true : false;
    }
    else {
      return array1.filter(value => -1 !== array2.indexOf(value)).length ? true : false;
    }
  }

  async gotoFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      // componentProps: { data: this.data },
    });
    modal.onDidDismiss().then((data) => {
      console.log("data return range km", data.data.data)
      let filterData = data.data.data
      if (filterData.range_km) {
        this.geolocation.getCurrentPosition()
          .then(resp => {
            console.log(resp.coords.latitude, resp.coords.longitude)
            const firestore = firebase.firestore();
            const geofirestore: GeoFirestore = new GeoFirestore(firestore);
            const geocollection: GeoCollectionReference = geofirestore.collection('trainer_location');
            const query: GeoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(resp.coords.latitude, resp.coords.longitude), radius: data.data.data.range_km });
            query.get().then((value: GeoQuerySnapshot) => {
              let listOfuser = value.docs.map(data => {
                return this.getTrainerData(data.id)
              })
              Promise.all(listOfuser).then(data => {
                console.log('data--->', data)
                let tragetTrainer = data.filter((trainer:any) => {
                
                  if (this.intersection(trainer['food'], filterData.food) &&
                    this.intersection(trainer['type'], filterData.tpye) &&
                    trainer['sex'] == filterData.sex &&
                    parseInt(trainer['age']) >= filterData.age.lower && parseInt(trainer['age']) <= filterData.age.upper) {
                    console.log('Is math', trainer, filterData)
                    return true
                  }
                  else {
                    console.log('Isn math', trainer, filterData)
                    return false
                  }
                })
                console.log('-----*', tragetTrainer)
                this.data = tragetTrainer
              })
                .catch(err => {
                  console.log("Get trainer data error!")
                })
            });
          })
          .catch(error => {
            console.log(error)
          })
      }
      else {
        console.log('Place push all filter list')
      }
    }).catch(err => {
      console.log(err)
    })
    return await modal.present();
  }

  getID(): Observable<any> {
    return this.afs.collection<any>('users_data').valueChanges();
  }

  async gotoDetail(data) {
    const modal = await this.modalCtrl.create({
      component: TrainerDetailPage,
      componentProps: { data: data },
    });

    return await modal.present();
  }
}
