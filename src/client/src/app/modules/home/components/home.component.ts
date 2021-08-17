import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CoreCacheService } from "src/app/core/cache/core-cache.service";
import { PageNotFoundHandler } from "src/app/core/errorHandler/pageNotFoundHandler";
import { IUser } from "src/app/shared/interfaces/user";
import { DataGateConstants } from "src/app/shared/utils/constants";
import { AccountService } from "../../account/account.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    title = 'Fund Management Software';
    invalidUser: boolean = false;
    loginForm: FormGroup;
    userLoginModel: IUser;
    savedUserName: string;
    shownotFoundPage = false;
    preselectedColumns = ['ID', 'VALID FROM', 'VALID UNTIL', 'NAME'];

    constructor(private titleService: Title,
        private accountService: AccountService,
        private router: Router,
        private coreCacheService: CoreCacheService,
        private pageNotFoundHandler: PageNotFoundHandler
    ) {
        this.pageNotFoundHandler.listenNotFoundNoAuth().subscribe(data => {
            this.shownotFoundPage = data.notFound;
        });
    }


    ngOnInit(): void {
        this.titleService.setTitle(this.title);
        this.savedUserName = this.coreCacheService.getByKey(DataGateConstants.usernameKey);
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = new FormGroup(
            {
                username: new FormControl(this.savedUserName, [Validators.required]),
                password: new FormControl('', [Validators.required]),
                recaptchaValue: new FormControl('', [Validators.required])
            }
        );
    }

    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }

    onSubmit() {
        let captchaToken = this.coreCacheService.getByKeyValidOrNot(DataGateConstants.googleRecaptchaToken);
        if (captchaToken != null) {
            this.loginForm.patchValue({ 'recaptchaValue': captchaToken });
        }
        if (this.loginForm.valid) {
            let userLoginDto = Object.assign({}, this.userLoginModel, this.loginForm.value);
            this.accountService.login(userLoginDto).subscribe(res => {
                if (res.errorMessage == null)
                    this.validLogin(res);
                else
                    this.invalidLogin(res);
            });
        } else {
            Object.keys(this.loginForm.controls).forEach(field => {
                const control = this.loginForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    toggleEyeIcon(icon: HTMLElement, inputPass: HTMLInputElement) {
        if (inputPass.type == "password") {
            inputPass.setAttribute('type', 'text');
            icon.className = 'fas fa-eye';
        } else {
            inputPass.setAttribute('type', 'password');
            icon.className = 'fas fa-eye-slash';
        }
    }

    validLogin(res: any) {
        this.invalidUser = false;
        this.coreCacheService.setByKey(DataGateConstants.userKey, res);
        this.coreCacheService.setByKey(DataGateConstants.usernameKey, res.username);
        this.coreCacheService.setByKey(DataGateConstants.PreSelectedColumns, this.preselectedColumns);
        if (res.redirectUrl != null){
            this.router.navigate([res.redirectUrl]);
            location.reload();
        }
    }

    invalidLogin(res: any) {
        this.invalidUser = true;
        if (res.redirectUrl != null)
            this.router.navigate(res.redirectUrl);
    }
}
