<?php

class Admin_Model_User extends Zend_Db_Table_Abstract
{
	protected $_name = 'users';
	public $id ='';

	public function addUser($name, $pw, $role) 
	{
		$row = $this->createRow();
    $row->name = $name;
    $row->password = md5($pw);
    $row->role = $role;
    $row->save();
    $this->id = $row->id;
    return $row->id;
	}

	public function editUser($id, $name=NULL, $pw=NULL, $role=NULL) 
	{
		$row = $this->find($id)->current();
		if($row) {

			if($name != NULL && $row->name != $name) {
				$row->name = $name;
			}

			if($pw != NULL && $row->password != md5($pw)) {
				$row->password = md5($pw);
			}

	    if($role != NULL && $row->role != $role) {
				$row->role = $role;
			}
	    $row->save();
	    $this->id = $row->id;
	    return $id;
		}
	}

	public function deleteUser($id)
	{
		$row = $this->find($id)->current();
		if($row) {
			$row->delete();
		}
	}

	public function getUserById($id)
	{
		$query = $this->select()
			->where('id = ?', $id);
		$row = $this->fetchAll($query);
		return $row;
	}

	public function getUsers() {
		$rowset = $this->fetchAll();
		return $rowset;
	}
}