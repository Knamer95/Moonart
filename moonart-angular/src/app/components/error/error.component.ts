import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [UserService, ImageService, CommonService]
})
export class ErrorComponent implements OnInit {

  public pageTitle: string = "Error";
  public identity: any;
  public token: string;
  public nightMode: boolean;
  public language: Object;
  public lang: number;
  public currentLang: any;

  constructor(
    private _userService: UserService,
    private _imageService: ImageService,
    private _commonService: CommonService
  ) {
    this.pageTitle = "Error";
  }

  ngOnInit() {
    document.title = this.pageTitle;
    
    this.loadUser();
    // if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
    this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
    this._commonService.changeNightModeAttr(this.nightMode);
    // }
    this.lang = JSON.parse(localStorage.getItem("config")).lang;
    this.currentLang = this.getLang(this.lang);
    this._commonService.changeLangAttr(this.lang);
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

  getLang(lang) {
    this.language = [
      {
        lang: "english",
        attributes: {
          title: "Error",
          wrongLinkTitle: "The page you are trying to access does not exist",
          wrongLinkBody: "If you think this is an error, please contact us at sistemas@moonart.com",
          goBack: "Back to home"
        }
      },

      {
        lang: "spanish",
        attributes: {
          title: "Error",
          wrongLinkTitle: "La página a la que intentas acceder no existe",
          wrongLinkBody: "Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com",
          goBack: "Volver al inicio"
        }
      }
    ];
    return this.language[(lang - 1)];
  }
}
