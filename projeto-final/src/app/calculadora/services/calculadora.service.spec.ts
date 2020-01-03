import { TestBed, inject } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculadoraService = TestBed.get(CalculadoraService);
    expect(service).toBeTruthy();
  });
  it('DEVE GARANTIR QUE 1+4=5',
   inject([CalculadoraService],(service: CalculadoraService)=>{
      let soma = service.calcular(1,4, CalculadoraService.SOMA);
       expect(soma).toEqual(5);
      })
  );
  it('deve garantir que 1-2=-1',
      inject([CalculadoraService],(service:CalculadoraService)=>{
        let sub = service.calcular(1,2, CalculadoraService.SUBTRACAO);
        expect(sub).toEqual(-1);
      })
  );
  it('deve garantir que 3*2=6',
    inject([CalculadoraService],(service:CalculadoraService)=>{
      let mult=service.calcular(3,2, CalculadoraService.MULTIPLICACAO);
      expect(mult).toEqual(6);
    })  
  );

  it('deve garantir que 6/2=3',
    inject([CalculadoraService],(service:CalculadoraService)=>{
      let div= service.calcular(6,2, CalculadoraService.DIVISAO);
      expect(div).toEqual(3);
    })
  );

  it('deve retorna 0 para operação invalida',
    inject([CalculadoraService],(service:CalculadoraService)=>{
      let apInvalida= service.calcular(6,2,'%');
      expect(apInvalida).toEqual(0);
    })
  );



});
