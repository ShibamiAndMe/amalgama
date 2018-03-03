$(document).ready(function () {

	// TinyMCE Editor
	tinymce.init({
		selector: '#tinymceTextarea',
		height: 300,
		max_height: 600,
		menubar: false,
		plugins: ['lists', 'link', 'image', 'emoticons' ],
		toolbar: [
			'undo redo | styleselect | fontselect | bullist | link image emoticons',
			'fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | subscript superscript | indent outdent | blockquote removeformat'
		],
		setup: function (editor) {
			editor.on('change', function (e) {
				liveTinyMCE();
			});
			editor.on('keyup', function (e) {
				liveTinyMCE();
			});
		}
	});

	function liveTinyMCE() {
		// STYLING CODE
		// HEADERS
		tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('h2'), 'post-headline');
		tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('h6'), 'text-muted');
		// IMAGES
		tinymce.activeEditor.dom.select('img').forEach(image => {
			// Not adding theme class if a emoticon is inserted
			if (!image.src.includes('tinymce/plugins/emoticons/img')) {
				tinymce.activeEditor.dom.addClass(image, 'br-30 mb-30');
			}
		});
		// BLOCKQUOTE
		tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('blockquote'), 'yummy-blockquote');

		// Update live editor
		$('#tinymceHtml').html(tinymce.activeEditor.getContent());
	}

	$('#tinymceSaveButton').click(function () {
		var data = {
			content: {
				html: tinymce.activeEditor.getContent(),
				text: tinymce.activeEditor.getContent({
					format: 'text'
				})
			}
		};
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/post/add',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		});
	});

});
