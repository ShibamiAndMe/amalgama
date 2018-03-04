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

	// editor.pug components
	var $postTitle = $('#postTitle');
	var $saveButton = $('#tinymceSaveButton');
	var $tinymceHtml = $('#tinymceHtml');
	var $postTags = $("#postTags");
	var $tinymceTags = $("#tinymceTags");

	var postTitle = { html: '', text: '' };
	// TODO: init tags
	var tags = [];//$postTags.tagit('assignedTags');

	$postTags.tagit({
		showAutocompleteOnFocus: false,
		allowSpaces: true,
		removeConfirmation: true,
		availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
		afterTagAdded: (event, ui) => {
			$tinymceTags.append('<a class="mr-1">' + ui.tagLabel + '</a>');
			tags.push(ui.tagLabel);
		},
		afterTagRemoved: (event, ui) => {
			console.log($tinymceTags.children()[0].text);
			for (var i = 0; i < $tinymceTags.children().length; i++) {
				if ($tinymceTags.children()[i].text === ui.tagLabel) {
					$tinymceTags.children()[i].remove();
					tags.splice(tags.indexOf(ui.tagLabel), 1);
				}
			}
		}
	});

	function initTags(tags) {
		if (tags != null && tags.length > 0) tags.forEach(tag => $tinymceTags.append('<a class="mr-1">' + tag + '</a>'));
	}

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
		$tinymceHtml.html(postTitle.html + tinymce.activeEditor.getContent());
	}

	$postTitle.on("keyup", function(eventObj) {
		postTitle.html = '<h2 class="post-headline">' + $postTitle.val() + '</h2>';
		postTitle.text = $postTitle.val();
		liveTinyMCE();
	});

	$saveButton.click(function (eventObj) {
		var data = {
			title: {
				html: postTitle.html,
				text: postTitle.text
			},
			content: {
				html: tinymce.activeEditor.getContent(),
				text: tinymce.activeEditor.getContent({ format: 'text' })
			},
			tags: $postTags.tagit('assignedTags')
		};
		var request = $.ajax({
			type: 'POST',
			url: '/api/post/add',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		});
		request.done(function(data, textStatus, jqXHR) {
			console.log('DONE:', data, textStatus, jqXHR);
		});

		request.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('FAIL:', jqXHR, textStatus, errorThrown);
		});
	});

});
