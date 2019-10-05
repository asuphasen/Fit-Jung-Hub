import { Component, OnInit, Input, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import {Comment,User} from '../../../interface';
@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.page.html',
  styleUrls: ['./trainer-detail.page.scss'],
})
export class TrainerDetailPage implements OnInit {

  @Input() data: User;

  comments: Comment[];
  commentInput: string;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    public ngZone: NgZone,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    console.log("data-------------", this.data)
    this.commentService.getComments(this.data.uid).subscribe(data => {
      console.log(data)
      this.comments = data;
    })
  }

  send() {
    // var uid = localStorage.getItem('uid')
    // this.commentService.sentComment(uid, uid, this.commentInput)
    // this.ngZone.run(() => {
    //   this.commentInput = ""
    // })
    var uid = localStorage.getItem('uid')
    this.commentService.sentComment(uid,this.data.uid,this.commentInput);
    this.commentInput = ""
  }

  back(){
    this.modalCtrl.dismiss()
  }

}
