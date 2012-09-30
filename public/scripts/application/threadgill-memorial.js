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
	var Threadgill_Memorial = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * ----------------------------------
	 * Threadgill_Memorial OBJECT METHODS
	 * ----------------------------------
	 */
	Threadgill_Memorial.prototype = {
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
			accordion: function(elem) {
				var self = window.TM;

				// If closed:
				if($(elem).is('.closed')) {
					$(elem).parent().children('.accordion-content').slideDown(400, function() {
						$(elem).removeClass('closed').addClass('opened');
					});
				} else {
					$(elem).parent().children('.accordion-content').slideUp(400, function() {
						$(elem).removeClass('opened').addClass('closed');
					});
				}

			}
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

				$('#slide-show').epicSlide({
					slides: {
						slide_1: {
							image: '/images/slide_1.png',
							caption: ''
						},
						slide_2: {
							image: '/images/slide_2.png',
							caption: '',
							direction: 'bottom'
						},
						slide_3: {
							image: '/images/slide_3.png',
							caption: ''
						},
						slide_4: {
							image: '/images/slide_4.png',
							caption: '',
							direction: 'top'
						},
						slide_5: {
							image: '/images/slide_5.png',
							direction: 'right',
							caption: ''
						},
						slide_6: {
							image: '/images/slide_6.png',
							caption: ''
						}
					}
				});
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

			// Accordion
			$('.accordion>header').live('click', function(e) {
				console.log(e);
				self._utils.accordion(this);
			});
		}
	}
	// Instantiate the local object and push it to the window object
	window.TM = new Threadgill_Memorial();
})(window);


/************************************************************* END ***************************************************************************************/ 

