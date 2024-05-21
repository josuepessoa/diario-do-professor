import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageSlideMobileComponent } from '../components/page-slide-mobile/page-slide-mobile.component';
import { AnotacoesService } from './anotacoes.service';
import { AnotacaoInterface } from './anotacoes.interface';
import { PoNotificationService } from '@po-ui/ng-components';
import { debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.scss']
})
export class AnotacoesComponent implements OnInit {

  idAluno: string;
  nomeAluno: string;
  turmaAluno : string;
  loadingAnotacoes=false;
  searchAnotacaoFormControl = new FormControl();
  anotacoes : any =[] ;
  anotacoesOriginal: any =[];

  public formAnotacao: FormGroup = new FormGroup({
    id: new FormControl('', []),
    dataCriacao: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    idAluno: new FormControl('', [Validators.required]),
  });

  @ViewChild('slideAnotacaoMobile') 'slideAnotacaoMobile': PageSlideMobileComponent;

  constructor(
    private service : AnotacoesService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.idAluno = this.route?.snapshot?.paramMap.get('id');
    this.nomeAluno = history.state.nomeAluno;
    this.turmaAluno = history.state.turmaAluno;

    this.refreshAnotacoes();

    this.searchAnotacaoFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.showFilter(value);
        }
      });
  }

  incluiAnotacao(){
    this.formAnotacao.reset();
    this.openSlide();
  }

  openSlide(){
    this.formAnotacao.reset();
    this.formAnotacao.get('dataCriacao')?.setValue(new Date);
    this.formAnotacao.get('idAluno').setValue(this.idAluno);
    this.slideAnotacaoMobile.open();
  }

  modificarAnotacao(anotacao : AnotacaoInterface){
    this.formAnotacao.reset();
    this.formAnotacao.patchValue(anotacao);
    this.slideAnotacaoMobile.open();
  }

  salvaAnotacao(){
    const idAnotacao = this.formAnotacao.get('id')?.value
    this.loadingAnotacoes=true;

    if(idAnotacao){
      this.service.alteraAnotacao(idAnotacao,this.formAnotacao.getRawValue()).subscribe({
        next: (anotacao :any)=>{
          this.formAnotacao.reset();
          this.refreshAnotacoes();
          this.loadingAnotacoes=false;
          this.slideAnotacaoMobile.close();
          this.poNotification.success('Anotação alterada com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao alterar Anotação';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingAnotacoes=false;
        }
      })
    }else{
      this.service.incluiAnotacao(this.formAnotacao.getRawValue()).subscribe({
        next: (anotacao :any)=>{
          this.formAnotacao.reset();
          this.refreshAnotacoes();
          this.loadingAnotacoes=false;
          this.slideAnotacaoMobile.close();
          this.poNotification.success('Anotação incluida com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao inserir anotacao';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingAnotacoes=false;
        }
      })
    }

  }

  refreshAnotacoes(){
    this.loadingAnotacoes=true;
    this.service.getAnotacoes(this.idAluno).subscribe({
      next: (anotacoes :any)=>{
        this.anotacoes=anotacoes;
        this.loadingAnotacoes=false;
      },
      error: (error) => {
        this.loadingAnotacoes=false;
        console.error('erro ao buscar anotacoes', error);
      }
    });

    this.anotacoesOriginal = this.anotacoes;
  }


  showFilter(value: string) {
    const searchTerm = value.toLowerCase();
    this.anotacoes = this.anotacoesOriginal.filter(anotacao =>
      anotacao.descricao.toLowerCase().includes(searchTerm)
    );
  }

  truncarString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + '...';
    }
  }
}
