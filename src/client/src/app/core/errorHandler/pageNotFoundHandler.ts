import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NotFoundInfo } from "src/app/shared/interfaces/notFound";

@Injectable()
export class PageNotFoundHandler {
    private notFoundAuthListener = new BehaviorSubject<NotFoundInfo>({ notFound: false, authenticated: true } as NotFoundInfo);
    private notFoundNoAuthListener = new BehaviorSubject<NotFoundInfo>({ notFound: false, authenticated: false } as NotFoundInfo);

    fillNotFoundAuth(value) {
        this.notFoundAuthListener.next(value);
    }

    listenNotFoundAuth(): Observable<NotFoundInfo> {
        return this.notFoundAuthListener.asObservable();
    }

    fillNotFoundNoAuth(value) {
        this.notFoundNoAuthListener.next(value);
    }

    listenNotFoundNoAuth(): Observable<NotFoundInfo> {
        return this.notFoundNoAuthListener.asObservable();
    }

}