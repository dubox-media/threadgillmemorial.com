$(function() {
	var user_row = $('.user-row').clone(),
			user_cont = $('fieldset.add-users');

	// Bind events
	$('.add-row').live('click', function() {
		addRow();
	});	

	$('.users-submit').live('click', function() {
		addUser();
	});

	$('.users-edit-submit').live('click', function() {
		editUsers();
	});

	$('.user-edit-row input, .user-edit-row textarea, .user-edit-row select').live('change', function() {
		$(this).closest('.user-edit-row').addClass('updated');
	});

	$('.icon').live('click', function() {
		accordion(this);
	});

	$('input[name=user-edit-delete]').live('click', function() {
		console.log(this);
		$(this).parent().parent().parent().parent().toggleClass('to-delete');
	});

	function addRow() {
		user_row = user_row.clone();
		user_cont.append(user_row);
	}

	function addUser() {
		var formdata,
				file,
				self,
				user_row = $('.user-row'),
				count = 0;

		// First, show the loader
		TM.loader('show');

		(function upload() {
			formdata = new FormData();

			self = user_row[count];
			
			formdata.append('user_name', $(self).children().find('input[name=user-name]').val());
			formdata.append('user_password', $(self).children().find('input[name=user-password]').val());
			formdata.append('user_type', $(self).children().find('select[name=user-type]').val());

			$.ajax({
				url: '/admin/users/add',
				data: formdata,
				//dataType: 'json',
				type: 'POST',
				cache: false,
				contentType: false,
				processData: false,
				success: function() {
					count++;
					console.log(count);
					if(count<user_row.length) 
					{
						setTimeout(upload(), 500);
					} else {
						refreshusers();
					}
				},
				error: function(xhr) {
					console.log(xhr)
				}
			});
		})();
	}

	function editUsers() {
		var formdata,
			file,
			self,
			data = {},
			id,
			vis,
			user_row = $('.updated'),
			count = 0;

		// First, show the loader
		TM.loader('show');

		// Loop through each updated item
		(function upload() {
			self = user_row[count];
			// First check if deletion is wanted, will save a lot of time
			if($(self).children().find('input[name=user-edit-delete]').is(':checked')) {
				data.user_id = $(self).children().find('input[name=row-id]').val();
				$.ajax({
					url: "/admin/users/delete",
					type: 'POST',
					// dataType: 'json',
					data: data,
					success: function() {
						count++
						console.log(count);
						if(count<user_row.length) 
						{
							setTimeout(upload(), 500);
						} else {
							refreshusers();
						}
					}
				});
			} else {
					formdata = new FormData();

					file = $(self).children().find('input[name=user-photo]')[0];

					formdata.append('user_id', $(self).find('input[name=row-id]').val())
					formdata.append('user_name', $(self).children().find('input[name=user-name]').val());
					formdata.append('user_password', $(self).children().find('input[name=user-password]').val());
					formdata.append('user_type', $(self).children().find('select[name=user-type]').val());

					$.ajax({
					url: '/admin/users/edit',
					data: formdata,
					//dataType: 'json',
					type: 'POST',
					cache: false,
					contentType: false,
					processData: false,
					success: function() {
						count++;
						console.log(count);
						if(count<user_row.length) 
						{
							setTimeout(upload(), 500);
						} else {
							refreshusers();
						}
					}
				});
			}
		})();
	}

	function refreshusers() {
		$.ajax({
			url: '/admin/users/refresh',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				$('.user-row-wrapper').html(data);
				$('.add-users .user-row').each(function() {
					$(this).remove();
				});
				$('.add-users>header').append(user_row.clone());
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