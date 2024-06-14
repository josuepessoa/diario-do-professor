import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnotacaoInterface } from './anotacoes.interface';

const urlBackEnd = environment.baseUrlBackEnd;

@Injectable({
  providedIn: 'root'
})
export class AnotacoesService {

  constructor( private http : HttpClient) { }

  getAnotacoes(idAluno =''){
    const aluno = idAluno ? `?idAluno=${idAluno}` : ''
    return this.http.get(`${urlBackEnd}anotacoes${aluno}`);
  }

  incluiAnotacao(body : AnotacaoInterface){
    return this.http.post(`${urlBackEnd}anotacoes`,body);
  }

  alteraAnotacao(id:string,body : AnotacaoInterface ){
    return this.http.put(`${urlBackEnd}anotacoes/${id}`,body);
  }
}
