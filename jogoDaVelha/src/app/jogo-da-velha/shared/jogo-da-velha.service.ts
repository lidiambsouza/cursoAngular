import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {
  private readonly TAM_TB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;
  private numMovimentos: number;
  private vitoria: any;

  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;

  constructor() { }

  // @return void

  inicializar(): void{
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  // @return void

  inicializarTabuleiro(): void{
    this.tabuleiro = [this.TAM_TB];
    for (let i = 0; i < this.TAM_TB; i++){
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }
  // @return boolean
  get showInicio(): boolean{
    return this._showInicio;
  }

  // @return boolean
  get showTabuleiro(): boolean{
    return this._showTabuleiro;
  }

  // @return boolean
  get showFinal(): boolean{
    return this._showFinal;
  }

  // @return number
  get jogador(): number{
    return this._jogador;
  }
  
  // @return void
  iniciarJogo(): void{
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  /*
  @param number posX
  @param number posY
  @return void
  
  */
 jogar(posX: number, posY: number): void{
   if (this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria){
      return; 
  }
   this.tabuleiro[posX][posY] = this._jogador;
   this.numMovimentos++;
   this.vitoria = this.fimJogo(posX, posY, this.tabuleiro, this._jogador);
   this._jogador = (this._jogador === this.X) ? this.O :this.X;

   if (!this.vitoria && this.numMovimentos < 9) {
    this.cpuJogar();
   }

   if (!this.vitoria !== false){
      this._showFinal = true;
   }

   if (!this.vitoria && this.numMovimentos === 9){
     this._jogador = 0;
     this._showFinal = true;
   }

 }

 fimJogo(linha: number, coluna: number, tabuleiro: any, jogador: number) {
  let fim: any = false;

  if (tabuleiro[linha][0] === jogador && tabuleiro[linha][1] === jogador && tabuleiro[linha][2] === jogador ) {
    fim = [[linha, 0],[linha, 1],[linha, 2]];
  }

  if (tabuleiro[0][coluna] === jogador && tabuleiro[1][coluna] === jogador && tabuleiro[2][coluna] === jogador ) {
    fim = [[0, coluna],[1, coluna],[2, coluna]];
  }

  if (tabuleiro[0][0] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][2] === jogador ) {
    fim = [[0, 0],[1, 1],[2, 2]];
  }

  if (tabuleiro[0][2] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][0] === jogador ) {
    fim = [[0, 2],[1, 1],[2, 0]];
  }
  return fim;

}

  cpuJogar(): void {
    let jogada: number[] = this.obterJogada(this.O);
    if (jogada.length <= 0) {
      jogada = this.obterJogada(this.X);
    }
    if (jogada.length <= 0) {
      let jogadas: any = [];
      for (let i = 0; i < this.TAM_TB; i++) {
        for (let j = 0; j < this.TAM_TB; j++) {
           if (this.tabuleiro[i][j] === this.VAZIO){
              jogadas.push([i, j]);
           }
        }
      }
      let k = Math.floor((Math.random() * (jogadas.length - 1)));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }
    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(jogada[0], jogada[1], this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
  }
  obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let lin; lin < this.TAM_TB; lin++) {
      for (let col; col < this.TAM_TB; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue; 
        }
        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col, tab, jogador)) {
          return [lin, col];
         }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }
  exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }
  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
       return exibirVitoria; 
      }
    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;
  }

  novoJogo(): void {
    this.inicializar();
    this._showInicio = false;
    this._showFinal = false;
    this._showTabuleiro = true;
  }
}


