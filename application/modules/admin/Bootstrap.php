<?php

class Admin_Bootstrap extends Zend_Application_Module_Bootstrap
{
	protected function _initRoutes()
	{
		$router = Zend_Controller_Front::getInstance()->getRouter();
		$config = new Zend_Config_Ini(dirname(realpath(__FILE__)) . '/configs/routes.ini');
		$router->addConfig($config, 'routes');
	}
}