import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input() post: Post;
  comments: Comment[];

  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    this.getPost();
    this.getComments();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

  getComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getComments(id)
      .subscribe(comments => this.comments = comments);
  }
}
