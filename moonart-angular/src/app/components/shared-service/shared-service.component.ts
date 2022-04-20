import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { getCurrentLanguage, languagePackage } from "src/app/lang/lang";
import { Config } from "src/app/types/config";
import { Identity } from "src/app/types/user";

@Component({
    selector: "app-shared-service",
    templateUrl: "./shared-service.component.html",
    styleUrls: ["./shared-service.component.css"],
})
@Injectable()

/*
  Component to store variables shared between components, that we want to observe
*/
export class SharedService {
    private observableReload = new BehaviorSubject<boolean>(false);
    public statusNotifier$ = this.observableReload.asObservable();
    public languageContext = languagePackage.english; // Initialized in AppComponent

    public defaultConfig = {
        nightMode: false,
        navBarAlwaysOnTop: true,
        scroll: true,
        nsfw: false,
        epilepsy: false,
        color: "zoe",
        lang: 1,
        share: true,
        feed: 15,
    };

    private config = new BehaviorSubject<Config>(
        JSON.parse(localStorage.getItem("config")) || this.defaultConfig
    );
    public identity = {} as Identity;
    public token: String = "";

    needsReload(status: boolean) {
        this.observableReload.next(status);
    }

    get config$() {
        return this.config.asObservable();
    }
}
