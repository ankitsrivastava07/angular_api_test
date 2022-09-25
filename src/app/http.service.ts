import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RequestDto } from './request-dto';

@Injectable({
  providedIn: 'root'
})
export class HttpService{

  private api = 'http://localhost:8080/call-external-api'
  private apiForToken = "http://localhost:8080/create-key"

  constructor(private httpClient: HttpClient) { }

  sendRequest(requestDto : any)
  {
    return this.httpClient.post<any>(this.api, requestDto);
  }

  get()
  {
    return this.httpClient.get<any>(this.apiForToken);
  }
}
