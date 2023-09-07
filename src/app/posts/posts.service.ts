import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private postsUpdates = new Subject<Post[]>();
  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getPostUpdateListner(){
    return this.postsUpdates.asObservable();
  }
  addPost(title :string, content : string){
    const post : Post = {title : title, content : content}
    this.posts.push(post);
    this.postsUpdates.next([...this.posts]);
  }
}
