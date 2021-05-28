import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    language: string = 'en';

    constructor(private spinner: NgxSpinnerService, private translateService: TranslateService,) { }

    getLanguage() {
        this.language = this.translateService.getDefaultLang();
        console.log(this.language);
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
            return "/assets/images/flag-usa.svg";
        }
        else {
            return "/assets/images/flag-italy.svg";
        }
    }
}
