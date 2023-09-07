import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title : 'First Posts', content : 'This is first post content'},
    {title : 'Second Posts', content : 'This is Second post content'},
    {title : 'Third Posts', content : 'This is Third post content'}
  ];*/

  //@Input() posts : Post[] = [];
    posts : Post[] = [];
  private postsSub : Subscription;
  constructor(private postsService : PostsService){

  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListner().subscribe((posts : Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
