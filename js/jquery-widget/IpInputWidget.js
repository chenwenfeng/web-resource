var IpInputWidget = function(el, defaultv, option) {
  this.el = $(el);
  this.v = defaultv;
  this.isOption = option || false;

  this.verify = 'info';
  this.init();
};


IpInputWidget.prototype.init = function() {
  var tmpl =
    '<div class="ip-input-box">' +
      '<input type="text" class="ip-input ip-input1" onfocus="this.value = this.value;">' +
      '<span class="dot">.</span>'+
      '<input type="text" class="ip-input ip-input2" onfocus="this.value = this.value;">' +
      '<span class="dot">.</span>'+
      '<input type="text" class="ip-input ip-input3" onfocus="this.value = this.value;">' +
      '<span class="dot">.</span>'+
      '<input type="text" class="ip-input ip-input4" onfocus="this.value = this.value;">' +
      '<div class="fack"></div>' +
    '</div>';

  this.el.empty().append(tmpl);

  this.bind();

  if(this.v) {
    this.set(this.v);
  }
};

IpInputWidget.prototype.bind = function() {
  this.inputBox = this.el.find('.ip-input-box');
  this.ip1 = this.el.find('.ip-input1');
  this.ip2 = this.el.find('.ip-input2');
  this.ip3 = this.el.find('.ip-input3');
  this.ip4 = this.el.find('.ip-input4');

  var self = this;
  this.ip1.keyup(function(e) {
    var s = self.ip1.val();
    if(e.which == 190) {
      s = s.substring(0, s.length - 1);
      self.ip1.val(s);
      self.ip2.focus();
    } else {
      if(s >= 0 && s < 1000) {
        if(s > 99) {
          self.ip2.focus();
        }
      } else {
        s = s.substring(0, s.length - 1);
        self.ip1.val(s);
      }
    }
  });
  this.ip2.keyup(function(e) {
    var s = self.ip2.val();
    if(e.which == 190) {
      s = s.substring(0, s.length - 1);
      self.ip2.val(s);
      self.ip3.focus();
    } else {
      if(s >= 0 && s < 1000) {
        if(s > 99) {
          self.ip3.focus();
        }
      } else {
        s = s.substring(0, s.length - 1);
        self.ip2.val(s);
      }
    }
  });
  this.ip3.keyup(function(e) {
    var s = self.ip3.val();
    if(e.which == 190) {
      s = s.substring(0, s.length - 1);
      self.ip3.val(s);
      self.ip4.focus();
    } else {
      if(s >= 0 && s < 1000) {
        if(s > 99) {
          self.ip4.focus();
        }
      } else {
        s = s.substring(0, s.length - 1);
        self.ip3.val(s);
      }
    }
  });
  this.ip4.keyup(function(e) {
    var s = self.ip4.val();
    if(e.which == 190) {
      s = s.substring(0, s.length - 1);
      self.ip4.val(s);
      self.ip4.blur();
    } else {
      if(s >= 0 && s < 1000) {
        if(s > 99) {
          self.ip4.blur();
        }
      } else {
        s = s.substring(0, s.length - 1);
        self.ip4.val(s);
      }
    }
  });

  this.ip2.on('keydown', function(e) {
    if(e.which == 8 || e.which == 46) {
      if(self.ip2.val() == '') {
        self.ip1.focus();
      }
    }
  });
  this.ip3.on('keydown', function(e) {
    if(e.which == 8 || e.which == 46) {
      if(self.ip3.val() == '') {
        self.ip2.focus();
      }
    }
  });
  this.ip4.on('keydown', function(e) {
    if(e.which == 8 || e.which == 46) {
      if(self.ip4.val() == '') {
        self.ip3.focus();
      }
    }
  });

  this.ip1.blur(function() {
    self.checkVerify();
    self.inputBox.removeClass('ip-input-box-focus'); 
  });
  this.ip2.blur(function() {
    self.checkVerify();
    self.inputBox.removeClass('ip-input-box-focus'); 
  });
  this.ip3.blur(function() {
    self.checkVerify();
    self.inputBox.removeClass('ip-input-box-focus'); 
  });
  this.ip4.blur(function() {
    self.checkVerify();
    self.inputBox.removeClass('ip-input-box-focus'); 
  });

  this.ip1.focus(function() {
    self.inputBox.removeClass('ip-input-box-valid');
    self.inputBox.removeClass('ip-input-box-invalid'); 
    self.inputBox.addClass('ip-input-box-focus'); 
  });
  this.ip2.focus(function() {
    self.inputBox.addClass('ip-input-box-focus'); 
    self.inputBox.removeClass('ip-input-box-valid');
    self.inputBox.removeClass('ip-input-box-invalid');  
  });
  this.ip3.focus(function() {
    self.inputBox.addClass('ip-input-box-focus'); 
    self.inputBox.removeClass('ip-input-box-valid');
    self.inputBox.removeClass('ip-input-box-invalid');  
  });
  this.ip4.focus(function() {
    self.inputBox.addClass('ip-input-box-focus'); 
    self.inputBox.removeClass('ip-input-box-valid');
    self.inputBox.removeClass('ip-input-box-invalid');  
  });
};

IpInputWidget.prototype.clearStyle = function () {
  this.inputBox.removeClass('ip-input-box-valid');
  this.inputBox.removeClass('ip-input-box-invalid');
};

IpInputWidget.prototype.checkVerify = function () {
  var flag = 'valid';
  if(
    this.check(this.ip1[0].value) &&
    this.check(this.ip2[0].value) &&
    this.check(this.ip3[0].value) &&
    this.check(this.ip4[0].value)
  ) {
    flag = 'valid';
  } else {
    flag = 'invalid';
  }

  if(this.isOption) {
    if(
      this.ip1[0].value == '' &&
      this.ip2[0].value == '' &&
      this.ip3[0].value == '' &&
      this.ip4[0].value == ''
    ) {
      flag = 'info';
    }
  }
  
  if(flag == 'valid') {
    this.inputBox.addClass('ip-input-box-valid');
    this.inputBox.removeClass('ip-input-box-invalid');
  } else if(flag == 'invalid') {
    this.inputBox.removeClass('ip-input-box-valid');
    this.inputBox.addClass('ip-input-box-invalid');    
  } else {
    this.inputBox.removeClass('ip-input-box-valid');
    this.inputBox.removeClass('ip-input-box-invalid');          
  }
  this.verify = flag;
  this.el.trigger('verify');
};

IpInputWidget.prototype.check = function(v) {
  var flag = true;
  try {
    v = parseInt(v);
    if(v >= 0 && v <= 255) {
      flag = true;
    } else {
      flag = false;
    }
  } catch(e) {
    flag = false;
  }
  return flag;
};

IpInputWidget.prototype.get = function() {
  if(this.verify == 'valid') {
    var arr = [
      this.ip1[0].value, 
      this.ip2[0].value, 
      this.ip3[0].value, 
      this.ip4[0].value
    ];
    return arr.join('.');
  } else {
    return '';
  }

};

IpInputWidget.prototype.set = function(ip) {
  var arr = ip.split('.');
  this.ip1.val(arr[0]||'');
  this.ip2.val(arr[1]||'');
  this.ip3.val(arr[2]||'');
  this.ip4.val(arr[3]||'');
};

IpInputWidget.prototype.enable = function(bool) {
  if(bool) {
    this.inputBox.removeClass('ip-input-box-disabled');
  } else {
    this.inputBox.addClass('ip-input-box-disabled');
  }    
};