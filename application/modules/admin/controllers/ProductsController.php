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
    $this->view->products = $currProductsArray;
	}

	public function addAction()
	{
		$this->_helper->layout->disableLayout();

		$product_model = new Admin_Model_Product();

		$res = array();

		$file = NULL;
		$file_name = NULL;

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		if(isset($_FILES) && array_key_exists('product_photo', $_FILES)) {

			$baseDir = APPLICATION_PATH . '/../public/images/' . $res['product_type'];

			$file = $baseDir .'/' . $_FILES['product_photo']['name'];
			$rel_file_path = '/images/'. $res['product_type'] . '/' . $_FILES['product_photo']['name'];
			$file_name = $_FILES['product_photo']['name'];

	    if(file_exists($file) == FALSE) {
	    	move_uploaded_file($_FILES['product_photo']['tmp_name'], $file);
	    }
		}

  	$add = $product_model->addProduct(
			$res['product_name'], 
			$res['product_type'], 
			$res['product_price'],
			$res['product_desc'],
			$rel_file_path,
			$file_name,
			$res['product_visibility']
		);

		return json_encode($res);
	}

	public function editAction()
	{

		$this->_helper->layout->disableLayout();

		$product_model = new Admin_Model_Product();
    	
  	$res = array();

		$file = NULL;
		$file_name = NULL;

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		if(isset($_FILES) && array_key_exists('product_photo', $_FILES)) {

			$baseDir = APPLICATION_PATH . '/../public/images/' . $res['product_type'];

			$file = $baseDir .'/' . $_FILES['product_photo']['name'];
			$rel_file_path = '/images/'. $res['product_type'] . '/' . $_FILES['product_photo']['name'];
			$file_name = $_FILES['product_photo']['name'];

	    if(file_exists($file) == FALSE) {
	    	move_uploaded_file($_FILES['product_photo']['tmp_name'], $file);
	    }
		}

  	$edit = $product_model->editProduct(
  		$res['product_id'], 
			$res['product_name'], 
			$res['product_type'], 
			$res['product_price'],
			$res['product_desc'],
			$rel_file_path,
			$file_name,
			$res['product_visibility']
		);

		return json_encode($edit);
	}

	public function refreshAction() {
		$this->_helper->layout->disableLayout();

		$product_model = new Admin_Model_Product();
		$currProducts = $product_model->getProducts();
    $currProductsArray = $currProducts->toArray();
    $res = $this->view->partialLoop('partials/_products.phtml', $currProductsArray);

    echo json_encode($res);
	}

	public function deleteAction()
	{
		$this->_helper->layout->disableLayout();
		
		$product_model = new Admin_Model_Product();

		$res = array();

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		$delete = $product_model->deleteProduct($res['id']);

		return json_encode($delete);
	}
}