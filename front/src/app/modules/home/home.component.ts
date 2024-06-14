import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dadosDashboard;
  constructor(
    private service : HomeService ,
    private router: Router,)
  { }

  ngOnInit(): void {
    this.getDashboard();
  }

  actionAlunos(){
    this.router.navigate(['alunos']);
  }

  actionTurmas(){
    this.router.navigate(['turmas']);
  }

  actionVivencias(){
    this.router.navigate(['turmas']);
    this.router.navigate(['vivencias']);
  }

  actionAnotacoes(){
    this.router.navigate(['anotacoes']);
  }

  getDashboard(){
    this.service.getDashboard().subscribe({
      next :(dados) =>this.dadosDashboard = dados,
      error : (err)=>console.error(err),
    })
  }

}
