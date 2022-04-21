import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { defaultLanguage, getCurrentLanguage, languagePackage } from "src/app/lang/lang";
import { Config } from "src/app/types/config";
import { Identity } from "src/app/types/user";

@Component({
    selector: "app-shared-service",
    templateUrl: "./shared-service.component.html",
    styleUrls: ["./shared-service.component.css"],
})
@Injectable()

/*
  Component to store variables shared between components
*/
export class SharedService {
    private observableReload = new BehaviorSubject<boolean>(false);
    public statusNotifier$ = this.observableReload.asObservable();

    public defaultConfig: Config = {
        nightMode: false,
        navBarAlwaysOnTop: true,
        scroll: true, // If true, shows galleries as scroll. Otherwise it shows them paginated
        nsfw: false,
        epilepsy: false,
        color: "zoe",
        lang: 1,
        share: true,
        feed: 15,
    };

    public config: Config =
        JSON.parse(localStorage.getItem("config")) || this.defaultConfig;
    // private config$ = new BehaviorSubject<Config>(this.config); // Not in use
    public lang = getCurrentLanguage(this.config.lang).id; // Initialized in AppComponent
    public languageContext = languagePackage[this.lang]; // Initialized in AppComponent

    public identity = {} as Identity;
    public token: String = "";
    public title = "";

    updateConfig(config: Config) {
        this.lang = getCurrentLanguage(config.lang || defaultLanguage).id;
        this.config = config;
        console.log("---", {
            lang: this.lang,
            config: this.config,
            languageContext: this.languageContext,
        });
    }

    needsReload(status: boolean) {
        this.observableReload.next(status);
    }

    /*
    // Not in use
    configObserver() {
        const langMapper = ["english", "spanish"];
        return this.config$.asObservable();
    }
    */

    setTitle(title) {
        this.title = title;
        document.title = this.title;
    }
}
