import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../model/post';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  post: Post = {
    _id: '',
    title: '',
    content: '',
    username: ''
  }
  _id: string = '';
  title: string = '';
  content: string = '';
  username: string = '';

  allPosts: Post[] = [];
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this._id = '';
    this.title = '';
    this.content = '';
    this.username = '';
    this.getAllPost();
  }

  getAllPost() {
    this.api.getAllPosts().subscribe(res => {
      this.allPosts = res;
    }, err => {
      console.log(err)
    })
  }

  getPostById(post: Post) {
    this.api.getPostById(post._id).subscribe(res => {
      post = res;
    }, err => {
      console.log(err)
    })
  }

  deletePostData(post: Post) {
    if (window.confirm('Are you sure want to delete this data id:' + post._id)) {
      this.api.deletePost(post._id).subscribe(() => {
        this.allPosts = this.allPosts.filter(p => p._id !== post._id);
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
    }
  }

  createPostData() {
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    this.api.createPost(this.post).subscribe(res => {
      this.allPosts = [];
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  editPost(post: Post) {
    this.getPostById(post);
    this._id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.username = post.username
  }

  updatePost() {
    if (this.title == '' || this.content == '' || this.username == '') {
      alert('Please fill all the Values on fields');
      return;
    }
    this.post._id = this._id;
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    this.api.updatePost(this.post).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }
}
