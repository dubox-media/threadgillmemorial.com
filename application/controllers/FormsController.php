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

    public function pdfAction()
    {
        if ($this->_request->isPost()) {

					$config = new Zend_Config_Json(APPLICATION_PATH . '/configs/pdf/creamation.json');

					// exit(print_r($config->name->x));

					$pdf = Zend_Pdf::load('creamation_authorization.pdf');
					$page = $pdf->pages[0];
					$font = Zend_Pdf_Font::fontWithName(Zend_Pdf_Font::FONT_HELVETICA);
					$page->setFont($font, 42);
					$page->drawText('HAI', 40, 400);
					$save = $pdf->save(APPLICATION_PATH . '/../docs/PDF/new.pdf');
					exit(print_r($save));
        	//$this->_redirect('/forms/index');
        }
    }

}



