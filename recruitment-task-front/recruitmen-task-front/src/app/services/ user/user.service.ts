import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDto} from "../../models/user-dto";
import {Query} from "../../models/query";
import {PaginatedDataWrapper} from "../../models/paginated-data-wrapper";

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
}
