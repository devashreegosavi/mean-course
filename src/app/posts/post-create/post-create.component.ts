import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
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
    private mode = 'create';
    private postId : string;
    public post : Post;
    isLoading = false;
    //@Output() postCreated = new EventEmitter<Post>();
    /*onAddPost(postInput : HTMLTextAreaElement){
        //alert('Post added');
        //console.dir(postInput);
        this.newPost=postInput.value;
    }*/

    constructor(private postsService : PostsService, public route : ActivatedRoute){

    }

    ngOnInit(){
        this.route.paramMap.subscribe((paramMap : ParamMap)=>{
            if(paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title : postData.title, content : postData.content};
                });
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(form : NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading = true;
        //this.newPost = this.enteredValue;
        const post : Post = {
            id : form.value.id,
            title : form.value.title ,
            content : form.value.content
        };
        if(this.mode === 'create'){
            this.postsService.addPost(form.value.id, form.value.title, form.value.content);
        }
        else{
            this.postsService.updatePost(this.postId, form.value.title, form.value.content)
        }
        //this.postCreated.emit(post);
        
        form.resetForm();
    }
}