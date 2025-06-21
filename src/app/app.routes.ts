import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: Services },
];

