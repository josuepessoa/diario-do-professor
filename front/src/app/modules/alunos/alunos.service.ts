import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlunoInterface } from './alunos.interface';

const urlBackEnd = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor( private http : HttpClient) { }

  getAlunos(){
    return this.http.get(`${urlBackEnd}alunos`);
  }

  incluiAluno(body : AlunoInterface){
    return this.http.post(`${urlBackEnd}alunos`,body);
  }

  alteraAluno(id:string,body : AlunoInterface ){
    return this.http.put(`${urlBackEnd}alunos/${id}`,body);
  }
}
