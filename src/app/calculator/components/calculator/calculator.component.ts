import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)': 'handlekeyboardEvent($event)',
  }
})
export class CalculatorComponent {
  /** Realizamos la inyeccion del servicio y lo dejamos privado */
  private calculatorService = inject(CalculatorService);

  /** Definimos una señal de los botones de la calculadora */
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  /** Para acceder a las señales del servicio se define lo siguiente */
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  // Esto tambien es valido y para acceder en al html se coloca {{ resultText() }}
  // get resultText() {
  //   return this.calculatorService.resultText;
  // }

  /** Creamos un nuevo metodo que se llama en cada uno de los botones pra cuando se da clic en ellos */
  handleClick( key: string ) {
    //console.log({ key });
    this.calculatorService.constructNumber(key);
  }

  /** Creamos el nuevo metodo para escchar que tecla oprimen en el doucmento en este caso la calculadora */
  // Comentamos la siguiente linea para definirlo en el host y cuando se oprima una tecla simulamos como si se hubiese dado tap en el boton respectivo de la calculadora.
  //@HostListener('document:keyup', ['$event'])
  handlekeyboardEvent(event: KeyboardEvent) {
    /** En algunas teclas oprimidas debemos de hacer unas equivalencias de teclas oprimidas para poder mostrar el estilo de oprimida */
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'X': '*',
      'x': '*',
      '/': '÷',
      Enter: '=',
    }

    /** Definimos esta variable para tomar así la tecla oprimida */
    const key = event.key;

    const keyValue = keyEquivalents[key] ?? key;

    //console.log(event, event.key);
    // Antes de mandar el key debemos de validar si tenemos alguna equivalencia
    //this.handleClick(key);
    this.handleClick(keyValue);

    // Aca recorremos las teclas y dependiendo de cual se oprimio se cambia el estilo
    this.calculatorButtons().forEach( button => {
      button.keyboardPressedStyle(keyValue);
    });

  }

}
