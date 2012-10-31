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
			var self = this;

			$('.form-item').live('mouseenter', function() {
				// self.caption(this,'show');
				var trgt = $(this).children().children('.form-item-caption');

				trgt.stop(true, false).delay(100).animate({
					'top': '-='+($(trgt).height()+10)
				}, 200, 'swing', function() {
				
				});
			});

			$('.form-item').live('mouseleave', function() {
				// self.caption(this,'show');
				var trgt = $(this).children().children('.form-item-caption');

				trgt.stop(true, false).animate({
					'top': '+='+($(trgt).height()+10)
				}, 200, 'swing', function() {
					$(this).css({
					'top' : '0'
				});
				});
			});
		},
		/**
		 * -------
		 * CAPTION
		 * -------
		 */
		caption: function(elem, action) {
			var self = this;
			console.log(elem, $(elem).find('.form-item-caption').height());
			var trgt = $(elem).children().children('.form-item-caption');
			console.log(trgt);
			trgt.animate({
				'top': (action == 'show')? '-='+$(this).height() : '+='+$(this).height()
			}, 200, function() {
				console.log(this);
			});
		}
	}
	// Instantiate the local object and push it to the window object
	window.Forms = new Forms();
})(window);


/************************************************************* END ***************************************************************************************/ 

