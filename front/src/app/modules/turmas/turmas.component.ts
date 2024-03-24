import { Component, OnInit, ViewChild } from '@angular/core';
import { TurmaInterface } from './turmas.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PageSlideMobileComponent } from '../components/page-slide-mobile/page-slide-mobile.component';
import { TurmasService } from './turmas.service';
import { PoComboOption, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turmas : TurmaInterface[] = [] ;
  turmasOriginal : TurmaInterface[] = [] ;
  loadingTurmas:boolean = false;

  searchTurmaFormControl = new FormControl();

  public formTurma: FormGroup = new FormGroup({
    id: new FormControl('', []),
    descricao: new FormControl('', [Validators.required]),
    ano: new FormControl('', [Validators.required]),
    idadeInicial: new FormControl('', [Validators.required]),
    idadeFinal: new FormControl('', [Validators.required]),
    dataCriacao: new FormControl('', [Validators.required]),
    periodo: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  readonly periodos = [
    { value: 'matutino', label: 'Matutino', color: 'color-01' },
    { value: 'vespertino', label: 'Vespertino', color: 'color-10' },
    { value: 'integral', label: 'Integral', color: 'color-08' },
    { value: 'noturno', label: 'Noturno', color: 'color-09' },
  ];

  readonly tiposPeriodos: Array<PoComboOption> = [
    ...this.periodos
  ];

  readonly status = [
    { value: 'ativo', label: 'Ativo', color: 'color-09' },
    { value: 'inativo', label: 'Inativo', color: 'color-08' },
  ];

  readonly statusOptions: Array<PoComboOption> = [
    ...this.status
  ];

  @ViewChild('slideTurmaMobile') 'slideTurmaMobile': PageSlideMobileComponent;

  constructor(
    private turmasService : TurmasService,
    private poNotification: PoNotificationService,) { }

  ngOnInit(): void {
    this.refreshTurmas();

    this.searchTurmaFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.showFilter(value);
        }
      });
  }

  refreshTurmas(){
    this.loadingTurmas=true;
    this.turmasService.getTurmas().subscribe({
      next: (turmas :any)=>{
        this.turmas=turmas;
        this.loadingTurmas=false;
      },
      error: (error) => {
        this.loadingTurmas=false;
        console.error('erro ao buscar turmas', error);
      }
    });

    this.turmasOriginal = this.turmas;
  }

  modificarTurma(turma : TurmaInterface){
    this.formTurma.reset();
    this.formTurma.patchValue(turma);
    this.slideTurmaMobile.open();
  }

  getPeriodos(search:string) {
    return this.periodos.filter((s) => s.value === search)[0];
  }

  incluiTurma(){
    this.formTurma.reset();
    this.openSlide();
  }

  showFilter(value: string) {
    const searchTerm = value.toLowerCase();
    this.turmas = this.turmasOriginal.filter(turma =>
      turma.ano.toLowerCase().includes(searchTerm) ||
      turma.descricao.toLowerCase().includes(searchTerm) ||
      turma.periodo.toLowerCase().includes(searchTerm)
    );
  }

  openSlide(){
    this.formTurma.reset();
    this.formTurma.get('dataCriacao')?.setValue(new Date)
    this.slideTurmaMobile.open();
  }

  salvaTurma(){
    const idTurma = this.formTurma.get('id')?.value
    this.loadingTurmas=true;

    if(idTurma){
      this.turmasService.alteraTurma(idTurma,this.formTurma.getRawValue()).subscribe({
        next: (turmas :any)=>{
          this.formTurma.reset();
          this.refreshTurmas();
          this.loadingTurmas=false;
          this.slideTurmaMobile.close();
          this.poNotification.success('Turma alterada com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao alterar turma';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingTurmas=false;
        }
      })
    }else{
      this.turmasService.incluiTurma(this.formTurma.getRawValue()).subscribe({
        next: (turmas :any)=>{
          this.formTurma.reset();
          this.refreshTurmas();
          this.loadingTurmas=false;
          this.slideTurmaMobile.close();
          this.poNotification.success('Turma incluida com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao inserir turma';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingTurmas=false;
        }
      })

    }

  }

  getStatus(search:string) {
    return this.status.filter((s) => s.value === search)[0];
  }

}
