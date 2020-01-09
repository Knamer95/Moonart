import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'favs-component',
  template: `
  <div class="container-images">
    <div class="box grid-col-{{i+1}} pb-5" *ngFor="let image of images; let i = index">
      <div id="image-box">
        <div #imageParent class="image-parent" id="hover-parent">
          <a [routerLink]="['/images', image[0].id]">
            <img src="assets/public/{{image[0].url}}" class="image-element" id="id-{{image[0].id}}" (mouseleave)="_imageService.out($event, this, null);">
          </a>
          <span class="image-description">
            {{image[0].name}}
            <br>
            <span class="image-by">
              by <span class="image-user">{{image.username}}</span>
            </span>
          </span>
          <div class="image-action" *ngIf="identity && identity.nick != 'guest'">
            <img class="image-frame like" src="assets/img/image-like-border.png" (mouseover)="_imageService.in($event, this, null);"
              (mouseleave)="_imageService.out($event, this, null);">
            <div class="image-heart" (mouseover)="_imageService.in($event, this, 1);" (mouseleave)="_imageService.out($event, this, 1);" (click)="_imageService.saveInteraction($event, this, 'like');"></div>
            <img class="image-frame fav" src="assets/img/image-fav-border.png" (mouseover)="_imageService.in($event, this, null);"
              (mouseleave)="_imageService.out($event, this, null);">
            <div class="image-star" (mouseover)="_imageService.in($event, this, 2);" (mouseleave)="_imageService.out($event, this, 2);" (click)="_imageService.saveInteraction($event, this, 'fav');"></div>
            <img class="image-frame share" src="assets/img/image-share-border.png" (mouseover)="_imageService.in($event, this, null);"
              (mouseleave)="_imageService.out($event, this, null);">
            <div class="image-arrows" (mouseover)="_imageService.in($event,this, 3);" (mouseleave)="_imageService.out($event, this, 3);" (click)="_imageService.saveInteraction($event, this, 'share');"></div>
          </div>
        </div>
        <!-- <img src="../api-rest-symfony/public/storage/images/image-example.jpg" class="image-element"> -->
      </div>
    </div>
  </div>
  
  <nav aria-label="Page navigation example">
  <ul class="pagination profile-pagination float-right">
    <li *ngIf="page != 1 && total_pages > 1">
      <a class="page-link" (click)="nextPage('--')">Anterior</a>
    </li>
    <li *ngFor="let num of number_pages; let i = index">
      <a class="page-link" *ngIf="i<5" (click)="nextPage(num)" [ngClass]="{'active': num == page}">{{num}}</a>
      <!-- Cambiar para que si p.e estás en la pág 20, salga 18 - 19 - 20 - 21 - 22 -->
    </li>
    <li *ngIf="page != total_pages && total_pages > 1">
      <!--  && total_pages > 1 -->
      <a class="page-link" (click)="nextPage('++')">Siguiente</a>
    </li>
  </ul>
  </nav>
  `,
  // styleUrls: ['./home.component.css'],
  providers: [UserService, ImageService, CommonService]
})
export class FavsComponent implements OnInit {

  public page_title: string;
  public identity;            // User logueado
  public token;
  public images;
  public estado;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public total_pages;
  public nightMode;
  public arrayNightMode;
  public nsfw;
  public epilepsy;
  public username;            // Username es el user de la página
  public id;
  public url;
  public interaction;

  constructor(
    private _userService: UserService,
    private _imageService: ImageService,
    private _commonService: CommonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private render: Renderer2
  ) {
    this.username = window.location.href.split("/");
    for (let i = 0; i < this.username.length; i++) {
      if (this.username[i] == "profile" && (i + 1) < this.username.length) {
        this.username = this.username[i + 1];
      }
    }
    this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    this.interaction = "faved";
    this.page = 1;
  }

  ngOnInit() {
    this.loadUser();

    this._userService.userInfo(this, this.username);
    this._route.params.subscribe(params => {

      if (!this.page) {
        this.page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
        this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
        this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
      }
    });

    this._userService.getUserByNick(this.username).subscribe(
      response => {
        console.log(response);
        this.id = response.user_info.id;
        this.getLikedPics();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getLikedPics() {
    if (this.username != this.identity.nick) {
      this._imageService.showProfileInteractions(this, this.page, this.nsfw, this.epilepsy, this.id, this.interaction, this.username);
    }

    else {
      this._imageService.showProfileInteractions(this, this.page, "true", "true", this.id, this.interaction, this.username);
    }
  }

  nextPage(param){
    if (param == "++"){
      this.page++;
    }
    else if (param == "--"){
      this.page--;
    }
    else{
      this.page = param;
    }
    this.ngOnInit();
  }
}