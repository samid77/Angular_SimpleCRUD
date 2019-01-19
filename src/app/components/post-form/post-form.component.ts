import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  // post: Post;
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post;
  @Input() isEdit: Boolean;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  addPost(title, body) {
    if (!title || !body) {
      alert('Please add post');
    } else {
      this.postsService.savePost({title, body} as Post).subscribe(post => {
        // console.log(post);
        this.newPost.emit(post);
      });
    }
  }

  updatePost() {
    this.postsService.updatePost(this.currentPost).subscribe(post => {
      console.log(post);
      this.isEdit = false;
      this.updatedPost.emit(post);
    });
  }

}
