(function() {
	
	this.Widgeter = {
		widgets: new Hash(),
		prefix: 'widget-',
		set: function(class_str, options) {
			this.widgets.set(class_str, options);
		},
		
		init: function(prefix) {
			prefix = prefix || this.prefix;
			this.widgets.each(function(options, class_str) {
				els_str = "." + prefix + class_str.toLowerCase();
				$$(els_str).each(function(el) {
					new this[class_str](el, options);
				});
			});	
		}
	}
	
	this.addEvent('domready', Widgeter.init.bind(Widgeter));
	
})();