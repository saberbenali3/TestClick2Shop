<?php

// src/Controller/ProductController.php
namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'app_product')]
    public function list(ProductRepository $productRepository): Response
    {
        // Récupérer tous les produits avec la méthode findAll
        $products = $productRepository->findAll();

        // Passer la variable 'products' au template
        return $this->render('product/index.html.twig', [
            'products' => $products,
        ]);
    }
}