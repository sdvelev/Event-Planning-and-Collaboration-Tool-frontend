import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged: boolean = false;

  ngOnInit(): void {
    this.checkToken();
  }

  private checkToken(): void {
    const token = localStorage.getItem('tokenEventCrafter');
    this.isLogged = !!token;
  }
}
