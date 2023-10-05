import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
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
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
    posts : Post[] = [];
  private postsSub : Subscription;
  constructor(private postsService : PostsService){

  }

  ngOnInit() {
    this.isLoading= true;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListner().subscribe((postData : {posts : Post[], postCount : number})=>{
      this.isLoading= false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId : string){
    this.isLoading = true;
    console.log(postId);
    this.postsService.deletePost(postId).subscribe(()=>{
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData : PageEvent){
    this.isLoading = true;
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }
}
