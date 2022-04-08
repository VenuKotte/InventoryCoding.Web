import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface request {
  id : number ,
  inventoryId : number,
  requestedKernels : number

}
export interface inventory {
  id : number ,
  name : string,
  kernels : number

}
@Injectable({
  providedIn: 'root'
})

export class AppService
{
  constructor(private httpClient: HttpClient) { }

  public GetInventory(): Observable<any> {
    return this.httpClient
      .get<any>(environment.endPointUrl + 'getTotalInventory');
  }

  public GetInventoryById(requestedInventory: number, requestedKernals : number): Observable<any> {
    return this.httpClient.get<any>(environment.endPointUrl + 'checkAvailableKernals/' + requestedInventory + '/' +  requestedKernals );
  }
}
