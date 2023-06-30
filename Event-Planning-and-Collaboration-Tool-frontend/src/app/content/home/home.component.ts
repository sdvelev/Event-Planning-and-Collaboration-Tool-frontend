import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogged: boolean = false;

  ngOnInit(): void {
    this.checkToken();
  }

  private checkToken(): void {
    const token = localStorage.getItem('tokenEventCrafter');
    this.isLogged = !!token;
  }
}
