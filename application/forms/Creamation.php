<?php
class Form_Creamation extends Zend_Form
{
	/**
	 * Creamation form init
	 *
	 * Builds a Zend Form object for the creamation form
	 */
	public function init()
	{
		$this->setAction('/forms/submit_form')
			->setMethod('post');

		// Page 1 name	
		$name = $this->createElement('text', 'name');
		$name->setLabel('Name of decedent: ');
		$this->addElement($name);

		// Gender
		$gender = $this->createElement('select','gender');
		$gender->setLabel('SEX: ');
		$this->addElement($gender);

		// DoB
		$dob = $this->createElement('text', 'dob');
		$dob->setLabel('Date of Birth: ');
		$this->addElement($dob);

		// SSN
		$ssn = $this->createElement('text', 'ssn');
		$ssn->setLabel('SSN: ');
		$this->addElement($ssn);

		// Container
		$container = $this->createElement('checkbox', 'container');
		$container->setLabel('Casket or Creamation Container');
		$this->addElement($container);

		// Tray
		$tray = $this->createElement('checkbox', 'tray');
		$tray->setLabel('Combustible tray: ');
		$this->addElement($tray);

		// Other
		$container_other = $this->createElement('text', 'container_other');
		$container_other->setLabel('Other: ');
		$this->addElement($container_other);

		// Ship Initials
		$ship_initials = $this->createElement('text', 'created_remains_ship_initials');
		$ship_initials->setLabel('Initial: ');
		$this->addElement($ship_initials);

		// Ship Name
		$ship_name = $this->createElement('text', 'creamated_remains_ship_name');
		$ship_name->setLabel('Creamated remains are to be sent to(name): ');
		$this->addElement($ship_name);

		// Ship address
		$ship_address = $this->createElement('text', 'creamated_remains_ship_address');
		$ship_address->setLabel('Address: ');
		$this->addElement($ship_address);

		// Called for initials
		$called_for_initials = $this->createElement('text', 'created_remains_called_for_by_initials');
		$called_for_initials->setLabel('Initial: ');
		$this->addElement($called_for_initials);

		// Called for name
		$called_for_name = $this->createElement('text', 'created_remains_called_for_by_name');
		$called_for_name->setLabel('Creamated remains will be called for by: ');
		$this->addElement($called_for_name);

		// Date
		$date = $this->createElement('text', 'date');
		$date->setLabel('Date: ');
		$this->addElement($date);

		// Print name
		$print_name = $this->createElement('text', 'print_name');
		$print_name->setLabel('Print Name');
		$this->addElement($print_name);

		// Relationship
		$relationship = $this->createElement('text', 'relationship');
		$relationship->setLabel('Relationship');
		$this->addElement($relationship);

		// Relationship Address
		$rel_address = $this->createElement('text', 'rel_address');
		$rel_address->setLabel('Address: ');
		$this->addElement($rel_address);

		// Telelphone
		$telephone_nbr = $this->createElement('text', 'telephone_nbr');
		$telephone_nbr->setLabel('Telelphone Nbr');
		$this->addElement($telephone_nbr);

		// Witness 
		$witness = $this->createElement('text', 'witness');
		$witness->setLabel('Witness: ');
		$this->addElement($witness);

		// Witness Date
		$witness_date = $this->createElement('text', 'witness_date');
		$witness_date->setLabel('Date: ');
		$this->addElement($witness_date);

		// Submit button
		$submit = $this->createElement('submit', 'submit_creamation_auhtorization');
		$this->addElement($submit);
	}
}