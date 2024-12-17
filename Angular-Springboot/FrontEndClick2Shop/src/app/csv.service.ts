import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private apiUrl = 'http://localhost:8080/api/fetch-products';  // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Méthode pour appeler l'API backend et obtenir le nombre de produits créés
  fetchProductsFromCsv(): Observable<number> {
    return this.http.get<number>(this.apiUrl);  // Appel GET pour récupérer le nombre de produits créés
  }
}
