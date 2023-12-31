import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimetype } from "./mime-type.validator";
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
    form : FormGroup;
    imagePreview : any;
    //@Output() postCreated = new EventEmitter<Post>();
    /*onAddPost(postInput : HTMLTextAreaElement){
        //alert('Post added');
        //console.dir(postInput);
        this.newPost=postInput.value;
    }*/

    constructor(private postsService : PostsService, public route : ActivatedRoute){

    }

    ngOnInit(){
        this.form = new FormGroup({
            'title' : new FormControl(null, {
                validators : [Validators.required, Validators.minLength(3)]
            }),
            'content' : new FormControl(null, {
                validators : [Validators.required]
            }),
            'image' : new FormControl(null, {
                validators : [Validators.required],
                asyncValidators : [mimetype]
            })
        });
        this.route.paramMap.subscribe((paramMap : ParamMap)=>{
            if(paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id, 
                        title : postData.title, 
                        content : postData.content,
                        imagePath : postData.imagePath,
                        creator : postData.creator
                    };
                    this.form.setValue({
                        title : this.post.title, 
                        content : this.post.content,
                        image : this.post.imagePath
                    });
                });
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(){
        if(this.form.invalid){
            return;
        }
        this.isLoading = true;
        //this.newPost = this.enteredValue;
        const post : Post = {
            id : this.form.value.id,
            title : this.form.value.title ,
            content : this.form.value.content,
            imagePath : this.form.value.image,
            creator : null
        };
        if(this.mode === 'create'){
            this.postsService.addPost(this.form.value.id, this.form.value.title, this.form.value.content, this.form.value.image);
        }
        else{
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image)
        }
        //this.postCreated.emit(post);
        
        this.form.reset();
    }

    onImagePicked(event : Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image : file});
        this.form.get('image').updateValueAndValidity();
        //console.log(file);
        //console.log(this.form);
        const reader = new FileReader();
        reader.onload = () =>{
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }
}