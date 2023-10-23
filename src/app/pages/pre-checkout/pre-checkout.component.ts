import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '@app/components/cart-summary/cart-summary.component';
import { FooterComponent } from '@app/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.scss'],
  imports: [RouterModule, CartSummaryComponent, FooterComponent],
})
export class PreCheckoutComponent {}
