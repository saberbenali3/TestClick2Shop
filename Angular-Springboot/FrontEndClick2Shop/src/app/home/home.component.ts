import { Component } from '@angular/core';
import { CsvService } from '../csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private csvService: CsvService, private router: Router) {}

  // Méthode pour appeler le service et rediriger vers CsvResultComponent
  fetchProductsAndRedirect(): void {
    this.csvService.fetchProductsFromCsv().subscribe(
      (count: number) => {
        // Redirection vers CsvResultComponent en passant le nombre de produits créés
        this.router.navigate(['/csv-result'], { queryParams: { count } });
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
        // Vous pouvez rediriger vers un autre message d'erreur si besoin
      }
    );
  }
}
