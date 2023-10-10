import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private postsUpdates = new Subject<{posts : Post[], postCount : number}>();

  constructor(private http : HttpClient, private router : Router) { }

  getPosts(postsPerPage : number, currentPage : number){
    //return [...this.posts];
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message : string, posts : any, maxPosts : number}>('http://localhost:3000/api/posts' + queryParams)
    .pipe(map((postData) => {
        return { posts : postData.posts.map(post =>{
          return {
            title : post.title,
            content : post.content,
            id : post._id,
            imagePath : post.imagePath,
            creator : post.creator
          };
        }),
        maxPosts : postData.maxPosts  
      };
    }))
    .subscribe((transformedPostData) => {
        console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdates.next({posts : [...this.posts], postCount : transformedPostData.maxPosts});
    });
  }

  getPostUpdateListner(){
    return this.postsUpdates.asObservable();
  }
  
  addPost(id : string, title :string, content : string, image : File){
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image, title);
    //const post : Post = {id : null, title : title, content : content};
    //this.http.post<{message : string, postId : string }>('http://localhost:3000/api/posts',post)
    this.http.post<{message : string, post : Post }>('http://localhost:3000/api/posts',postData)
    .subscribe((responseData) => {
      
      /*const post : Post = {
        id : responseData.post.id,
        title : title,
        content : content,
        imagePath : responseData.post.imagePath
      };*/
      //console.log(responseData.message);
      //const id = responseData.postId;
      //post.id=id;
      /*this.posts.push(post);
      this.postsUpdates.next([...this.posts]);*/
      this.router.navigate(["/"]);
    });
    
  }

  updatePost(id: string, title : string, content : string, image : File | String | any){
    /*const post : Post = { 
      id: id,
      title : title,
      content : content,
      imagePath : null
    };*/

    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("content",content);
      postData.append("image",image, title);
    }else{
        postData = {
        id : id,
        title : title,
        content : content,
        imagePath : image,
        creator : null
      };
    }
    this.http.put("http://localhost:3000/api/posts/"+ id, postData)
    .subscribe(response => {
      //console.log(response);
      /*const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post : Post = {
        id : id,
        title : title,
        content : content,
        imagePath : ""
      }
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdates.next([...this.posts]);*/
      this.router.navigate(["/"]);
    });
  }
  getPost(id:string){
    //return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id:string, title:string, content : string, imagePath : string, creator : string}>("http://localhost:3000/api/posts/"+ id);
  }
  
  deletePost(postId : string){
    return this.http.delete("http://localhost:3000/api/posts/"+ postId);
    /*.subscribe(() =>{
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdates.next([...this.posts]);
      console.log("Deleted!");
    });*/
  }
}
