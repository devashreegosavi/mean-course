import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

    enteredContent = '';
    enteredTitle = '';
    enteredValue = '';
    newPost = 'No Content';
    //@Output() postCreated = new EventEmitter<Post>();
    /*onAddPost(postInput : HTMLTextAreaElement){
        //alert('Post added');
        //console.dir(postInput);
        this.newPost=postInput.value;
    }*/

    constructor(private postsService : PostsService){

    }

    ngOnInit(){
        
    }

    onAddPost(form : NgForm){
        if(form.invalid){
            return;
        }
        //this.newPost = this.enteredValue;
        const post : Post = {
            id : form.value.id,
            title : form.value.title ,
            content : form.value.content
        };
        //this.postCreated.emit(post);
        this.postsService.addPost(form.value.id, form.value.title, form.value.content);
        form.resetForm();
    }
}