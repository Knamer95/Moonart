import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
    defaultLanguage,
    getCurrentLanguage,
    languagePackage,
} from "src/app/lang/lang";
import { Config, Languages, LanguageStructItem } from "src/app/types/config";
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

    public langName = getCurrentLanguage(this.config.lang).name; // Initialized in AppComponent
    public languageContext = languagePackage[this.langName]; // Initialized in AppComponent

    public configSubject = new BehaviorSubject<{
        config: Config;
        languageContext: LanguageStructItem;
        langName: Languages;
    }>({
        config: this.config,
        languageContext: languagePackage[this.langName],
        langName: this.langName,
    }); // Not in use

    public identity = {} as Identity;
    public token: String = "";
    public title = "";

    updateConfig(config: Config) {
        this.langName = getCurrentLanguage(config.lang || defaultLanguage).name;
        this.config = config;
        this.configSubject.next({
            config: this.config,
            languageContext: languagePackage[this.langName],
            langName: this.langName,
        });
    }

    needsReload(status: boolean) {
        this.observableReload.next(status);
    }

    // /*
    // Not in use
    // configObserver = () =>
    // */

    setTitle(title) {
        this.title = title;
        document.title = this.title;
    }
}
