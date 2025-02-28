import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

// describe: Este es un agrupador de pruebas
describe('AppComponent', () => {

  // Definimos fixture y compiled porque se van a usar en varias pruebas y sus asignacionaes las realizamos en beforeEach
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  // beforeEach: Puede ser asincrona y me permite ejecutar una parte de código antes de cada prueba.
  // Cada prueba es autosuficiente e independiente.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  // Esta prueba se debe de hacer siempre, me indica si nuestro componente se logra montar.
  it('should create the app', () => {
    // fixture: Es un envoltorio del componente que estamos montando en este caso del AppComponent, es como una instancia a ese AppComponent.
    //const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Creamos una nueva prueba y los mensajes es mejor en ingles por si se trabajan con grupos de desarrolladores de otros paises.
  it('should be 2', () => {
    // La AAA lo que significa es que Preparamos el sujeto de pruebas, actuamos y luego verificamos el comportamiento mediante excepciones.
    // Asumimos que tenemos unas constantes
    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // Esta suma nos debe de dar 3
    // A = Act
    const result = num1 + num2;

    // A = Assert
    // Esto se puede trabajar asi pero es mejor definirlo con expect
    /* if ( result != 3 ) {
      throw new Error('No es 3');
    } */
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  // Esta es una prueba mas elaborada.
  /*it('should render title', () => {
    // Tenemos la creacion del componente
    //const fixture = TestBed.createComponent(AppComponent);
    // Esperamos algun cambio
    fixture.detectChanges();

    // Una vez se detectan los cambios se toma el elemento compilado
    //const compiled = fixture.nativeElement as HTMLElement;

    // En compiled obtenemos todo el HTML de nuestro compoente
    console.log(compiled);

    // Esta prueba lo que busca es un h1 y que dentro de el este el texto Hello, zoneless-calculator
    //expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  }); */

  // La primera prueba que vamos a realizar es que existe router-outlet en nuestra pagina
  it('should render router-outlet', () => {
    expect( compiled.querySelector('router-outlet') ).not.toBeNull();
  });

  // Realizamos otra prueba que router-outlet este envuelto en un div.
  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    console.log(divElement);

    // Definimos las clases que tenemos en el div para poderlas validar y saber si estan definidas
    /*const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';

    console.log(divElement?.classList);

    expect(divElement?.classList).toBe(cssClasses); */

    // Pero que pasa si se le cambia el orden a una de las clases? Usamos split para que cssClasses y este sea es un arreglo de cada una de las clases
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    console.log(divElement?.classList);

    // De la siguiente manera las clases de se definen en html deben de estar en cssClasses
    //expect(divElement?.classList).toBe(cssClasses);

    expect(divElement).not.toBeNull();

    // Con esto se barre cada una de las clases que tiene divElement, pero si en el html me ingresan una nueva clase por ejemplo pt-2 va a salir un error porque no esta definido en mustHaveClasses
    /*divElement?.classList.forEach( className => {
      expect( mustHaveClasses ).toContain(className);
    });*/


    // Con la siguiente linea si llegase a incluir una nueva clase en html, esta prueba pasaria pues se verifica son las clase que se definieron aca en cssClasses.
    const divClasses = divElement?.classList.value.split(' ');

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  // Vamos a realizar otra prueba para evaluar cosas del otro div
  it("should contain the 'buy me a beer' link ", () => {
    // Como hay un solo <a></a> lo definimos así
    const anchorElement = compiled.querySelector('a');

    // Primero que no sea nulo
    expect(anchorElement).not.toBeNull();

    expect(anchorElement?.title).toBe('Buy me a beer');

    console.log(anchorElement?.href);
    console.log(anchorElement?.getAttribute('href'));

    expect(anchorElement?.href).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );

    expect(anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );

    //anchorElement?.title = 'Buy me a beer';
    //anchorElement?.getAttribute('href') = 'https://www.buymeacoffee.com/scottwindon';

  });

});
