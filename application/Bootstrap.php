<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

	/**
	 *
	 * @var unknown_type
	 */

	/**
	 *
	 */
	protected function _initSession()
	{
		return Zend_Session::start();
	}

	/**
	 *
	 */
	protected function _initAutoload()
	{

		// Add autoloader empty namespace
		$autoLoader = Zend_Loader_Autoloader::getInstance();
		$autoLoader->registerNamespace('TMS_');
		$resourceLoader = new Zend_Loader_Autoloader_Resource(array(
			'basePath' => APPLICATION_PATH,
			'namespace' => '',
			'resourceTypes' => array(
				'model' => array(
					'path' => 'forms/',
					'namespace' => 'Form_'
				)
			)
		));
		// Return it so that it can be stored by the bootstrap
		return $autoLoader;
	}

	/**
	 *
	 */
	protected function _initLocale()
	{

		$locale = new Zend_Locale('en_US');
		Zend_Registry::set('Zend_Locale', $locale);
	}

	/**
	 * Sets various DOM info.
	 */
	protected function _initDoctype()
	{

		// Init the view
		$this->bootstrap('view');
		$view = $this->getResource('view');
		$view->doctype('HTML5');

		// Set title and separator
		$view->headTitle('Threadgill Memorial')
			->setSeparator(' | ');

		// Styles
		$view->headLink()->appendStylesheet('/styles/application/threadgill-memorial.css');

		// Scripts
		$view->headScript()->appendFile('/scripts/libs/jquery/jquery-1.7.1.js')
			->headScript()->appendFile('/scripts/libs/modernizr/modernizr.js')
			->headScript()->appendFile('/scripts/libs/1140/1140.js')
			->headScript()->appendFile('/scripts/plugins/epicSlide/epicSlide.js')
			->headScript()->appendFile('/scripts/plugins/mousewheel/jquery.mousewheel.js')
			->headScript()->appendFile('/scripts/plugins/spin/spin.js')
			->headScript()->appendFile('/scripts/application/threadgill-memorial.js');
	}
}
