import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SearchService } from "src/app/core/layouts/app-layout/search-service";
import { ISearchResultsViewModel } from "src/app/shared/interfaces/ISearchResultsViewModel";
import { ISearchViewModel, searchResultColumns } from "src/app/shared/interfaces/ISearchViewModel";
import { MessageService } from "src/app/shared/utils/message.service";

@Component({
    selector: 'search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, AfterViewInit {
    cleanedSearch: string;
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    columns = searchResultColumns

    @ViewChild('paginator') paginator: MatPaginator;

    constructor(private datePipe: DatePipe,private searchService: SearchService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.messageService.listenSearchResult().subscribe(search => {
            if (search) {
                this.searchService.searchResult(search.searchTerm, search.userId).subscribe((data: ISearchResultsViewModel) => {
                    console.log(data);
                    console.log(this.columns);
                    this.dataSource.data = data.results;
                    this.cleanedSearch = data.cleanedSearch;
                })
            }
        })
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    getRoute(id) {
        let date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
        return "/sc/" + id + "/" + date;
    }
}