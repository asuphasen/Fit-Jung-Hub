import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
  ) {
    this.userCollection = this.afs.collection<User>(`users_data`)
  }

  getProfile(id): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      map(user => {
        user.id = id;
        return user;
      })
    )
  }

  updateProfile(userProfile: User): Promise<void> {
    let userAge = new Date().getFullYear() - new Date(userProfile.birthday).getFullYear()
    return this.userCollection.doc(userProfile.id).update({
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      about: userProfile.about,
      contact: userProfile.contact,
      address: userProfile.address,
      image_url: userProfile.image_url,
      type: userProfile.type,
      food: userProfile.food,
      age: userAge.toString(),
    })
  }

  getUserDataById(id, callback) {
    this.userCollection.doc<User>(id).valueChanges().subscribe(data => {
      callback(data)
    }, err => {
      callback(null)
    })
  }

}
