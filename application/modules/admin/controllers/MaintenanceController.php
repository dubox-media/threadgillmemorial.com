<?php

class Admin_MaintenanceController extends Zend_Controller_Action
{
	public function init()
	{
		$auth = Zend_Auth::getInstance();

		if(!$auth->hasIdentity()){
    	$this->_redirect('/admin/login');
    }
    
		$this->view->headLink()->appendStylesheet('/styles/application/forms/styles.css');
	}	

	public function indexAction()
	{

	}
}