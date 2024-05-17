import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements DoCheck {
  isMenuRequired = false;

  constructor(private router: Router) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;

    if (currentUrl == '/signIn' || currentUrl == '/login') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
