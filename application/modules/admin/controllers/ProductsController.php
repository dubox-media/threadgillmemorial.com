<?php

class Admin_ProductsController extends Zend_Controller_Action
{
	public function init()
	{
		$auth = Zend_Auth::getInstance();

		if(!$auth->hasIdentity()){
    	$this->_redirect('/admin/login');
    }

    $this->view->headScript()->appendFile('/scripts/application/admin/products/scripts.js');
    $this->view->headLink()->appendStylesheet('/styles/application/admin/products/styles.css');
    $this->view->headLink()->appendStylesheet('/styles/application/forms/styles.css');
	}

	public function indexAction()
	{
		$auth = Zend_Auth::getInstance();

		if($auth->hasIdentity()){
    	$this->view->identity = $auth->getIdentity();
    }

    $product_model = new Admin_Model_Product();

    $currProducts = $product_model->getProducts();
    $currProductsArray = $currProducts->toArray();
    // foreach ($currProductsArray as $rowArray) {
    // 	foreach ($rowArray as $column => $value) {
    		
    // 	}
    // }
    $this->view->products = $currProductsArray;
	}

	public function addAction()
	{
		$this->_helper->layout->disableLayout();

		$product_model = new Admin_Model_Product();

		$res = array();

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		$baseDir = APPLICATION_PATH . '/../public/images/' . $res['product_type'];

    $file = $baseDir .'/' . $_FILES['product_photo']['name'];

    if(file_exists($file) == FALSE) {
    	move_uploaded_file($_FILES['product_photo']['tmp_name'], $file);
    }

    if(array_key_exists('product_visibility', $res)) {
			$res['product_visibility'] = TRUE;
		} else {
			$res['product_visibility'] = FALSE;	
		}
			
  	$add = $product_model->addProduct(
			$res['product_name'], 
			$res['product_type'], 
			$res['product_price'],
			$res['product_desc'],
			$file,
			$_FILES['product_photo']['name'],
			$res['product_visibility']
		);

		return json_encode($add);
	}
}