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
    $tags = array();
    foreach ($currProductsArray as $key => $value) {
    	if($currProductsArray[$key]['tags'] != NULL && $currProductsArray[$key]['is_visible'] == 'true') {
    		$unser = unserialize($currProductsArray[$key]['tags']);
    		$str = preg_split("/,\s*/", $unser);
    		foreach($str as $idx) {
    			if(!in_array(Array('tag' => $idx), $tags)) {
    				array_push($tags, Array('tag' => $idx));
    			}
    		}
    	}
    }
    $this->view->products = $currProductsArray;
    $this->view->tags = $tags;
	}

	public function casketsAction()
	{

	}

	public function urnsAction()
	{
		
	}
}