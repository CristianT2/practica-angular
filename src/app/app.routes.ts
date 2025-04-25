import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Punto1Component } from './punto1/punto1.component';
import { Punto2Component } from './punto2/punto2.component';

export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'punto-1',
        component: Punto1Component,
        title: 'Noticias'
    },
    {
        path: 'punto-2',
        component: Punto2Component,
        title: 'Productos'
    }
];
