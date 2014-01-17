var SelectWidget = function(el, arr, defaultv) {
  this.el = $(el);
  this.el.addClass('select-wrapper');
  this.arr = arr;
  this.v = defaultv || arr[0].value;
  this.displayName = defaultv || arr[0].name;
  this.show = false;

  this.init();
};

SelectWidget.prototype.get = function() {
  return this.v;
};

SelectWidget.prototype.init = function() {
  var tmpl =
    '<div class="display-value-box">' +
      '<div class="inline-block display-value">' + this.displayName + '</div>' +
      '<div class="inline-block icon"></div>' +
    '</div>' +
    '<div class="select-list" style="display:none;">';

  $(this.arr).each(function(index, item) {
    tmpl +=
      '<div class="select-item" data="' + item.value + '">' + item.name + '</div>';
  });

  tmpl += '</div>';

  this.el.empty().append(tmpl);

  this.bind();
};

SelectWidget.prototype.bind = function() {
  this.selectContainer = this.el.find('.select-list');
  this.selects = this.el.find('.select-item');
  this.displayBox = this.el.find('.display-value-box');
  this.displayValue = this.el.find('.display-value');
  var self = this;

  this.selects.click(function() {
    self.v = $(this).attr('data');
    self.displayName = $(this).html();
    self.displayValue.html($(this).html());
    self.selectContainer.hide();
    self.show = false;
    self.el.addClass('select-wrapper-focus');
    self.el.trigger('selected');
    self.selects.removeClass('select-item-active');
    $(this).addClass('select-item-active');
  });

  this.displayBox.click(function() {
    if(self.show) {
      self.show = false;
      self.el.removeClass('select-wrapper-focus');
      self.selectContainer.hide();
    } else {
      self.show = true;
      self.el.addClass('select-wrapper-focus');
      self.selectContainer.show();
    }
  });

  $(document).click(function(e) {
    if($(e.target).parents('.select-wrapper').length == 0) {
      self.el.removeClass('select-wrapper-focus');
      self.show = false;
      self.selectContainer.hide();
    }
  });
};

SelectWidget.prototype.set = function(v) {
  var self = this;
  $(this.arr).each(function(index, s) {
    if(s.value == v) {
      self.v = v;
      self.displayName = s.name;
      self.displayValue.html(s.name);
    }
  });
  this.selects.each(function(i, s) {
    if($(s).attr('data') == v) {
      $(s).addClass('select-item-active');
    } else {
      $(s).removeClass('select-item-active');
    }
  });
};