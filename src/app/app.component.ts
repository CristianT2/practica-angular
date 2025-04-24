import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Punto1Component } from './punto1/punto1.component';
import { Punto2Component } from "./punto2/punto2.component";

@Component({
  selector: 'app-root',
  imports: [Punto2Component],
  template: `
    <main>
      <section>
        <app-punto2></app-punto2>
      </section>
    </main>  
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-angular';
}
