<?php

class ProductsController extends Zend_Controller_Action
{
	public function init() 
	{
		$this->view->headLink()->appendStylesheet('/styles/application/products/styles.css');
	}

	public function indexAction()
	{
		$product_model = new Admin_Model_Product();
		$currProducts = $product_model->getProducts();
    $currProductsArray = $currProducts->toArray();
    $this->view->products = $currProductsArray;
	}

	public function casketsAction()
	{

	}

	public function urnsAction()
	{
		
	}
}