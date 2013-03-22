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
			formdata.append('product_visibility', $(self).children().find('input[name=product-visibility]').val());
			formdata.append('product_desc', $(self).children().find('textarea[name=product-desc]').val());
			formdata.append('product_photo', file.files[0]);

			$.ajax({
				url: '/admin/products/add',
				data: formdata,
				dataType: 'json',
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
						TM.loader('hide');
					}
				}
			});
		})();
	}


	function accordion(elem) {
		if($(elem).is('.icon-minus')) {
			$(elem).parent().parent().parent('.accordion').children('.accordion-content').slideUp(500, function() {
				$(elem).addClass('icon-plus').removeClass('icon-minus');
			});
		} else {
			$(elem).parent().parent().parent('.accordion').children('.accordion-content').slideDown(500, function() {
				$(elem).addClass('icon-minus').removeClass('icon-plus');
			});
		}
	}
});