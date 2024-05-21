import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageSlideMobileComponent } from '../components/page-slide-mobile/page-slide-mobile.component';
import { debounceTime } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';
import { VivenciaInterface } from './vivencia.interface';
import { VivenciasService } from './vivencias.service';

@Component({
  selector: 'app-vivencias',
  templateUrl: './vivencias.component.html',
  styleUrls: ['./vivencias.component.scss']
})
export class VivenciasComponent implements OnInit {

  loadingVivencias=false;
  searchVivenciaFormControl = new FormControl();
  vivencias : Array<VivenciaInterface> = [] ;
  vivenciasOriginal: Array<VivenciaInterface> = [];

  public formVivencia: FormGroup = new FormGroup({
    id: new FormControl('', []),
    dataCriacao: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    categorias: new FormControl('', [Validators.required]),
  });

  @ViewChild('slideVivenciaMobile') 'slideVivenciaMobile': PageSlideMobileComponent;

  constructor(
    private service : VivenciasService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {

    this.refreshVivencias();

    this.searchVivenciaFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.showFilter(value);
        }
      });
  }

  incluiVivencia(){
    this.formVivencia.reset();
    this.openSlide();
  }

  openSlide(){
    this.formVivencia.reset();
    this.formVivencia.get('dataCriacao')?.setValue(new Date);
    this.slideVivenciaMobile.open();
  }

  modificarVivencia(vivencia : VivenciaInterface){
    this.formVivencia.reset();
    this.formVivencia.patchValue(vivencia);
    this.slideVivenciaMobile.open();
  }

  salvaVivencia(){
    const idVivencia = this.formVivencia.get('id')?.value
    this.loadingVivencias=true;

    if(idVivencia){
      this.service.alteraVivencia(idVivencia,this.formVivencia.getRawValue()).subscribe({
        next: (vivencia :any)=>{
          this.formVivencia.reset();
          this.refreshVivencias();
          this.loadingVivencias=false;
          this.slideVivenciaMobile.close();
          this.poNotification.success('Vivência alterada com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao alterar Vivência';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingVivencias=false;
        }
      })
    }else{
      this.service.incluiVivencia(this.formVivencia.getRawValue()).subscribe({
        next: (vivencia :any)=>{
          this.formVivencia.reset();
          this.refreshVivencias();
          this.loadingVivencias=false;
          this.slideVivenciaMobile.close();
          this.poNotification.success('Vivência incluida com sucesso.');
        },
        error: (error) => {
          const msg =  'erro ao inserir vivencia';
          console.error(msg, error);
          this.poNotification.error(msg + ' : ' +error);
          this.loadingVivencias=false;
        }
      })
    }

  }

  refreshVivencias(){
    this.loadingVivencias=true;
    this.service.getVivencias().subscribe({
      next: (vivencias :any)=>{
        this.vivencias=vivencias;
        this.loadingVivencias=false;
        this.vivenciasOriginal = this.vivencias;
      },
      error: (error) => {
        this.loadingVivencias=false;
        console.error('erro ao buscar vivencias', error);
      }
    });
  }

  showFilter(value: string) {
    const searchTerm = value.toLowerCase();
    this.vivencias = this.vivenciasOriginal.filter(vivencia => {
     return vivencia.descricao.toLowerCase().includes(searchTerm) ||
      vivencia.categorias.toLowerCase().includes(searchTerm) ||
      vivencia.titulo.toLowerCase().includes(searchTerm)
    });
  }

  truncarString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + '...';
    }
  }

}
