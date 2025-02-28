import { Injectable, signal } from '@angular/core';

// Definimos los operadores que vamos a utilizar
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/','÷','x'];
const specialOperators = ['+/-','%','.','=','C','Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  // El constructor no lo vamos a utilizar
  //constructor() { }

  /** Definimos tres señales para saber el numero que se digita el operador y el resultado */
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber( value: string ): void {
    // Validar el input
    if ( ![...numbers, ...operators, ...specialOperators].includes(value) ) {
      console.log('Invalid input', value);
      return;
    }

    // Si seleccioan el cartacter de igual o el enter, se dispara el calculo
    // =
    if ( value === '=' ) {
      this.calculateResult();
      // console.log('Calcular resltado');
      return;
    }

    // Si se oprime el boton de C se resetea todo el calculo
    // Limpiar resltados
    if ( value === 'C' ) {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    if ( value === 'Backspace' ) {
      if (this.resultText() === '0') return;

      // if (this.resultText() === '-0') {
      //   this.resultText.set('0');
      //   return;
      // }

      // Cuando tengamos numeros negativos
      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      // Si resultText tiene un solo caracter se inicializa en 0.
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      // Cortamos la ultima posicion del value para cuando resulText hay un numero por ejemplo 1234.56 y se va eliminando la ultima posicion
      this.resultText.update((v) => v.slice(0, -1));
      return;
    }

    // Aplicar operador
    // Si tocamos alguna tecla de los operadores
    if (operators.includes(value)) {
      //this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limiter número de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    // Validar punto decimal
    // Si value es un punto y si en resultText no hay otro punto
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    // Manejo de el cero inicial
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      // Si resultText tiene el caracter -
      if (this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }

      // Si resultText no tiene el caracter -
      this.resultText.update((text) => '-' + text);
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((text) => text + value);
      return;
    }
  }

  // Creamos el metodo para calcular el resultado de la operación
  public calculateResult() {

    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
