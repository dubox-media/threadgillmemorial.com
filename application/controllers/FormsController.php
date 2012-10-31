<?php

class FormsController extends Zend_Controller_Action
{

    public function init()
    {
        $this->view->headLink()->appendStylesheet('/styles/application/forms/styles.css');
        $this->view->headScript()->appendFile('/scripts/application/forms/scripts.js');
    }

    public function indexAction()
    {
        
    }

    public function submitFormAction()
    {
        if ($this->_request->isPost()) {
			
			$form_type = $this->_request->getParam('form_name');

            $form_values = $_POST;
            
            $pdf = new TMS_Pdf_Pdf($form_type, $form_values, TRUE);
        }
        
    }

    public function cremationFormAction()
    {
        $form = new Form_Creamation();
        $this->view->form = $form;
    }

    public function embalmingFormAction()
    {
        // action body
    }

    public function registrationFormAction()
    {
        // action body
    }


}









