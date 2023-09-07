import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
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
    onAddPost(){
        //this.newPost = this.enteredValue;
        const post : Post = {
            title : this.enteredTitle ,
            content : this.enteredContent
        };
        this.postCreated.emit(post);
    }
}