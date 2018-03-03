$(document).ready(function () {

	// TinyMCE Editor
	tinymce.init({
		selector: '#tinymceTextarea',
		height: 300,
		autoresize_bottom_margin: 50,
		autoresize_max_height: 1500,
		menubar: false,
		plugins: [ 'autoresize', 'lists', 'link', 'image', 'emoticons' ],
		toolbar: [
			'undo redo | styleselect | fontselect | bullist | link image emoticons',
			'fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | subscript superscript | indent outdent | blockquote removeformat'
		],
		setup: function (editor) {
			// On init event. Used to add initial content if exist.
			editor.on('init', function(e) {
				// tinymce.activeEditor.setContent('<h1>Titulo</h1>\n<p>Ahora va una&nbsp;imagen&nbsp;<img src="../js/tinymce/plugins/emoticons/img/smiley-embarassed.gif" alt="embarassed" />:</p>\n<p><img class="br-30 mb-30" src="../img/blog-img/12.jpg" alt="Imagen" width="400" height="267" /></p>\n<blockquote class="yummy-blockquote">\n<p>Blockquote</p>\n<h6 class="text-muted">con Autor</h6>\n</blockquote>\n<p>Ahora va un poco de texto con <strong>negrita</strong>, <em>cursiva</em> y <span style="text-decoration: underline;">subrayado</span>.</p>\n<p>Una peque&ntilde;a lista:</p>\n<ul>\n<li>Punto uno</li>\n<li>Punto dos</li>\n<li>Punto tres</li>\n</ul>\n<p>Un <a title="enlace" href="editor" target="_blank" rel="noopener">enlace</a>.</p>\n<p style="text-align: center;">Ahora texto&nbsp;centrado.</p>\n<p style="text-align: right;">Texto a derechas.</p>\n<p style="text-align: justify;">Texto justificado.</p>\n<p>Y final.</p>');
				liveTinyMCE();
			});
			// On change event. Used to modify the preview section when there is some change in the editor.
			editor.on('change', function (e) {
				liveTinyMCE();
			});
			// On keyup event. Used to modify the preview section when the text inside the editor is changed.
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
