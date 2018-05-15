import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Post} from '../post';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  closeResult: string;
  post: Post;
  body: '';
  title: '';
  userId: null;
  postForm: FormGroup;
  userIdarray = [];
  posts: Post[];
  lastId;

  ngOnInit(): void {
    this.getPosts();
    this.postForm = new FormGroup({
      'userId': new FormControl(this.userId, [
        Validators.required
      ]),
      'title': new FormControl(this.title, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'body': new FormControl(this.body, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ])
    });
    this.createIdArray();
  }

  constructor(private modalService: NgbModal, private postService: PostService) {}

  open(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  createIdArray() {
    for (let i = 1; i <= 10; i++) {
      this.userIdarray.push(i);
    }
  }

  onSubmit() {
    this.getLastId();
    this.body = this.postForm.get('body').value;
    this.title = this.postForm.get('title').value;
    this.userId = this.postForm.get('userId').value;
    this.postForm.reset();
    var post = new Post(this.userId, this.lastId + 1, this.title, this.body);
    this.addPost(post);
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  getLastId(): void {
    var post = this.posts[this.posts.length - 1];
    this.lastId = post.id;
  }

  addPost(post: Post): void {
    this.postService.addPost(post);
  }

  resetForm(): void {
    this.postForm.reset();
  }
}
