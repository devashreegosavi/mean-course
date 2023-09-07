import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{

    enteredContent = '';
    enteredTitle = '';
    enteredValue = '';
    newPost = 'No Content';
    @Output() postCreated = new EventEmitter<Post>();
    /*onAddPost(postInput : HTMLTextAreaElement){
        //alert('Post added');
        //console.dir(postInput);
        this.newPost=postInput.value;
    }*/
    onAddPost(form : NgForm){
        if(form.invalid){
            return;
        }
        //this.newPost = this.enteredValue;
        const post : Post = {
            title : form.value.title ,
            content : form.value.content
        };
        this.postCreated.emit(post);
    }
}