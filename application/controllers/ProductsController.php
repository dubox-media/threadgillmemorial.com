<?php

class ProductsController extends Zend_Controller_Action
{
	public function indexAction()
	{
		$this->view->headLink()->appendStylesheet('/styles/application/products/styles.css');
	}
}