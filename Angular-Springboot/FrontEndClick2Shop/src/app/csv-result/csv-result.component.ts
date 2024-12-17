import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-csv-result',
  templateUrl: './csv-result.component.html',
  styleUrls: ['./csv-result.component.css']
})
export class CsvResultComponent implements OnInit {
  createdProductCount: number = 0;
  message: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le nombre de produits créés depuis les queryParams
    this.route.queryParams.subscribe(params => {
      this.createdProductCount = params['count'];
      // Déterminer le message en fonction du nombre de produits créés
      if (this.createdProductCount > 0) {
        this.message = `Succès ! ${this.createdProductCount} produits ont été créés.`;
      } else {
        this.message = 'Aucun produit n\'a été créé. Veuillez réessayer.';
      }
    });
  }}
