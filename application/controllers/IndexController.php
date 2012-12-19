<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
    		$this->view->headLink()->appendStylesheet('/styles/application/index/styles.css');
        $this->view->headScript()->appendFile('/scripts/application/index/scripts.js');
    }


}

