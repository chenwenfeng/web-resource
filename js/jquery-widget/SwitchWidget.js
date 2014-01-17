var SwitchWidget = function(el, defaultStatus) {
  this.el = $(el);
  this.switchStatus = defaultStatus || 'on';
  this.duration = 100;

  this.init();
};

SwitchWidget.prototype.get = function() {
  return this.switchStatus;
};

SwitchWidget.prototype.getBool = function() {
  return this.switchStatus == 'on';
};

SwitchWidget.prototype.init = function() {
  var tmpl =
    '<div class="switch-bg">' +
      '<div class="inline-block left">ON</div>' +
      '<div class="inline-block right">OFF</div>' +
      '<div class="switch"></div>' +
    '</div>';
  this.el.empty().append(tmpl);
  this.switchBg = this.el.find('.switch-bg');
  this.switchBtn = this.el.find('.switch');
  this.switchBg.addClass(this.switchStatus);

  if(this.switchStatus =='on') {
    this.on();
  } else {
    this.off();
  }

  var self = this;
  this.el.click(function() {
    if(self.switchStatus == 'on') {
      self.off();
    } else {
      self.on();
    }
  });
};

SwitchWidget.prototype.on = function() {
  this.switchStatus = 'on';
  this.switchBg.addClass('on');
  this.switchBg.removeClass('off');
  this.switchBtn.animate({'left': '29px'}, this.duration, 'swing');
  this.el.trigger('on');
};

SwitchWidget.prototype.off = function() {
  this.switchStatus = 'off';
  this.switchBg.addClass('off');
  this.switchBg.removeClass('on');
  this.switchBtn.animate({'left': '2px'}, this.duration, 'swing');
  this.el.trigger('off');
};

SwitchWidget.prototype.set = function(bool) {
  if(bool) {
    this.on();
  } else {
    this.off();
  }
};