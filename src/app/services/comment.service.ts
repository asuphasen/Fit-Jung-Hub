import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, mergeMap, combineLatest, switchMap } from 'rxjs/operators';
import { uniq, flatten } from 'lodash';
import {Comment} from '../interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) { }

  getComments(uid): Observable<Comment[]> {
    return this.afs.collection<Comment>('comments',ref=>ref.where("trainerid","==",uid).orderBy('timestamp')).valueChanges()
  }

  sentComment(uid, trainerId, comment) {
    console.log(comment)
    var data = {
      comment: comment,
      date: new Date().toDateString(),
      trainerid: trainerId,
      username: "Grest",
      timestamp:firebase.firestore.Timestamp.now()
    }
    
    let userCollection = this.afs.collection('users_data').doc(uid);
    userCollection.get().subscribe((user:any)=>{
      
      data.username = user.data().firstname+" "+user.data().lastname;
      this.afs.collection('comments').add(data);
    })
  }
}
