import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  // Antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  // Tambien se tiene un ciclo de vida en las validaciones
  // Antes de todas las pruebas
  beforeAll(() => {});
  // Después de cada prueba
  afterEach(() => {});
  // Después de todas las pruebas
  afterAll(() => {});

  // Esta es la primera prueba que se debe de hacer, que sea creado
  it('should be created', () => {
    // Si hay alguna dependencia que este bloqueando la siguiente linea lo atrapa y muestra el error.
    expect(service).toBeTruthy();
  });

  // Evaluamos los valores por defecto
  it('should be created with default values', () => {
    // Si se tiene señales se llaman así: service.resultText()
    // Si se esta trabajando con el modulo tradicional de angular con Zoneless se realiza el llamado así: service.resultText - sin los parentesis.
    expect( service.resultText() ).toBe('0');
    expect( service.subResultText() ).toBe('0');
    expect( service.lastOperator() ).toBe('+');
  });

  // Se va a realizar la validación de reestablecer todo a cero, es el proceso de llegar a tocar C luego de hacer algunas operaciones y esto se simula de la siguiente manere.
  it('should se resultText, subResultText to "0" when C is pressed', () => {
    // Como sabemos que realmente esta funcionando esta prueba, pues debemos de cambiar los valores que ocupamos.
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect( service.resultText() ).toBe('0');
    expect( service.subResultText() ).toBe('0');
    expect( service.lastOperator() ).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect( service.resultText() ).toBe('1');

    service.constructNumber('2');
    // Aca lo que debemos es de tener ya 12
    expect( service.resultText() ).toBe('12');

  });

  // Hacemos una validación para el codigo donde se programo lo que pasa al oprimir un operador
  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');

    expect( service.lastOperator() ).toBe('-');
    expect( service.subResultText() ).toBe('1');
    // Se evalua que resultText vuelva a ser cero, por ello se asigon: this.resultText.set('0');
    expect( service.resultText() ).toBe('0');
  });

  // Hacemos la validación de una suma para validar las operaciones y se pueden incluir los demás operadores.
  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('3');

  });

  it('should calculate result correctly for substraction', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('3');

  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('4');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('8');

  });

  it('should calculate result correctly for multiplication with x', () => {
    service.constructNumber('3');
    service.constructNumber('x');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('6');

  });

  it('should calculate result correctly for division with ÷', () => {
    service.constructNumber('9');
    service.constructNumber('÷');
    service.constructNumber('3');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('3');

  });

  it('should calculate result correctly for division', () => {
    // Para el valor de 10 tambien se puede asignar a resultText
    // service.resultText.set('10');
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('5');

  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect( service.resultText() ).toBe('1.5');

    // Volvemos a tocar de nuevo punto y no debe de suceder nada
    service.constructNumber('.');
    expect( service.resultText() ).toBe('1.5');
  });

  // Realizamos la validación del punto decimal cn valor inicial de cero
  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('0');

    expect( service.resultText() ).toBe('0.0');
  });

  // Pruebas con operadores especiales
  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect( service.resultText() ).toBe('-1');
    service.constructNumber('+/-');
    expect( service.resultText() ).toBe('1');
  });

  // Probamos ahora el backespace
  it('should handle backspace correctly', () => {
    // Costruimos un estado inicial
    service.resultText.set('123');

    service.constructNumber('Backspace');

    expect( service.resultText() ).toBe('12');

    service.constructNumber('Backspace');
    expect( service.resultText() ).toBe('1');

    service.constructNumber('Backspace');
    expect( service.resultText() ).toBe('0');
  });

  // Validamos que no se opriman mas de 10 caracteres
  it('should handle max lenght correctly', () => {
    for( let i = 0; i < 10; i++ ) {
      service.constructNumber('1');
    }

    expect( service.resultText().length ).toBe(10);
    // Agregamos otro 1 y no pasa nada pero en consola de la calculadora si debe de salir el mensaje
    service.constructNumber('1');
    expect( service.resultText().length ).toBe(10);
  });

  // Probamos ahora el backespace para cuando tenemos el vaor de cero, siga siendo el mismo valor cero si se oprime backspace
  it('should handle backspace resulttext equals zero', () => {
    // Costruimos un estado inicial
    service.resultText.set('0');

    service.constructNumber('Backspace');

    expect( service.resultText() ).toBe('0');

  });

  // Probamos ahora el backespace para cuando tenemos el valores negativos.
  it('should handle resulttext fallback for negative values', () => {
    // Costruimos un estado inicial
    service.resultText.set('-5');

    service.constructNumber('Backspace');

    expect( service.resultText() ).toBe('0');

  });

  // Manejar el resultado para cuando se suma un numero al valor cero negativo
  it('should handle the result for when a number is added to the negative zero value', () => {
    // Costruimos un estado inicial
    service.resultText.set('-0');

    service.constructNumber('4');

    expect( service.resultText() ).toBe('-4');

  });

  // Realizamos validación para console.log no se llame
  it('should not log "Invalid input" for valid values', () => {
    spyOn(console, 'log'); // Espiar console.log para verificar que no se llame

    // Definimos los valores esperados dentro del constructor
    const numbers = ['1', '2', '3']; // Ejemplo de números
    const operators = ['+', '-']; // Ejemplo de operadores
    const specialOperators = ['*', '/']; // Ejemplo de operadores especiales

    // Elegimos un valor válido que esté dentro de los arrays
    const validValue = '1';

    // Llamamos la función que contiene el constructor con validación
    service.constructNumber(validValue);

    // Verificamos que NO se imprimió "Invalid input"
    expect(console.log).not.toHaveBeenCalledWith('Invalid input', validValue);
  });

  // Validamos el mensaje de console.log
  it('should log "Invalid input" for invalid values', () => {
    spyOn(console, 'log'); // Espiar console.log

    const invalidValue = 'X'; // Un valor que no está en los arrays

    // Llamamos la función
    service.constructNumber(invalidValue);

    // Verificamos que se imprimió "Invalid input"
    expect(console.log).toHaveBeenCalledWith('Invalid input', invalidValue);
  });
});
