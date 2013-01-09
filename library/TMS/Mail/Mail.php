<?php
/**
 * Threadgill Memorial Services
 *
 * @category   TMS
 * @package    TMS_Mail
 * @copyright  Copyright (c) Dubox Media
 */

/**
 * ------------
 * MAIL LIBRARY
 * ------------
 * @desc: Class to generate mail messages
 */
class TMS_Mail_Mail
{
	// Members
	public $subject = '';
	public $to = '';
	public $body = '';
	public $config = '';
	public $attachment = '';
	public $att_name = '';

	protected $_mail = '';

	/**
	 * Constructor
	 */
	public function __construct($subject, $to=NULL, $body, $attachment=NULL, $att_name=NULL, $use_config=NULL)
	{
		$this->subject = $subject;
		$this->to = ($to == NULL)? 'stowell.kt@gmail.com' : $to;
		$this->body = $body;
		$this->attachment = ($attachment !== NULL) ? file_get_contents($attachment) : $attachment;
		$this->att_name = $att_name;
		$this->use_config = $use_config;
		$this->_mail = new Zend_Mail();

		$this->build_mail();
	}

	/**
	 * Builds mail data and prepares it for transport
	 */
	public function build_mail()
	{

		if($this->use_config) {
			// Load config
			try {		
				$message_body = new Zend_Config_Json(APPLICATION_PATH . '/configs/mail/messages.json');
			} catch(Exception $e) {
				throw Exception("Error Processing Request - contact site administrator", 1, $e);
			}

			// Set message body
			foreach ($message_body as $key => $value) {
				if($key == $this->body)
				{
					foreach ($value as $message_field => $message) {
						$this->_mail->setBodyHtml($message);
					}			
				} 
			}
		} else {
			$this->_mail->setBodyHtml($this->body);
		}

		// Set subject
		$this->_mail->setSubject($this->subject);

		// Set To
		$this->_mail->addTo($this->to);

		// Set From
		$this->_mail->setFrom('threadgillmemorial.com');

		if($this->attachment !== NULL) {
			$att = $this->_mail->createAttachment($this->attachment);
			$att->type = 'application/pdf';
			$att->disposition = Zend_Mime::DISPOSITION_ATTACHMENT;
			$att->encoding = Zend_Mime::ENCODING_BASE64;
			$att->filename = $this->att_name .'.pdf';
		}

		$this->send_mail();
	}

	/**
	 * Sends mail after construction
	 */
	public function send_mail()
	{
		//Set up smtp params
		$config = array(
			'auth'       =>  'login',
			'username'   =>  'stowell.kt@gmail.com',
			'password'   =>  '6beb5d8b-85fe-4e55-b26e-541967746743',
			// 'password' => 'threadgill',
			'port'       =>  '587'	
		);

		//Set up transport
		$transport = new Zend_Mail_Transport_Smtp('smtp.mandrillapp.com', $config);

		try {
			$this->_mail->send($transport);
		} catch(Exception $e) {
			echo "Error Sending mail. If you are seeing this message, please let us know!" . $e->getMessage();
		}
		return TRUE;
	}
}