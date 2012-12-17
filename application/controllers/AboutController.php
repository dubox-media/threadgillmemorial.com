<?php

class AboutController extends Zend_Controller_Action
{
	public function indexAction()
	{
		$this->view->headLink()->appendStylesheet('/styles/application/about/styles.css');
	}
}