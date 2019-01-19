import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  };
  isEdit: Boolean = false;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(posts => {
      // console.log(posts);
      this.posts = posts;
    });
  }

  onNewPost(post: Post) {
    this.posts.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post;
    this.isEdit = true;
  }

  onUpdatedPost(post: Post) {
    this.posts.forEach((current, index) => {
      if (post.id === current.id) {
        this.posts.splice(index, 1);
        this.posts.unshift(post);
        this.isEdit  = false;
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        };
      }
    });
  }

  removePost(post: Post) {
    if (confirm('Are You Sure?')) {
      this.postsService.removePost(post.id).subscribe(() => {
        this.posts.forEach((curr, i) => {
          if (post.id === curr.id) {
            this.posts.splice(i, 1);
          }
        });
      });
    }
  }

}
