import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [ RouterModule, HeaderComponent],
  template: `
    <header>
      <app-header></app-header>
    </header>
    <main>
      <section>
        <router-outlet></router-outlet>
      </section>
    </main>  
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-angular';
}
