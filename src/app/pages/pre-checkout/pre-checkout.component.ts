import { Component } from '@angular/core';
import { BottomNavbarComponent } from '@app/components/bottom-navbar/bottom-navbar.component';
import { CartSummaryComponent } from '@app/components/cart-summary/cart-summary.component';

@Component({
  standalone: true,
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.scss'],
  imports: [CartSummaryComponent, BottomNavbarComponent],
})
export class PreCheckoutComponent {}
