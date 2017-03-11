define(['app', 'ace', 'context', 'ext-language'], function(app) {
	function aceInit (id,lang) {
		editor = ace.edit(id);
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true
		});
		document.getElementById(id).style.fontSize = '14px';
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setMode("ace/mode/"+lang);
		return editor;
	}
	return {
		aceInit:aceInit
	}
})