<?php

// src/Controller/TestCsvConvertController.php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class CsvConvertController extends AbstractController
{   
        private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/convert-csv', name: 'test_csv_convert')]
    public function index(): Response
    {


        $url = 'https://export.beezup.com/Son_Videocom/Affilae_FRA/ec84d19f-30c0-5102-958d-720856077d4e';
        
  
        $client = HttpClient::create();

   
        $response = $client->request('GET', $url, [
            'buffer' => true,
            'timeout' => 10, 
        ]);


        $content = $response->getContent();


        $content = mb_convert_encoding($content, 'UTF-8', 'auto');


        $lines = explode("\n", $content);


        $productSaved = [];


        $header = str_getcsv(array_shift($lines), ";"); 

       
        foreach ($lines as $line) {
            
            if (empty($line)) {
                continue;
            }
            $columns = str_getcsv($line, ";");


            $id = $columns[0];  
            $isPresent = false;
            $theCategory = '';
            
            if (strpos($columns[3], "Vidéoprojecteurs") !== false) {
                $isPresent = true;
                $theCategory = "Vidéoprojecteurs";
            }
            elseif (strpos($columns[3], "Barres de son") !== false) {
                $isPresent = true;
                $theCategory = "Barres de son";
            } else if (strpos($columns[3], "Télévision") !== false) {
                $isPresent = true;
                $theCategory = "Télévision";
            }
            if ($isPresent) {
                $product = new Product();
            
                $product->setId($columns[0]); 
                $product->setTitle($columns[1]); 
                $product->setCategory($theCategory); 
                
                $product->setAvailbilty($columns[8]); 
                $product->setPrice($columns[10]); 
                
                $productSaved[] = $product;
                $this->entityManager->persist($product);

            }

            $this->entityManager->flush();

        }


        return $this->render('csv_convert/index.html.twig', [
            'products' => $productSaved,
        ]);
    }
}

