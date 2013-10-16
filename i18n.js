/**
*
*	Module i18n.
*
*	Usage example:
*		__("Hello, how are you?");
*		__("I've bought %{count} items.", {items:3});
*
*
*	Defining translations.
*	Create a javascript file with following structure:
*	var i18n = {
*			language : "ca",		// Code language	
*			entries : {
*				"Hello, how are you?"         : "Hola, com estàs?",
*				"I've bought %{count} items." : "He comprat %{count} elements."
*			}
*		};
*
*	Include it before/after this script.
*/
(function( window, undefined ) {

	var i18n = null,		// collection of strings
	Translator = {};
	Translator.__ = function( msgid, params ) {
		load_entries();

		var translation = null;
		if( i18n.entries[msgid] ) {
			translation = i18n.entries[msgid];
		}
		else
		{
			translation = msgid;
			log_not_found( msgid, i18n.language );
		}

		return replace_params( translation, params );
	};

	var
	load_entries = function(){
		if( i18n===null ){
			i18n = {language:null,entries:{}};

			if( typeof window.i18n!=='undefined' ){
				i18n = window.i18n;
			}
		}
	},

	/**
	*	Replaces tokens %{VAR} in msgstr.
	*
	*	Exmaple:
	*		var replacement = replace_params( "I've bought %{num} items", {num:3} );
	*		// replacement = "I've bought 3 items";
	*/
	replace_params = function( msgstr, params ){
		if( params )
		{
			for( var p in params )
			{
				msgstr = msgstr.replace( new RegExp("\\%\\{" + p + "\\}", "gi" ), params[p] );
			}
		}
		return msgstr;
	},

	log_not_found = function( msgid, language ){

	};


	window.__ = Translator.__;
	if( typeof define ==='function' && define.amd ){
		module.exports = Translator.__;
	}

})( window );