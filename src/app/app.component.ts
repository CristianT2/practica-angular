import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  template: `
    <header>
      <app-header></app-header>
    </header>
    <main>
      <section>
        <router-outlet></router-outlet>
      </section>
    </main> 
    <footer>
      <app-footer></app-footer>
    </footer> 
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-angular';
}
