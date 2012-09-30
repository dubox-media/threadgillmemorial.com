<?php

class FormsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $form = new Form_Creamation();
        $this->view->form = $form;
    }

    public function submitFormAction()
    {
        if ($this->_request->isPost()) {
			
			$form_type = $this->_request->getParam('form_name');

            $form_values = $_POST;
            
            $pdf = new TMS_Pdf_Pdf($form_type, $form_values);
        }
    }

}



