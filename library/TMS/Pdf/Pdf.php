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
	private $_file_name = ''; // Name to include in file 

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

		$this->_form_type = $form_type;
		$this->_form_objects = $form_objects;

		// Build the pdf
		$this->build_pdf();
	}

	/**
	 * Build pdf from web forms
	 */
	function build_pdf()
	{
		// Load config
		$config = new Zend_Config_Json(APPLICATION_PATH . '/configs/pdf/'. $this->_form_type.'.json');

		// Set global pdf values
		$pdf = Zend_Pdf::load(APPLICATION_PATH . '/../docs/PDF/'.$this->_form_type.'.pdf');
		$page = $pdf->pages[0];
		$font = Zend_Pdf_Font::fontWithName(Zend_Pdf_Font::FONT_HELVETICA);
		$page->setFont($font, 12);

		foreach ($this->_form_objects as $k0 => $v0) {
			foreach ($config->page_1 as $k1 => $v1) {
				if($k0 == $k1) {
					foreach ($v1 as $k2 => $v2) {
						// Draw text in page
						$page->drawText($v0, $v1->x, $v1->y);
						// Set file name
						if($k0 == 'name') {
							if(!empty($v0)) {
								$this->_file_name = str_replace(' ', '_', $v0);
							} else {
								$this->_file_name = '_';
							}
						}
					}
				}
			}
		}

		$save = $pdf->save(APPLICATION_PATH . '/../docs/PDF/'.$this->_file_name . '_' . $this->_form_type  .'_' . date('m_d_y') . '.pdf');
	}
}