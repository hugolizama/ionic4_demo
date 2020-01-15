import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiKiuvoxService {

  private urlApiBase = 'http://kiuvox.com/wp-json';
  private urlApi = `${this.urlApiBase}/wp/v2`;
  private dataPost: Post[] = [];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }

  getPosts() {
    const url = `${this.urlApi}/posts?_embed`;

    return this.http.get(url, {headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          const posts: Post[] = [];

          for (const post of resp) {
            const tmpPost = {
              id: post.id,
              titulo: post.title.rendered,
              imagen_pequena: post._embedded['wp:featuredmedia']['0'].media_details.sizes.featured.source_url,              
              contenido: post.content.rendered,
              resumen: post.excerpt.rendered
            };

            posts.push(tmpPost);
          }

          return posts;
        })
      );
  }


  setDataPost(id: number, post: Post) {
    this.dataPost[id] = post;
  }

  getDataPost(id: number) {
    return this.dataPost[id];
  }
}
