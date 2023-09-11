import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private postsUpdates = new Subject<Post[]>();

  constructor(private http : HttpClient) { }

  getPosts(){
    //return [...this.posts];
    this.http.get<{message : string, posts : Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdates.next([...this.posts]);
    });
  }

  getPostUpdateListner(){
    return this.postsUpdates.asObservable();
  }
  
  addPost(id : string, title :string, content : string){
    const post : Post = {id : null, title : title, content : content}
    this.posts.push(post);
    this.postsUpdates.next([...this.posts]);
  }
}
