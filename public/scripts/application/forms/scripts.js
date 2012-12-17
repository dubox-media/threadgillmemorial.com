/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																																	*
 *********************************************************************************************************************************************************/

/**********************************************************************************************************************************************************
 *	Forms
 **********************************************************************************************************************************************************
 *
 * @desc: Main scripting resource for the Forms
 *
 *
 *
 *
 */
(function (global) {
	/**
	 * -------------------------------
	 * Forms CONSTRUCTOR
	 * -------------------------------
	 */
	var Forms = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * ----------------------------------
	 * Forms OBJECT METHODS
	 * ----------------------------------
	 */
	Forms.prototype = {
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
			
		}
	}
	// Instantiate the local object and push it to the window object
	window.Forms = new Forms();
})(window);


/************************************************************* END ***************************************************************************************/ 

