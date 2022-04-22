import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    HostListener,
    HostBinding,
    Renderer2,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { ImageService } from "../../services/image.service";
import { CommonService } from "../../services/common.service";
import { ActivatedRoute } from "@angular/router";
import { emitterTypes } from "../../models/struct";
import { SharedService } from "../../components/shared-service/shared-service.component";
import { Identity } from "src/app/types/user";
import { Image } from "src/app/types/image";
import { Config } from "src/app/types/config";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [UserService, ImageService, CommonService],
})
export class HomeComponent implements OnInit {
    @HostBinding("attr.listener") listener = "idle"; // To add attribute listener to the main element (<app-home />)

    public identity: Identity;
    public config: Config;
    public lang: { [key: string]: string | null };

    public token: string;
    public images: Image[] = [];
    public status: boolean;
    public page: number = 1;
    public hasElements: boolean = true;
    public nextPage: number;
    public prevPage: number;
    public numberPages: number;
    public totalPages: number;
    public isLast: boolean = false;
    public loaded: boolean = false;
    public imagError: number = 0;

    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private render: Renderer2
    ) {}

    ngOnInit() {
        this._sharedService.statusNotifier$.subscribe((value) => {
            if (value) {
                this._sharedService.needsReload(false);
                // this.ngOnInit();
            }
        });

        this._sharedService.configSubject.subscribe(
            ({ config, languageContext }) => {
                this.config = config;
                this.lang = languageContext.home;
                this._sharedService.setTitle(this.lang.title);
            }
        );


        this.hasElements = true; // If false or unset, it will show the message of no elements found until the AJAX call is done

        this.pageImages();
        this.loadUser();
    }

    @HostListener("window:scroll", ["$event"])
    doSomethingOnWindowsScroll($event: Event) {
        // Event to fire new items on scroll down

        var d = document.documentElement;
        var zoom = 1; // Establecido en CSS
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight * zoom;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (
            offset >= height - 5 &&
            this.isLast == false &&
            this.loaded == true
        ) {
            // 5 is the margin of error
            this.loaded = false; // Checker so it doesn't skip more than one page in a row
            this.page = this.page ? this.page : 1;

            this.page++;
            this.pageImages();
        }
    }

    ngDoCheck() {
        // this.loadUser();
    }

    pageImages() {
        this._route.params.subscribe((params) => {
            if (!this.config.scroll) {
                this.page = +params["page"];

                if (!this.page) {
                    this.page = 1;
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
            }

            this._imageService.showAllImages(
                this,
                this.page,
                this.config.scroll,
                true,
                null
            );
        });
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    onEmited(emit) {
        console.log(emit);
    }
}
