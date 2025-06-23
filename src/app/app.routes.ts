import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { BookNow } from './pages/book-now/book-now';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home},
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'book', component: BookNow }
];

