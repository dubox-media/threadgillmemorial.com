<?php

class Admin_ProductsController extends Zend_Controller_Action
{
	public $thumb_size = '540';

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

		$auth = Zend_Auth::getInstance();

		$identity = NULL;

		if($auth->hasIdentity()){
    	$identity = $auth->getIdentity();
    }

		$product_model = new Admin_Model_Product();

		$res = array();

		$file = NULL;
		$file_name = NULL;

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		$tags = serialize($res['product_tags']);

		if(isset($_FILES) && array_key_exists('product_photo', $_FILES)) {

			$base_dir = APPLICATION_PATH . '/../public/images/' . $res['product_type'];

			$file = $base_dir .'/' . $_FILES['product_photo']['name'];
			$rel_file_path = '/images/'. $res['product_type'] . '/' . $_FILES['product_photo']['name'];
			$file_name = $_FILES['product_photo']['name'];

			if(file_exists($file) == FALSE) {
	    	move_uploaded_file($_FILES['product_photo']['tmp_name'], $file);
	    }

			$image = new Zend_Image($file,
		   new Zend_Image_Driver_Gd());
		  $transform = new Zend_Image_Transform($image);

	    if(file_exists($file)) {
	    	if($image->getWidth() > $this->thumb_size) {
	    		$transform->fitToWidth($this->thumb_size)->save($base_dir . '/thumbs/'.$file_name);
	    	} else {
	    		$transform->save($base_dir . '/thumbs/'.$file_name);
	    	}
	    }
		}

  	$add = $product_model->addProduct(
			$res['product_name'], 
			$res['product_type'], 
			$res['product_price'],
			$res['product_desc'],
			$rel_file_path,
			$file_name,
			$res['product_visibility'],
			$identity->name,
			$tags
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

		$tags = serialize($res['product_tags']);

		if(isset($_FILES) && array_key_exists('product_photo', $_FILES)) {

			$base_dir = APPLICATION_PATH . '/../public/images/' . $res['product_type'];

			$file = $base_dir .'/' . $_FILES['product_photo']['name'];
			$rel_file_path = '/images/'. $res['product_type'] . '/' . $_FILES['product_photo']['name'];
			$file_name = $_FILES['product_photo']['name'];

	    if(file_exists($file) == FALSE) {
	    	move_uploaded_file($_FILES['product_photo']['tmp_name'], $file);
	    }

			$image = new Zend_Image($file,
		   new Zend_Image_Driver_Gd());
		  $transform = new Zend_Image_Transform($image);

			if(file_exists($file)) {
	    	if($image->getWidth() > $this->thumb_size) {
	    		$transform->fitToWidth($this->thumb_size)->save($base_dir . '/thumbs/'.$file_name);
	    	} else {
	    		$transform->save($base_dir . '/thumbs/'.$file_name);
	    	}
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
			$res['product_visibility'],
			$tags
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
