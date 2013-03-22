<?php

class Admin_IndexController extends Zend_Controller_Action
{
	public function init()
	{
		$this->view->headLink()->appendStylesheet('/styles/application/forms/styles.css');
	}

	public function indexAction()
	{
		$auth = Zend_Auth::getInstance();

		if(!$auth->hasIdentity()){
    	$this->_redirect('/admin/login');
    } else {
    	$this->view->identity = $auth->getIdentity();
    }
	}

	public function loginAction()
	{
		$auth = Zend_Auth::getInstance();

		if($auth->hasIdentity()) {
    	$this->_redirect('/admin/');
    } else {
    	if($this->_request->isPost()) {
    		$data = $_POST;
    		//set up auth adapter
				$db = Zend_Db_Table::getDefaultAdapter();
				$authAdapter = new Zend_Auth_Adapter_DbTable($db, 'users', 'name', 'password');
				$authAdapter->setIdentity($data['name']);
				$authAdapter->setCredential($data['password']);

				// Authenticate
				$result = $authAdapter->authenticate();
				if($result->isValid()) {
					$storage = $auth->getStorage();
					$storage->write($authAdapter->getResultRowObject(array('name')));
					$this->_redirect('/admin');
					// $user = $auth->getStorage()->read();
				} else {
					// Do stuff if necessary
				}
    	}
    }
	}

	public function logoutAction()
	{
		$auth = Zend_Auth::getInstance();
		$auth->clearIdentity();
		$this->_redirect('/admin/login');
	}
}