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
			
		},
		_UI: {
			accordion: function(elem) {
				var self = window.TM;

				// If closed:
				if($(elem).is('.closed')) {
					$(elem).closest('.accordion').find('.accordion-content').slideDown(400, function() {
						$(elem).removeClass('closed').addClass('opened');
					});
				} else {
					$(elem).closest('.accordion').find('.accordion-content').slideUp(400, function() {
						$(elem).removeClass('opened').addClass('closed');
					});
				}
			},
			_checkbox: {
				init: function(elem, grouping, max) {
					var self = this;

					// If grouping is supplied
					this.grouping = grouping || false;
					this.cbx = $(elem);
					this.max = max || 1;

					if(this.cbx.is('.checked')) {
						this.uncheck(this.cbx);
					} else if(this.cbx.is('.unchecked')) {
						this.check(this.cbx);
					}

					if(grouping) {
						if(grouping.children().find('.checked').length > this.max) {
							$('.checked').each(function() {
								if($(this).is(self.cbx) == false) {
									self.uncheck($(this))
								}
							});
						}
					}
				},
				uncheck: function(elem) {
					elem.removeClass('checked').addClass('unchecked');
					elem.children('input[type=checkbox]').prop('checked', false);
				},
				check: function(elem) {
					elem.removeClass('unchecked').addClass('checked');
					elem.children('input[type=checkbox]').prop('checked', true);
				}
			},
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

			// checkboxes
			$('.unchecked, .checked').live('click', function(e) {
				self._UI._checkbox.init(this, $('#container-wrapper'));
			});

			$('.opened, .closed').live('click', function() {
				self._UI.accordion(this);
			});
		}
	}
	// Instantiate the local object and push it to the window object
	window.TM = new Threadgill_Memorial();
})(window);


/************************************************************* END ***************************************************************************************/ 

