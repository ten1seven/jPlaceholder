(function($){
	$.placeholder = function(el, options) {

		var base = this;

		base.$el = $(el);
		base.el = el;
		base.$parent = base.$el.closest('form');
		base.placeholder = base.$el.attr('placeholder');

		base.$el.data('placeholder', base);

		base.init = function() {
			base.options = $.extend({}, $.placeholder.defaultOptions, options);

			base.$el.addClass(base.options.inputClass);
			if (base.$el.val() === '') {
				base.$el.val(base.placeholder);
			}

			base.bind();
		};

		base.bind = function() {
			base.$el.on({
				'focus.placeholder': base.focusInput,
				'blur.placeholder': base.blurInput
			});

			base.$parent.on({
				'submit.placeholder': base.clearPlaceholder
			});
		};

		base.focusInput = function() {
			if (base.$el.val() === base.placeholder) {
				base.$el.val('').removeClass(base.options.inputClass);
			}
		};

		base.blurInput = function() {
			if (base.$el.val() === '') {
				base.$el.val(base.placeholder).addClass(base.options.inputClass);
			}
		};

		base.clearPlaceholder = function() {
			if (base.$el.val() === base.placeholder) {
				base.$el.val('');
			}
		};

		base.init();
	};

	$.placeholder.defaultOptions = {
		inputClass: 'placeholder'
	};

	$.fn.placeholder = function(options) {
		return this.each(function() {
			(new $.placeholder(this, options));
		});
	};

})(jQuery);