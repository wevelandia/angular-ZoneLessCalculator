import { Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    /* attribute: 'hola',
    'data-size': 'XL', */
  },
  // Esta es otra opcion para solucionar el aplique del estilo de is-command
  //encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent implements OnInit {

  // Definimos una variable para saber cual es la tecla que se ha oprimido y así poder aplicarle el estilo de is-pressed
  public isPressed = signal(false);

  // Definimos aca el onclick de cada botón
  public onClick = output<string>();

  // Definimos esta funcion para obtener el contendio
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // Definimos aca una señal para diferenciar el boton de división.
  // transform: Se define para que cuando se reciba un dato y antes de que se realice la asignación a isCommand se trasforme el dato, si se recibe dato de isCommand debe de ser true si no se define es false.
  public isCommand = input( false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input( false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '' : value,
  });

  ngOnInit(): void {
    // console.log( this.isCommand() );
  }

  // Nuestro host es el elemento de html que sale como <calculator-button> </calculator-button>
  /* @HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  } */

  /*
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
  */
  // Creamos el metodo handleClick
  handleClick() {

    console.log('handleClick');

    if ( !this.contentValue()?.nativeElement ) {
      return;
    }
    //console.log(this.contentValue()?.nativeElement.innerText);
    const value = this.contentValue()!.nativeElement.innerText;

    console.log({value});

    //this.onClick.emit('Hola mundo');
    // Si damos click en x reemplazamos el operador por *
    if (value === 'x') {
      this.onClick.emit('*');
      return;
    }

    this.onClick.emit(value.trim());
  }

  // Creamos otro metodo para manejar el estilo de la tecla presionada
  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if ( value !== key) return;

    // Cambiamos el valor a la señal - signals.
    this.isPressed.set(true);

    // Definimos que espere una milesima de segundo para ver la simulación de que se oprimio una tecla de la calculadora
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }
}
