import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    language: string = 'en';

    constructor(private translateService: TranslateService,) { }

    getLanguage() {
        this.language = this.translateService.getDefaultLang();
        return this.language;
    }

    setLanguage(val: string) {
        this.translateService.use(val);
        this.language = val;
    }

    toggleLanguage() {
        this.language == 'en' ? this.setLanguage('it') : this.setLanguage('en')
    }

    getFlag() {
        if (this.language == 'en') {
            return "/assets/icons/flag-usa.svg";
        }
        else {
            return "/assets/icons/flag-italy.svg";
        }
    }
}
