import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VivenciaInterface } from './vivencia.interface';

const urlBackEnd = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class VivenciasService {

  constructor( private http : HttpClient) { }

  getVivencias(){
    return this.http.get(`${urlBackEnd}vivencias`);
  }

  incluiVivencia(body : VivenciaInterface){
    return this.http.post(`${urlBackEnd}vivencias`,body);
  }

  alteraVivencia(id:string,body : VivenciaInterface ){
    return this.http.put(`${urlBackEnd}vivencias/${id}`,body);
  }
}
