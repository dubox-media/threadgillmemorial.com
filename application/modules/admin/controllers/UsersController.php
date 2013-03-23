<?php

class Admin_UsersController extends Zend_Controller_Action
{
	public function init()
	{
		$auth = Zend_Auth::getInstance();

		if(!$auth->hasIdentity()){
    	$this->_redirect('/admin/login');
    }

    $this->view->headScript()->appendFile('/scripts/application/admin/users/scripts.js');
    $this->view->headLink()->appendStylesheet('/styles/application/admin/users/styles.css');
    $this->view->headLink()->appendStylesheet('/styles/application/forms/styles.css');
	}

	public function indexAction()
	{
		$auth = Zend_Auth::getInstance();

		if($auth->hasIdentity()){
    	$this->view->identity = $auth->getIdentity();
    }

    $user_model = new Admin_Model_User();
		$currUsers = $user_model->getUsers();
    $currUsersArray = $currUsers->toArray();
    $this->view->users = $currUsersArray;
	}

	public function addAction()
	{
		$this->_helper->layout->disableLayout();

		$auth = Zend_Auth::getInstance();

		$identity = NULL;

		if($auth->hasIdentity()){
    	$identity = $auth->getIdentity();
    }

		$user_model = new Admin_Model_User();

		$res = array();

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

  	$add = $user_model->addUser(
			$res['user_name'], 
			$res['user_password'],
			$res['user_type']
		);

		return json_encode($res);
	}

	public function editAction()
	{

		$this->_helper->layout->disableLayout();

		$user_model = new Admin_Model_User();
    	
  	$res = array();

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

  	$edit = $user_model->editUser(
  		$res['user_id'], 
			$res['user_name'], 
			$res['user_password'],
			$res['user_type']
		);

		return json_encode($edit);
	}

	public function refreshAction() {
		$this->_helper->layout->disableLayout();

		$user_model = new Admin_Model_User();
		$currUsers = $user_model->getUsers();
    $currUsersArray = $currUsers->toArray();
    $res = $this->view->partialLoop('partials/_users.phtml', $currUsersArray);

    echo json_encode($res);
	}

	public function deleteAction()
	{
		$this->_helper->layout->disableLayout();
		
		$user_model = new Admin_Model_User();

		$res = array();

		foreach ($_POST as $key => $value) {
			$res[$key] = $value;
		}

		$delete = $user_model->deleteuser($res['user_id']);

		return json_encode($delete);
	}
}