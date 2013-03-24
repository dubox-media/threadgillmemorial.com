$(function() {
	var product_row = $('.product-row').clone(),
			product_cont = $('fieldset.add-products');

	// Bind events
	$('.add-row').live('click', function() {
		addRow();
	});	

	$('.products-submit').live('click', function() {
		addProduct();
	});

	$('.products-edit-submit').live('click', function() {
		editProducts();
	});

	$('.product-edit-row input, .product-edit-row textarea, .product-edit-row select').live('change', function() {
		$(this).closest('.product-edit-row').addClass('updated');
	});

	$('.icon').live('click', function() {
		accordion(this);
	});

	$('input[name=product-edit-delete]').live('click', function() {
		console.log(this);
		$(this).parent().parent().parent().parent().toggleClass('to-delete');
	});

	function addRow() {
		product_row = product_row.clone();
		product_cont.append(product_row);
	}

	function addProduct() {
		var formdata,
				file,
				self,
				product_row = $('.product-row'),
				count = 0;

		// First, show the loader
		TM.loader('show');

		(function upload() {
			formdata = new FormData();

			self = product_row[count];
			
			file = $(self).children().find('input[name=product-photo]')[0];
			
			formdata.append('product_name', $(self).children().find('input[name=product-name]').val());
			formdata.append('product_type', $(self).children().find('select[name=product-type]').val());
			formdata.append('product_price', $(self).children().find('input[name=product-price]').val());
			formdata.append('product_visibility', $(self).children().find('input[name=product-visibility]').is(':checked'));
			formdata.append('product_tags', $(self).children().find('input[name=product-tags]').val());
			formdata.append('product_desc', $(self).children().find('textarea[name=product-desc]').val());
			formdata.append('product_photo', file.files[0]);

			$.ajax({
				url: '/admin/products/add',
				data: formdata,
				//dataType: 'json',
				type: 'POST',
				cache: false,
				contentType: false,
				processData: false,
				success: function() {
					count++;
					console.log(count);
					if(count<product_row.length) 
					{
						setTimeout(upload(), 500);
					} else {
						refreshProducts();
					}
				},
				error: function(xhr) {
					console.log(xhr)
				}
			});
		})();
	}

	function editProducts() {
		var formdata,
			file,
			self,
			data = {},
			id,
			vis,
			product_row = $('.updated'),
			count = 0;

		// First, show the loader
		TM.loader('show');

		// Loop through each updated item
		(function upload() {
			self = product_row[count];
			// First check if deletion is wanted, will save a lot of time
			if($(self).children().find('input[name=product-edit-delete]').is(':checked')) {
				data.id = $(self).children().find('input[name=row-id]').val();
				$.ajax({
					url: "/admin/products/delete",
					type: 'POST',
					// dataType: 'json',
					data: data,
					success: function() {
						count++
						console.log(count);
						if(count<product_row.length) 
						{
							setTimeout(upload(), 500);
						} else {
							refreshProducts();
						}
					}
				});
			} else {
					formdata = new FormData();

					file = $(self).children().find('input[name=product-photo]')[0];

					formdata.append('product_id', $(self).find('input[name=row-id]').val())
					formdata.append('product_name', $(self).children().find('input[name=product-name]').val());
					formdata.append('product_type', $(self).children().find('select[name=product-type]').val());
					formdata.append('product_price', $(self).children().find('input[name=product-price]').val());
					formdata.append('product_visibility', $(self).children().find('input[name=product-visibility]').is(':checked'));
					formdata.append('product_desc', $(self).children().find('textarea[name=product-desc]').val());
					formdata.append('product_tags', $(self).children().find('input[name=product-tags]').val());
					formdata.append('product_photo', file.files[0]);

					$.ajax({
					url: '/admin/products/edit',
					data: formdata,
					//dataType: 'json',
					type: 'POST',
					cache: false,
					contentType: false,
					processData: false,
					success: function() {
						count++;
						console.log(count);
						if(count<product_row.length) 
						{
							setTimeout(upload(), 500);
						} else {
							refreshProducts();
						}
					}
				});
			}
		})();
	}

	function refreshProducts() {
		$.ajax({
			url: '/admin/products/refresh',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				$('.product-row-wrapper').html(data);
				$('.add-products .product-row').each(function() {
					$(this).remove();
				});
				$('.add-products>header').append(product_row.clone());
				setAccordionIcons();
				TM.loader('hide');
			}
		});
	}

	function accordion(elem) {
		if($(elem).is('.icon-minus')) {
			$(elem).parent().parent().parent('.accordion').children('.accordion-content').slideUp(500, function() {
				$(elem).addClass('icon-plus').removeClass('icon-minus').parent()
					.parent().addClass('closed').removeClass('open');
			});
		} else {
			$(elem).parent().parent().parent('.accordion').children('.accordion-content').slideDown(500, function() {
				$(elem).addClass('icon-minus').removeClass('icon-plus').parent()
					.parent().addClass('open').removeClass('closed');
			});
		}
	}

	function setAccordionIcons() {
		var acc = $('.accordion');

		$(acc[0]).children().find('header.accordion-header').addClass('open').removeClass('closed');
		$(acc[0]).children().find('.icon').addClass('icon-minus').removeClass('icon-plus');
	}

	setAccordionIcons();
});