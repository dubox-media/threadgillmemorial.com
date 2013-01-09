<?php

class ContactController extends Zend_Controller_Action
{
	public function indexAction() 
	{

	}

	public function submitAction()
	{

		if(isset($_POST) && !empty($_POST)) {

			$subject = 'Contact submission from www.threadgillmemorial.com';

			// Change to deborah for production
			$to = 'ron@threadgillmemorial.com';

			$body ='<h1>Contact for submission from threadgillmemorial.com</h1>';
			$body .="\n";
			$body .="<h2>Contact Name:</h2>";
			$body .="\n";
			$body .= $_POST['first-name'] . ' ' . $_POST['last-name'];
			$body .="\n";
			$body .="<h2>Contact Email:</h2>";
			$body .="\n";
			$body .=$_POST['email'];
			$body .="\n";
			$body .="<h2>Contact Phone:</h2>";
			$body .="\n";
			$body .=$_POST['phone'];
			$body .="\n";
			$body .="<h2>Contact Message:</h2>";
			$body .="\n";
			$body .=$_POST['inquiry'];

			if($mail = new TMS_Mail_Mail($subject, $to, $body, NULL, NULL, FALSE)) {
				$r = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
    		$r->gotoUrl('/contact/thank-you')->redirectAndExit();
			}
		}
	}

	public function thankYouAction()
	{

	}
}