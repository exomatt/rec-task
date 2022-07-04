import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/ user/user.service";
import {MessageService} from "../../services/message/message.service";
import {UserDto} from "../../models/user-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginatedDataWrapper} from "../../models/paginated-data-wrapper";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = false;
  dataSource: MatTableDataSource<UserDto> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'email'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.isLoading = true;
    let URL = `http://localhost/database.php?pageno=${this.currentPage}&per_page=${this.pageSize}`;
    this.userService.getUsers({
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe({
        next: (value: PaginatedDataWrapper<UserDto>) => {
          this.dataSource.data = value.result;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = value.totalCount;
        },
        error: () => {
          this.messageService.displayErrorMessage('Problem with getting users');
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    );

  }

  pageChanged(event: PageEvent) {
    console.log({event});
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

}
