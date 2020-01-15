import { Component, OnInit } from '@angular/core';
import { ApiKiuvoxService } from '../../services/api-kiuvox.service';
import { Post } from '../../interfaces/post.interface';
import { NavController, LoadingController  } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  cargando: any;
  posts: Post[] = [];

  constructor(public navCtrl: NavController, public loadingController: LoadingController, private apiKiuvox: ApiKiuvoxService) {
    this.mostrarCargando();
    this.getPosts();
  }

  ngOnInit() {
  }

  async mostrarCargando() {
    this.cargando = await this.loadingController.create({
      message: 'Cargando...',
      duration: 0,
      spinner: 'crescent'
    });

    this.cargando.present();
  }

  getPosts() {
    this.apiKiuvox.getPosts()
      .subscribe((resp: Post[]) => {
        this.posts = resp;
        // console.log(resp);

        this.cargando.dismiss();
      });
  }

  verPost(id: number, post: Post) {
    this.apiKiuvox.setDataPost(id, post);

    const navigationOptions: NavigationOptions = {
      queryParams: {
        id: post.id
      },
      animated: true,
      animationDirection: 'forward'
    };

    this.navCtrl.navigateForward('ver-post', navigationOptions);
  }

}
