import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Punto1Component } from './punto1/punto1.component';

@Component({
  selector: 'app-root',
  imports: [Punto1Component],
  template: `
    <main>
      <section>
        <app-punto1></app-punto1>
      </section>
    </main>  
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-angular';
}
