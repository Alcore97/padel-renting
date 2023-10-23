import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DiscountService } from '../cart-summary/services/discount.service';

@Component({
  standalone: true,
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
})
export class BottomNavbarComponent {
  @Input() selectedIndex: number = 0;
  navigationItems = [
    { icon: 'home' },
    { icon: 'search' },
    { icon: 'shopping_cart' },
    { icon: 'credit_card' },
    { icon: 'check_circle_outline' },
  ];

  constructor(
    private router: Router,
    private discountService: DiscountService
  ) {}

  navigate(index: number): void {
    this.selectedIndex = index;
    this.discountService.getAiballCode().alreadyUsed = false;
    this.discountService.getFijoCode().alreadyUsed = false;
    switch (index) {
      case 0:
        this.router.navigate(['/']);
        break;
      case 1:
        this.router.navigate(['/products']);
        break;
      case 2:
        this.router.navigate(['/cart']);
        break;
      case 3:
        this.router.navigate(['/precheckout']);
        break;
      case 4:
        this.router.navigate(['/purchased-products']);
        break;

      default:
        break;
    }
  }
}
