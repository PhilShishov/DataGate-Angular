import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private searchResultListener = new BehaviorSubject<any>(null);

    fillSearchResult(value) {
        this.searchResultListener.next(value);
    }

    listenSearchResult(): Observable<any> {
        return this.searchResultListener.asObservable();
    }
}