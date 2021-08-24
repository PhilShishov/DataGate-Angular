import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { userColumns } from "src/app/shared/interfaces/ICreateUserInputModel";
import { AdminService } from "../admin.service";
import * as moment from 'moment';

@Component({
    selector: 'admin-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    columns = userColumns

    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private titleService: Title,
        private translate: TranslateService,
        private adminService: AdminService,
        private router: Router) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.translate.get('View User').subscribe(str => {
            this.titleService.setTitle(str);
        });
        this.adminService.all().subscribe(data => {
            data.map(x => {
                x.lastLogin = moment(x.lastLogin).format('MM.DD.YYYY hh:mm');
            })
            this.dataSource.data = data;
            this.dataSource.sortingDataAccessor = (item, property) => {
                if (property === 'role') {
                    return item.roles[0];
                } else {
                    return item[property];
                }
            };
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter = (event: any) => {
        this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
    }

    edit(id) {
        this.router.navigate(['/admin/edit/' + id], { state: { action: 'Edit' } })
    }

    delete(id) {
        this.router.navigate(['/admin/delete/' + id], { state: { action: 'Delete' } })
    }
}