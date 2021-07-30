import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { SharedService } from '../../components/shared-service/shared-service.component';

@Component({
  selector: 'likes-component',
  template: `
  <div class="container-images">
    <div class="box grid-col-{{i+1}} pb-5" *ngFor="let image of images; let i = index">
      <div id="image-box">
        <div #imageParent class="image-parent" id="hover-parent">
          <a [routerLink]="['/images', image[0].id]" class="image-wrapper">
            <div class="gradient-mask"></div>
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
            <div class="image-heart" (mouseover)="_imageService.in($event, this, 1);" (mouseleave)="_imageService.out($event, this, 1);" (click)="_imageService.saveInteraction($event, this, 'like');">
            <i class="fas fa-heart"></i>
            </div>
            <img class="image-frame fav" src="assets/img/image-fav-border.png" (mouseover)="_imageService.in($event, this, null);"
              (mouseleave)="_imageService.out($event, this, null);">
            <div class="image-star" (mouseover)="_imageService.in($event, this, 2);" (mouseleave)="_imageService.out($event, this, 2);" (click)="_imageService.saveInteraction($event, this, 'fav');">
            <i class="fas fa-star"></i>
            </div>
            <img class="image-frame share" src="assets/img/image-share-border.png" (mouseover)="_imageService.in($event, this, null);"
              (mouseleave)="_imageService.out($event, this, null);">
            <div class="image-arrows" (mouseover)="_imageService.in($event,this, 3);" (mouseleave)="_imageService.out($event, this, 3);" (click)="_imageService.saveInteraction($event, this, 'share');">
            <i class="fas fa-retweet"></i>
            </div>
          </div>
        </div>
        <!-- <img src="../api-rest-symfony/public/storage/images/image-example.jpg" class="image-element"> -->
      </div>
    </div>
  </div>

  <nav aria-label="Page navigation example">
  <ul class="pagination profile-pagination float-right">
    <li *ngIf="page != 1 && totalPages > 1">
      <a class="page-link" (click)="goToPage('--')">Anterior</a>
    </li>
    <li *ngFor="let num of numberPages; let i = index">
      <a class="page-link" *ngIf="i<5" (click)="goToPage(num)" [ngClass]="{'active': num == page}">{{num}}</a>
      <!-- Cambiar para que si p.e estás en la pág 20, salga 18 - 19 - 20 - 21 - 22 -->
    </li>
    <li *ngIf="page != totalPages && totalPages > 1">
      <!--  && totalPages > 1 -->
      <a class="page-link" (click)="goToPage('++')">Siguiente</a>
    </li>
  </ul>
  </nav>
  `,
  // styleUrls: ['./home.component.css'],
  providers: [UserService, ImageService, CommonService]
})
export class LikesComponent implements OnInit {

  public pageTitle: string;
  public identity: any;
  public token: string;
  public images: Array<Object> = [];
  public estado: boolean;
  public page: number = 1;
  public nextPage: number;
  public prevPage: number;
  public numberPages: number;
  public totalPages: number;
  public nightMode: boolean = false;
  public nsfw: boolean = true;
  public epilepsy: boolean = true;
  public scroll: boolean = true;
  public isLast: boolean = false;
  public loaded: boolean = false;
  @Input() public username: any;
  public id: string;
  public url: string;
  public interaction: string = "liked";

  constructor(
    private _sharedService: SharedService,
    private _userService: UserService,
    private _imageService: ImageService,
    private _commonService: CommonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private render: Renderer2
  ) {
  }

  ngOnInit() {
    this._sharedService.changeVar.subscribe(value => {
      if (value === true) {
        this._sharedService.needsReload(false);
        // this.ngOnInit();
      }
    });

    this.loadUser();
    this._userService.userInfo(this, this.username);
    this._route.params.subscribe(params => {

      if (!this.page) {
        this.page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }

      if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
        this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
        this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
        this.scroll = JSON.parse(localStorage.getItem("config")).scroll;
      }
    });

    this._userService.getUserByNick(this.username).subscribe(
      response => {
        // console.log(response);
        this.id = response.user_info.id;
        this.getLikedPics();
      },
      error => {
        console.log(error);
      }
    );
  }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event: Event) { // Copied from home.component.ts -> If possible, make this a common function of image.service.ts

    var d = document.documentElement;
    var zoom = 1; // Establecido en CSS
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight * zoom;

    // console.log('offset = ' + offset);
    // console.log('height = ' + height);

    if (offset >= (height - 5) && this.isLast == false && this.loaded == true) { // 5 is the margin of error
      this.loaded = false; // Checker so it doesn't skip more than one page
      this.page = this.page ? this.page : 1;

      this.page++;
      this.getLikedPics();
    }
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.identity == null) {
      this.identity = {
        id: 0,
        nick: 'guest'
      };
    }
  }

  getLikedPics() {
    this._imageService.showProfileInteractions(this, this.page);
  }

  goToPage(param) {
    if (param == "++") {
      this.page++;
    }
    else if (param == "--") {
      this.page--;
    }
    else {
      this.page = param;
    }
    this.ngOnInit();
  }
}