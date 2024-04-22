import { AlunosService } from './alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlunoInterface } from './alunos.interface';
import { PoComboOption, PoLookupColumn, PoLookupFilter, PoLookupFilteredItemsParams, PoNotificationService } from '@po-ui/ng-components';
import { Observable, debounceTime, map } from 'rxjs';
import { TurmasService } from '../turmas/turmas.service';
import { PageSlideMobileComponent } from '../components/page-slide-mobile/page-slide-mobile.component';
import { TurmaInterface } from '../turmas/turmas.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  alunos : AlunoInterface[] = [] ;
  alunosOriginal : AlunoInterface[] = [] ;
  loadingAlunos:boolean = false;
  turmas : TurmaInterface[] = [];

  searchAlunoFormControl = new FormControl();

  public formAluno: FormGroup = new FormGroup({
    id: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    idade: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    turma: new FormControl('', [Validators.required]),
    dataCriacao: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
  });

  readonly status = [
    { value: 'ativo', label: 'Ativo', color: 'color-09' },
    { value: 'inativo', label: 'Inativo', color: 'color-08' },
  ];

  readonly statusOptions: Array<PoComboOption> = [
    ...this.status
  ];

  readonly sexoOptions : Array<PoComboOption> = [
    { value: 'masculino', label: 'Masculino'},
    { value: 'feminino', label: 'Feminino'},
  ];

  readonly avatarMeninoOptions : Array<PoComboOption> = [
    { value: 'menino1', label: 'Avatar 1'},
    { value: 'menino2', label: 'Avatar 2'},
    { value: 'menino3', label: 'Avatar 3'},
    { value: 'menino4', label: 'Avatar 4'},
  ];

  readonly avatarMeninaOptions : Array<PoComboOption> = [
    { value: 'menina1', label: 'Avatar 1'},
    { value: 'menina2', label: 'Avatar 2'},
    { value: 'menina3', label: 'Avatar 3'},
    { value: 'menina4', label: 'Avatar 4'},
  ];

  turmasOptions: Array<PoComboOption> = [ ];

  @ViewChild('slideAlunoMobile') 'slideAlunoMobile': PageSlideMobileComponent;

  constructor(
    private alunosService: AlunosService,
    private turmasService : TurmasService,
    private poNotification: PoNotificationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getTurmas();
    this.refreshAlunos();

    this.searchAlunoFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.showFilter(value);
        }
      });
  }

  getTurmas(){
    this.turmasService.getTurmas().subscribe({
      next: (turmas :any )=>{
        this.turmas=turmas;
        this.turmas.forEach((t)=>{
          this.turmasOptions.push( {
            value : t?.id,
            label : t?.descricao
          })
        })
      },
      error: (error) => {
        console.error('erro ao buscar turmas', error);
      }
    });
  }

  getTurmasOptions(){
    return [...this.turmasOptions]
  }

  refreshAlunos(){
    this.loadingAlunos=true;
    this.alunosService.getAlunos().subscribe({
      next: (alunos :any)=>{
        this.alunos=alunos;
        this.loadingAlunos=false;
      },
      error: (error) => {
        this.loadingAlunos=false;
        console.error('erro ao buscar alunos', error);
      }
    });

    this.alunosOriginal = this.alunos;
  }

  modificarAluno(aluno : AlunoInterface){
    this.formAluno.reset();
    this.formAluno.patchValue(aluno);
    this.slideAlunoMobile.open();
  }

  getStatus(search:string) {
    return this.status.filter((s) => s.value === search)[0];
  }

  incluiAluno(){
    this.formAluno.reset();
    this.openSlide();
  }

  showFilter(value: string) {
    const searchTerm = value.toLowerCase();
    this.alunos = this.alunosOriginal.filter(aluno =>
      aluno.nome.toLowerCase().includes(searchTerm)
    );
  }

  openSlide(){
    this.formAluno.reset();
    this.formAluno.get('dataCriacao')?.setValue(new Date)
    this.slideAlunoMobile.open();
  }

  salvaAluno(){
    const idAluno = this.formAluno.get('id')?.value
    this.loadingAlunos=true;

    if(idAluno){
      this.alunosService.alteraAluno(idAluno,this.formAluno.getRawValue()).subscribe({
        next: (alunos :any)=>{
          this.formAluno.reset();
          this.refreshAlunos();
          this.loadingAlunos=false;
          this.slideAlunoMobile.close();
          this.poNotification.success('Aluno alterado com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao alterar aluno';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingAlunos=false;
        }
      })
    }else{
      this.alunosService.incluiAluno(this.formAluno.getRawValue()).subscribe({
        next: (aluno :any)=>{
          this.formAluno.reset();
          this.refreshAlunos();
          this.loadingAlunos=false;
          this.slideAlunoMobile.close();
          this.poNotification.success('Aluno incluido com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao inserir aluno';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingAlunos=false;
        }
      })

    }

  }

  getInfoTurma(idTurma : string){
    return this.turmas.filter((t) => t.id === idTurma)[0];
  }

  getAvatar(avatar){
    return `../../../assets/${avatar}.jpg`
  }

  anotacoesAluno(aluno) {
    this.router.navigate(['anotacoes', aluno.id], {
      state: {
        nomeAluno: aluno.nome,
        turmaAluno: this.getInfoTurma(aluno.turma).descricao
      }
    });
  }

}
