(function() {
	
	this.Widgeter = {
		prefix: 'widget-',
		path: "js/",
		widgets: [],
		init: function() {
			var els = $$('*[class*="' + this.prefix + '"]');
			var widgets_arr = [];
			els.each(function(item) {
				widgets_arr.extend(
					item.get('class')
					.split(" ")
					.filter(this.startsWithPrefix, this)
					.map(this.removePrefix, this),
				this);
			}, this);
			
			widgets_arr.each(this.initJS, this);
			
		},
		startsWithPrefix: function(classes_str) {
			return (classes_str.indexOf(this.prefix) == 0);
		},
		removePrefix: function(class_str) {
			return class_str.substr(this.prefix.length);
		},
		initJS: function(class_str) {
			if(this.widgets.contains(class_str)) return;
			this.widgets.push(class_str);
			Asset.javascript(this.path + class_str + ".js", {onload: this.logLoad.bind(this, class_str)});
		},
		logLoad: function(class_str) {
			$$("." + this.prefix + class_str).each(function(el) {
				new this[class_str](el);
			});
		}
	}
	
	this.addEvent('domready', Widgeter.init.bind(Widgeter));
	
	
})();