/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 * @Description: image slider plugin
 *
 * Copyright (c) 2012 Ken Stowell,
 * https://github.com/ktstowell/epicSlide.js

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPReSS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIeS OF
 * MERCHANTABILITY, FITNeSS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGeS OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																																	*
 *********************************************************************************************************************************************************/
 
/**********************************************************************************************************************************************************
 *	epicSlide
 **********************************************************************************************************************************************************
 *
 * @desc: Main scripting resource for the epicSlide
 *
 *
 *
 *
 */
(function ($) {
	/**
	 * -------------------------------
	 * epicSlide INIT
	 * -------------------------------
	 */
	$.fn.epicSlide = function(options) {
		return this.each(function() {
			new epicSlide(this, options);
		});
	}
	/**
	 * -------------------------------
	 * epicSlide CONSTRUCTOR
	 * -------------------------------
	 *
	 * @desc: builds the default plugin options and sets scope for the epicSlide object
	 * @params: 	root - the object that epicSlide is called on
	 *						options - options provided when calling the epicSlide plugin
	 */
	var epicSlide = function (root, options) {
		var self = this;

		// Default options.
		this.options = $.extend({}, epicSlide.defaults, options);

		// Members 
		this.atp 		= this.options.autoplay; // Autoplay
		this.poh 		= this.options.pause_on_hover; // Pause
		this.dir  	= this.options.direction; // Direction
		this.trans  = this.options.transition; // Transition
		this.spd 		= this.options.speed; // Speed
		this.eas 		= this.options.easing; // Easing
		this.loop 	= this.options.loop; // Loop slide show
		this.itvl 	= this.options.interval; // Interval
		this.slds 	= this.options.slides; // Slides object
		this.timer; // Set timeout access

		// DOM components
		this.parent = $(root);
		this.es = 'section.epicSlide';
		this.wpr = 'ul.slide-wrapper';
		this.sld = '.slide';
		this.capt = '.caption';

		//instantiate object methods
		this.init();
	};

	/**
	 * -------------------------------
	 * epicSlide DEFAULTS
	 * -------------------------------
	 * 
	 * @desc: Default configuration fallbacks if not overriden by the user
	 */
	epicSlide.defaults = {
		autoplay: true,
		pause_on_hover: true,
		direction: 'left',
		transition: 'slide',
		speed: 1200,
		easing: 'swing',
		parent: '',
		loop: true,
		interval: 8000,
		slides: {}
	};

	/**
	 * -------------------------------
	 * epicSlide OBJECT METHODS
	 * -------------------------------
	 * 
	 * @desc: epicSlide class methods.
	 */
	epicSlide.prototype = {
		/**
		 * ----
		 * INIT
		 * ----
		 */
		init:function () {
			var self = this;

			// Init slider methods
			this._slides.init(this);
		},
		/**
		 * -----------
		 * BIND EVENTS
		 * -----------
		 * @desc: Object to house event bindings.
		 */
		bind_events: function() {
			var self = this;

		},
		/*******
		 * -----
		 * UTILS
		 * -----
		 * @desc: public object to modularize reptitive code/utilities
		 */
		_utils: {
			/**
			 * -------------
			 * GO FOR LAUNCH
			 * -------------
			 * @desc: checks after each iteration of slide injection
			 *				to see if the animation is ready to start
			 */
			go_for_launch: function(eS) {
				var self = this;

				var _eS = eS;
				var slides = 0; // Slides in user object
				var active_slides = $(_eS.sld).length; // Slides in the DOM

				// Get the amount of slides in the object
				for (var prop in eS.slds) {
					if(eS.slds.hasOwnProperty(prop)) {
						slides++;
					}
				}

				// If the amount of slides in the object and DOM are the same
				// start the animation.
				if(slides == active_slides) {
					eS._animations.init(eS);
				}
			}
		},
		/*********
		 * -------
		 * _SLIDES 
		 * -------
		 * @desc: object house for anything relating to slide csontruction
		 */
		_slides: {
			/**
			 * ----
			 * INIT
			 * ----
			 * @desc: _slider constructor
			 */
			init: function(_eS) {
				var self = this;

				// Members
				this._eS = _eS; // Parent, epicSlide object

				// Init functions
				this.extract_slide();
			},
			/**
		 	 * -------------
		 	 * EXTRACT SLIDE
		 	 * -------------
		 	 * @desc: extracts data from slides object
		 	 */
			extract_slide: function () {
				var self = this;

				// Slide counter
				var num = 1; 

				// Build slides from object
				if(self._eS.slds !== null && self._eS.slds !== undefined) {
					$.each(self._eS.slds, function(id, slide) {
						self.build_slide(id, num, slide.image, slide.caption, slide.direction, slide.transition, slide.speed);
						num++;
					});
				} else {
					this._eS.parent.append('<p>No slides found</p>');
				}
			},
			/**
			 * -----------
			 * BUILD SLIDE
			 * -----------
			 * @desc: after each slide has been extracted, inject it to the DOM
			 */
			build_slide: function(id, num, img, caption, dir, trans, spd) {
				var self = this;
				
				// Sets numer, direction and transition values. If none are user defined, fall back on defaults.
				var _num = 'data-number='+num;

				var _dir = (dir != null && dir != undefined && dir != '')? 'data-direction="'+dir+'"' 
					: 'data-direction="'+this._eS.dir+'"';

				var _trans = (trans != null && trans != undefined && trans != '')? 'data-transition="'+trans+'"' 
					: 'data-transition="'+this._eS.trans+'"';

				var _spd = (spd != null && spd != undefined && spd != '')? 'data-speed="'+spd+'"' 
					: 'data-speed="'+this._eS.spd+'"';

				var slide = 	'<li>'; // Slide wrapper
						slide +=	'<ul id="'+id+'" class="slide" '+_num+' '+_dir+' '+_trans+' '+_spd+'>'; // Slide container
						slide	+=	'<li><img src="'+img+'" alt="'+id+'"></li>';
						slide +=	(caption)? '<li class="caption">'+caption+'</li>' : '';
						slide	+=	'</ul>';
						slide	+=	'</li>';

				this.inject_slide(slide);
			},
			/**
			 * ------------
			 * INJECT SLIDE
			 * ------------
			 * @desc: takes the constructed slide and injects it into the dom.
			 */
			inject_slide: function(slide) {
				var self = this;

				// DOM components
				var wrapper = '<section class="epicSlide"><ul class="slide-wrapper"></ul></section>'; // Wrapper

				// if the wrapper doesn't exist, add it.
				if(this._eS.parent.children(this._eS.es).length <= 0) {
					this._eS.parent.append(wrapper);
				} 

				// Inject the slides
				$(self._eS.wpr).append(slide);

				// Determine if animation is ready to be launched
				this._eS._utils.go_for_launch(this._eS);

				// Apply caption styles inline to counter loss as a result of DOM manipulation
				$(this._eS.capt).css({
					'color':  'white',
			    'position': 'absolute',
			    'top':'0',
			    'left':'0',
			    'width': '100%',
			    'height': '32px',
			    'text-align': 'center',			    
			    'background-color': 'rgba(0,0,0,0.4)'
				});
			}
		},
		/*************
		 * -----------
		 * _animations 
		 * -----------
		 * @desc: object house for anything relating to slide animation
		 */
		_animations: {
			/**
			 * ----
			 * INIT
			 * ----
			 * @desc: _animations constructor
			 */
			init: function(eS) {
				var self = this;

				// Members
				this._eS = eS; // Cache the epicSlide object
				this.w = $(this._eS.es).width(); // epicSlide with
				this.h = $(this._eS.es).height(); // epicSlide height
				this.count = 0; // Index counter for slide animation

				// Event bindings
				this.bind_events();

				// Stage slides, pass animation method as callback
				this.stage_slides(this.animate_slides);
			},
			/**
			 * -----------
			 * BIND EVENTS
			 * -----------
			 */
			bind_events: function() {
				var self = this;

				// Stop events
				$(this._eS.sld).bind('click', function() {
					self._animation_controls.stop();
				});
			},
			/**
			 * ---------------
			 * BUILD ANIMATION
			 * ---------------
			 * @desc: loop through each slide gathering the properties for animation
			 */
			build_animation: function(slide) {
				var self = this;

				// Return object
				slide_data = {};

				// Cached members
				_dir = $(slide).attr('data-direction'); // Direction
				_trans = $(slide).attr('data-transition'); // Transition
				_spd = $(slide).attr('data-speed'); // Speed

				// Direction
				slide_data.dir = ( _dir != null && _dir != undefined)? (_dir) : self._eS.dir;
				// Transition
				slide_data.trans = (_trans)? (_trans) : self._eS.trans;
				// Speed
				slide_data.spd = (_spd)? (_spd) : self._eS.spd; 
				// Number
				slide_data.num = $(slide).attr('data-number');
				// Easing
				slide_data.eas = 'swing'; // Will change later once jq easing is integrated
				// Distance 
				slide_data.dist = (slide_data.dir == 'top')? '-='+self.h 
					: (slide_data.dir == 'right')? '+='+self.w 
						: (slide_data.dir == 'bottom')? '+='+self.h 
							: (slide_data.dir == 'left')? '-='+(self.w)
								: null;

				return slide_data;
			},
			/**
			 * ------------
			 * STAGE SLIDES
			 * ------------
			 * @desc: stage slides to be in the appropriate position relative to direction of animation
			 */
			stage_slides: function(animate) {
				var self = this;
				
				// Loop through each slide, extract data and stage appropriately
				$(this._eS.sld).each(function(idx, itm) {
					// Extract data from the slides
					var sld = self.build_animation(this);
					
					// Positional data
					var position = $(this).position();
					console.log(this, position);

					// Top css property
					var top = (sld.dir == 'top')?  position.top + self.h 
						: (sld.dir == 'bottom')? position.top - self.h 
							: (sld.dir == 'left')? position.top
								: (sld.dir == 'right')? position.top : null;
					
					// Left css property
					var left = (sld.dir == 'top')?  position.left
						: (sld.dir == 'bottom')? position.left
							: (sld.dir == 'left')? position.left+(self.w) 
								: (sld.dir == 'right')? position.left - (self.w) : null;			

					// Build string selector for each slide after the current one in the loop
					var selector = self._eS.sld+'[data-number='+(parseInt(sld.num)+1)+']';
					
					// Apply staging
					$(selector).css({
						'top': top,
						'left': left
					});
					console.log(left, top);
				});

				// Launch animation
				animate(this, this._eS);
			},
			/**
			 * --------------
			 * ANIMATE SLIDES
			 * --------------
			 * @desc: begin the slide animation. because this is being called as a callback, 'this' becomes the 'window'
			 *				object and thus global objects need to passed in accordingly.
			 */
			animate_slides: function(_this, _eS) {
				var self = _this,
						elems = $(_eS.sld);

				var animate = function() {
					epicSlide.timer = setTimeout(function() {
						// Get the first element in the stack
						var elem = $(elems).get(0);
						// If the specified index actually returns something.
						if (elem !== null && elem !== undefined) {
							// Get slide data
							var sld = self.build_animation(elem);

							// Animation properties
							var ani_props = {}; // Object
							// Direction
							var dir = (sld.dir == 'right')? 'left' 
								: (sld.dir == 'bottom')? 'top' 
									: sld.dir; 
							ani_props[dir] = sld.dist;

							// Animation options
							var ani_opts = {}; // Object
							ani_opts.duration = parseInt(sld.spd); // Speed
							ani_opts.easing = sld.eas; // Easing
							ani_opts.complete = function() {  // Completion callback
								// Prevent animation from continuing on last slide if looping is disabled.
								if(self.count == elems.length-1 && _eS.loop == false) {
									// Do something
								} else {
									// Recurse animation
									self.rebuild_slides(elem);
									// Increment counter
									self.count++
								}
							};
							
							// Animation
							$(_eS.wpr).stop().animate(ani_props, ani_opts);
						} else {
							return false;
						}
					}, _eS.itvl);				
				}
				// Launch animations
				animate();
			},
			/**
			 * ------------------
			 * REBUILD SLIDES
			 * ------------------
			 */
			rebuild_slides: function(slide) {
				var self = this;

				// Wil always be checked against the first slide.
				var $parent = $(slide).parent();

				
				// Reapply the number first slide to the bottom of the stack
				$parent.clone().appendTo($(self._eS.wpr));
				$parent.remove();

				// Renumber the	 slides
				$(this._eS.sld).each(function(idx, itm) {
					$(this).attr('data-number', idx+1);
				});

				// Rebuild slide data
				self.stage_slides(self.animate_slides);
			},
			/**
			 * ------------------
			 * ANIMATION CONTROLS
			 * ------------------
			 * @desc: child object of _animations containing all flow control functions.
			 */
			_animation_controls: {
				stop: function() {
					var self = epicSlide;
					console.log(self.timer)
					clearTimeout(self.timer);
				}
			}
		}
	};
})(jQuery);

/************************************************************* END **************************************************************************************/