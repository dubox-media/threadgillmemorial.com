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
(function (window) {
	/**
	 * -------------------------------
	 * Forms CONSTRUCTOR
	 * -------------------------------
	 */
	var Products = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * ----------------------------------
	 * Forms OBJECT METHODS
	 * ----------------------------------
	 */
	Products.prototype = {
		/**
		 * ----
		 * INIT
		 * ----
		 */
		init:function () {
			var self = this;

			// Object members
			this.filter_type;

			// Load dynamic page elements
			this.build_page();
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
				self.bind_events();
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

			// Filters
			$('.filters input[type=checkbox]').live('change', function() {
				self.filterProducts(this);
			});

			// Type
			$('nav a').live('click', function(e) {
				e.preventDefault();
				self.filterTypes(this);
			});
		},
		filterProducts: function(el) {
			var self = this,
					type,
					active,
					filters = [],
					tags,
					qualified = [],
					products = $('.product-listing');

			$(el).toggleClass('active').parent().parent().toggleClass('selected');

			active = $('.active');

			for(var i=0; i<active.length; i++) {
				filters.push(active[i].name);
			}

			for(var p=0; p<products.length; p++) {
				type = products[p].getAttribute('data-type');
				if(filters.length > 0) {
					if(products[p].hasAttribute('data-tags')) {
						tags = products[p].getAttribute('data-tags');
						for(var f=0; f<filters.length; f++) {
							if(tags.match(filters[f]) !== null) {
								qualified.push(filters[f]);
							}
						}

						if(qualified.length == filters.length) {
							if(this.filter_type !== undefined) {
								if(this.filter_type == type) {
									$(products[p]).attr('style', 'display: block').addClass('matched');
								} else {
									$(products[p]).attr('style', 'display: none').removeClass('matched');			
								}
							} else {
								$(products[p]).attr('style', 'display: block').addClass('matched');
							}
						} else {
							$(products[p]).attr('style', 'display: none').removeClass('matched');
						}
						qualified.length = 0;
					} else {
						$(products[p]).attr('style', 'display: none').removeClass('matched');
					}
				} else {
					if(this.filter_type !== undefined) {
						if(this.filter_type == type) {
							$(products[p]).attr('style', 'display: block').addClass('matched');
						} else {
							$(products[p]).attr('style', 'display: none').removeClass('matched');			
						}
					} else {
						$(products[p]).attr('style', 'display: block').addClass('matched');
					}
				}
			}

			this.toggleMessage(filters.length);
		},
		filterTypes: function(el) {
			var self = this,
					attr,
					sel = $('#products-nav a'),
					filters = $('.active'),
					products = $('.product-listing');

			// Set object member
			if(this.filter_type == el.name) {
				this.filter_type = undefined;
			} else {
				this.filter_type = el.name;
			}

			for(var s=0; s<sel.length; s++) {
				if(sel[s].name == this.filter_type) {
					$(sel[s]).addClass('selected');
				} else {
					$(sel[s]).removeClass('selected');
				}
			}

			// First display products of the requested type
			for(var i=0; i<products.length; i++) {
				attr = products[i].getAttribute('data-type');
				(this.filter_type !== undefined && attr !== this.filter_type)? $(products[i]).hide() : $(products[i]).show();
			}

			// Reset filters
			for(var f=0; f<filters.length; f++) {
				$(filters[f]).prop('checked', false).removeClass('active').parent().parent().removeClass('selected');
			}

			this.toggleMessage(filters.length);
		},
		toggleMessage: function(f) {
			var self = this,
					no_match = $('h3.no-match');

			if($('.matched').length == 0) {
				if($('.active').length > 0) {
					no_match.show();
				} else {
					no_match.hide();
				}
			} else {
				no_match.hide();
			}
		}
	}
	// Instantiate the local object and push it to the window object
	window.Products = new Products();
})(window);


/************************************************************* END ***************************************************************************************/ 

