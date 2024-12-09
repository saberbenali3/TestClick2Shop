<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Fields;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ProductCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Product::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            NumberField::new('id')->onlyOnIndex(),
            TextField::new('title') 
                ->setLabel('Product Title')
                ->setHelp('Le titre du produit'),

                TextField::new('availbilty') 
                ->setLabel('availbilty')
                ->setHelp('availbilty'),


                TextField::new('price') 
                ->setLabel('Price')
                ->setHelp('Le prix du produit en unité monétaire'),

            ChoiceField::new('category') 
                ->setLabel('Category')
                ->setChoices([
                    'Télévision' => 'Télévision',
                    'Barres de son' => 'Barres de son',
                    'Vidéoprojecteurs' => 'Vidéoprojecteurs',
                ])
                ->setHelp('Sélectionnez la catégorie du produit'),

        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle(Crud::PAGE_INDEX, 'Product List')
            ->setPageTitle(Crud::PAGE_NEW, 'Create New Product')
            ->setPageTitle(Crud::PAGE_EDIT, 'Edit Product');
    }
}
