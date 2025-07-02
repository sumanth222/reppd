import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  constructor(private router: Router, private firestore: Firestore){}

  ngOnInit(){
    this.logPageVisit();
  }

  async logPageVisit() {
    try {
      const auditRef = collection(this.firestore, 'pageVisits');
      await addDoc(auditRef, {
        page: 'HomePage',
        timestamp: new Date(),
        referrer: document.referrer || 'Direct',
      });
    } catch (error) {
      console.error('Audit log failed:', error);
    }
  }

  navToBookNow(){
    this.router.navigate(['book'])
  }

  navToRequestPDF(){
    this.router.navigate(['requestPDF']);
  }
}
