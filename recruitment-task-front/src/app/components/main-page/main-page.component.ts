import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/ user/user.service";
import {MessageService} from "../../services/message/message.service";
import {UserDto} from "../../models/user-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginatedDataWrapper} from "../../models/paginated-data-wrapper";
import {initialCreateUserDto} from "../../models/create-user-dto";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";
import {ChangePasswordRequest} from "../../models/change-password-request";

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
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService, private messageService: MessageService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.isLoading = true;
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

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  onOpenUserDialogClick(element?:UserDto) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: element?element:initialCreateUserDto,
    });

    dialogRef.afterClosed().subscribe(userDto => {
      if (userDto) {
        this.isLoading = true;
        if (userDto.id) {
          this.userService.updateUser(userDto).subscribe({
              next: () => {
                this.messageService.displayErrorMessage('Successfully update user');
                this.isLoading = false;
                this.loadData();
              },
              error: () => {
                this.messageService.displayErrorMessage('Problem with saving user');
                this.isLoading = false;
              }
            }
          );
        } else {
          this.userService.addUser(userDto).subscribe({
              next: () => {
                this.messageService.displaySuccessMessage('Successfully add user');
                this.isLoading = false;
                this.loadData();
              },
              error: () => {
                this.messageService.displayErrorMessage('Problem with saving user');
                this.isLoading = false;
              }
            }
          );
        }
      }
    });
  }

  onChangePasswordClick(element: UserDto) {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((changePasswordRequest:ChangePasswordRequest) => {
      this.userService.changePassword(changePasswordRequest).subscribe({
          next: () => {
            this.messageService.displaySuccessMessage('Successfully change user password');
            this.isLoading = false;
            this.loadData();
          },
          error: () => {
            this.messageService.displayErrorMessage('Problem with changing user password');
            this.isLoading = false;
          }
        }
      );
    })
  }

  onDeleteClick(user: UserDto) {
    this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.messageService.displaySuccessMessage('Successfully delete user');
          this.isLoading = false;
          this.loadData();
        },
        error: () => {
          this.messageService.displayErrorMessage('Problem with deleting user');
          this.isLoading = false;
        }
      }
    );
  }

}
