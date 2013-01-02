<?php

class TestimonialsController extends Zend_Controller_Action
{
	public function indexAction()
	{
		$this->view->headLink()->appendStylesheet('styles/application/testimonials/styles.css');
	}
}