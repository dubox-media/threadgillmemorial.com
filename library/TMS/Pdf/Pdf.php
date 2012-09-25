<?php 
/**
 * Threadgill Memorial Services
 *
 * @category   TMS
 * @package    TMS_PDF
 * @copyright  Copyright (c) Dubox Media
 */

/**
 * -----------
 * PDF LIBRARY
 * -----------
 * Handles all pdf generation for threadgillmemorial.com
 */
class TMS_PDF_Pdf
{

	// Protected Members

	// Private Members
	private $_form_type = ''; // Form type
	private $_form_objects = Array(); // Array of form vars

	// Public Members

	/**
	 * TMS_PDF Constructor
	 *	takes arguments from controller actions, determines
	 *	required libraries and sends generated pdf's to the mailer.
	 */
	function __construct($form_type, $form_objects)
	{
		/*
			Pseudo block:

			in the controller action we need to send:
			Form type and assoc array of vars to be inserted.

			Then in the generate pdf method we need to 
			load the proper config entry based on the form type
			and then insert each corresponding $_POST var into
			the pdf according to the x,y coords in the config files.

			So the biggest thing is to make sure naming is consistent
		*/

		$this->$_form_type = $form_type;
		$this->$_form_objects = $form_objects;

		// research use of __call() here to maybe create methods
		// on a 'per-form-type' basis

		$this->build_pdf();
	}

	/**
	 * Build pdf from web forms
	 */
	function build_pdf()
	{
		$config = new Zend_Config_Json(APPLICATION_PATH . '/configs')
	}
}