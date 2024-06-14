import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const urlBackEnd = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http : HttpClient) { }

  getDashboard(){
    return this.http.get(`${urlBackEnd}dashboard`);
  }

}
