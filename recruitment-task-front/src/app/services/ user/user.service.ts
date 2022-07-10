import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDto} from "../../models/user-dto";
import {Query} from "../../models/query";
import {PaginatedDataWrapper} from "../../models/paginated-data-wrapper";
import {CreateUserDto} from "../../models/create-user-dto";
import {ChangePasswordRequest} from "../../models/change-password-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(query: Query): Observable<PaginatedDataWrapper<UserDto>> {
    return this.httpClient.get<PaginatedDataWrapper<UserDto>>(`${environment.basePath}/user/all`, {
      params: {
        page: query.page,
        pageSize: query.pageSize
      }
    });
  }

  addUser(user: CreateUserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${environment.basePath}/user/`, user);
  }

  updateUser(user: CreateUserDto): Observable<UserDto> {
    return this.httpClient.put<UserDto>(`${environment.basePath}/user/`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.basePath}/user/${userId}`);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${environment.basePath}/user/changePassword`, changePasswordRequest);
  }

  existsByUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.basePath}/user/existsByUsername`, {
      params: {
        username
      }
    });
  }

  existsByEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.basePath}/user/existsByEmail`, {
      params: {
        email
      }
    });
  }

}
