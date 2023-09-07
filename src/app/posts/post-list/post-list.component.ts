import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  /*posts = [
    {title : 'First Posts', content : 'This is first post content'},
    {title : 'Second Posts', content : 'This is Second post content'},
    {title : 'Third Posts', content : 'This is Third post content'}
  ];*/

  @Input() posts : Post[] = [];

}
