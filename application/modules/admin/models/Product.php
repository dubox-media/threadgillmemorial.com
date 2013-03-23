<?php

class Admin_Model_Product extends Zend_Db_Table_Abstract
{
	protected $_name = 'products';
	public $id ='';

	public function addProduct($name, $type, $price, $desc, $uri, $photo_name, $visible)
	{
		$row = $this->createRow();
    $row->name = $name;
    $row->type = $type;
    $row->price = $price;
    $row->description = $desc;
    $row->photo_uri = $uri;
    $row->photo_name = $photo_name;
    $row->is_visible = $visible;
    $row->save();

    $this->id = $row->id;
    return $row->id;
	}

	public function getProducts() {
		$rowset = $this->fetchAll();
		return $rowset;
	}
}