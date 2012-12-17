/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																												*
 *********************************************************************************************************************************************************/

/**********************************************************************************************************************************************************
 *	Threadgill_Memorial
 **********************************************************************************************************************************************************
 *
 * @desc: Main scripting resource for the Threadgill Memorial application.
 *
 *
 *
 *
 */
(function (global) {
	/**
	 * -------------------------------
	 * Threadgill_Memorial CONSTRUCTOR
	 * -------------------------------
	 */
	var Threadgill_Memorial_Index = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * ----------------------------------
	 * Threadgill_Memorial OBJECT METHODS
	 * ----------------------------------
	 */
	Threadgill_Memorial_Index.prototype = {
		/**
		 * ----
		 * INIT
		 * ----
		 */
		init:function () {
			var self = this;

			// Load dynamic page elements
			this.build_page();

			// Bind DOM events
			this.bind_events();
		},
		/**
		 * -----
		 * UTILS
		 * -----
		 * @desc: public object to modularize reptitive code/utilities
		 */
		_utils: {
			
		},
		/**
		 * ----------
		 * BUILD PAGE
		 * ----------
		 * @desc: general DOM manipulation if necessary
		 */
		build_page:function () {
			var self = this;

			/**
			 * Document Ready
			 */
			$(document).ready(function () {

			});

			/**
			 * Window Load
			 */
			$(window).load(function () {

			});
		},
		/**
		 * -----------
		 * BIND EVENTS
		 * -----------
		 * @desc: Object to house event bindings.
		 */
		bind_events: function() {
			var self = this;

		}
	}
	// Instantiate the local object
	new Threadgill_Memorial_Index();
})(window);


/************************************************************* END ***************************************************************************************/ 

