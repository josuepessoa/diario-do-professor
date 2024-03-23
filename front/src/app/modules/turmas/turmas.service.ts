import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TurmaInterface } from './turmas.interface';

const urlBackEnd = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor( private http : HttpClient) { }

  getTurmas(){
    return this.http.get(`${urlBackEnd}turmas`);
  }

  incluiTurma(body : TurmaInterface){
    return this.http.post(`${urlBackEnd}turmas`,body);
  }

  alteraTurma(id:string,body : TurmaInterface ){
    return this.http.put(`${urlBackEnd}turmas/${id}`,body);
  }
}
