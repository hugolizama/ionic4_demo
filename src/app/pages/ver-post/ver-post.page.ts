import { Component, OnInit } from '@angular/core';
import { ApiKiuvoxService } from '../../services/api-kiuvox.service';
import { Post } from '../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.page.html',
  styleUrls: ['./ver-post.page.scss'],
})
export class VerPostPage implements OnInit {

  post: Post;
  id: number;

  constructor(private route: ActivatedRoute, private apiKiuvox: ApiKiuvoxService) {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      console.log(this.id);

      this.post = this.apiKiuvox.getDataPost(this.id);
      console.log(this.post);
    });


  }

  ngOnInit() {
  }

}
