/**
 * Deslpay modal window
 * @return {[type]} [description]
 */
function fibe() {
  var title;
  var text;
  var decor;
  var style;
  var button1_name;
  var button1_color;
  var button1_action;
  var button2_name;
  var button2_color;
  var button2_action;
  var type = 'alert';

  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object' && arguments[i] != null) {
        if ('title' in arguments[i]) {
          if (typeof arguments[i].title == 'string') {
            title = arguments[i].title;
          }
        }
        if ('text' in arguments[i]) {
          text = arguments[i].text;
        }
        if ('decor' in arguments[i]) {
          if (typeof arguments[i].decor == 'boolean') {
            decor = arguments[i].decor;
          }
        }
        if ('style' in arguments[i]) {
          if (findStyle(arguments[i].style)) {
            style = arguments[i].style;
          }
        }
        if ('button1' in arguments[i]) {
          if ('color' in arguments[i].button1) {
            if (findStyle(arguments[i].button1.color)) {
              button1_color = arguments[i].button1.color;
            }
          }
          if ('name' in arguments[i].button1) {
            if (typeof arguments[i].button1.name == 'string') {
              arguments[i].button1.name = arguments[i].button1.name.trim();
              if (arguments[i].button1.name.length > 0) {
                button1_name = arguments[i].button1.name;
              }
            }
          }
          if ('action' in arguments[i].button1) {
            if (typeof arguments[i].button1.action == 'function') {
              button1_action = arguments[i].button1.action;
            }
          }
        }
        if ('button2' in arguments[i]) {
          type = 'confirm';
          if ('color' in arguments[i].button2) {
            if (findStyle(arguments[i].button2.color)) {
              button2_color = arguments[i].button2.color;
            }
          }
          if ('name' in arguments[i].button2) {
            if (typeof arguments[i].button2.name == 'string') {
              arguments[i].button2.name = arguments[i].button2.name.trim();
              if (arguments[i].button2.name.length > 0) {
                button2_name = arguments[i].button2.name;
              }
            }
          }
          if ('action' in arguments[i].button2) {
            if (typeof arguments[i].button2.action == 'function') {
              button2_action = arguments[i].button2.action;
            }
          }
        }
      } else if (typeof arguments[i] == 'string' && arguments[i].length > 0) {
        if (findStyle(arguments[i])) {
          if (style == undefined) {
            style = arguments[i];
            continue;
          }
        }
        if (title == undefined) {
          title = arguments[i];
        } else if (text == undefined) {
          text = arguments[i];
        }
      } else if (typeof arguments[i] == 'boolean') {
        if (decor == undefined) {
          decor = arguments[i];
        }
      } else if (typeof arguments[i] == 'function') {
        if (button1_action == undefined) {
          button1_action = arguments[i];
        }
      }
    }
    if (title != undefined) {
      fibeRender(function() {
        fibeSetTitle(title);
        if (text != undefined) {
          fibeSetText(text);
        }
        if (decor != undefined) {
          if (!decor) {
            fibeRemoveDecor();
          }
        }
        if (button1_action != undefined) {
          button1Action(button1_action);
        } else {
          button1Action();
        }
        if (button1_name != undefined) {
          $('.fibe-button1 span').text(button1_name);
        }
        if (type == 'confirm') {
          if (button2_name == undefined) {
            button2_name = 'Action';
          }
          $('.fibe-buttons-row').append('<div class="fibe-button2"><span>' + button2_name + '</span></div>');
          $('.fibe-button2').append('<div class="button-fibe-shadow"></div>');
          if (button2_action != undefined) {
            button2Action(button2_action);
          } else {
            button2Action();
          }
          if (style != undefined) {
            fibeSetStyle(style);
          }
          if (button2_color != undefined) {
            $('.fibe-button2').css('background-color', button2_color);
          }
          if (button1_color == undefined) {
            $('.fibe-button1').css('background-color', '#888');
          } else {
            $('.fibe-button1').css('background-color', button1_color);
          }
        } else {
          if (style != undefined) {
            fibeSetStyle(style);
          }
          if (button1_color != undefined) {
            $('.fibe-button1').css('background-color', button1_color);
          }
        }
      });
    }
  }
}

function findStyle(myvar) {
  if (myvar.match(/^\#([a-f|0-9]){3,6}$/i)) {
    return true;
  } else if (myvar.match(/^rgba\(\s?\d{1,3}\s?\,\s?\d{1,3}\s?\,\s?\d{1,3}\s?\,\s?\d?\.?\d{1,4}?\s?\)$/i)) {
    return true;
  } else if (myvar.match(/^rgb\(\s?\d{1,3}\s?\,\s?\d{1,3}\s?\,\s?\d{1,3}\s?\)$/i)) {
    return true;
  } else if (myvar.match(/^success|warning|error$/i)) {
    return true;
  }
  return false;
}

function fibeRender(callback) {
  $('.fibe-shadow').remove();
  $('body').append('<div class="fibe-shadow"></div>');
  $('.fibe-shadow').append('<div class="fibe-window"></div>');
  $('.fibe-window').append('<div class="fibe-window-decor"></div>');
  $('.fibe-window').append('<h3 class="fibe-caption"></h3>');
  $('.fibe-window').append('<p class="fibe-text"></p>');
  $('.fibe-window').append('<div class="fibe-buttons-row"></div>');
  $('.fibe-buttons-row').append('<div class="fibe-button1"><span>Ок</span></div>');
  $('.fibe-button1').append('<div class="button-fibe-shadow"></div>');
  callback();
  $('.fibe-shadow').fadeIn(200);
  $('.fibe-window').animate({
    opacity: 1,
    top: 0
  }, 350);
}

function fibeSetTitle(text) {
  $('.fibe-caption').html(text);
}

function fibeSetText(text) {
  $('.fibe-text').append(text);
}

function fibeRemoveDecor() {
  $('.fibe-window-decor').remove();
}

function fibeSetStyle(style) {
  if (style == 'success') {
    $('.fibe-window-decor, .fibe-button1, .fibe-button2').css('background-color', '#72c34a');
  } else if (style == 'error') {
    $('.fibe-window-decor, .fibe-button1, .fibe-button2').css('background-color', '#f44336');
  } else if (style == 'warning') {
    $('.fibe-window-decor, .fibe-button1, .fibe-button2').css('background-color', '#FF9800');
  } else {
    $('.fibe-window-decor, .fibe-button1, .fibe-button2').css('background-color', style);
  }
}

function button1Action() {
  if (arguments[0]) {
    var action = arguments[0];
    $('.fibe-button1').on('click', function() {
      closeFibe();
      setTimeout(function() {
        return action();
      }, 250);
    });
  } else {
    $('.fibe-button1').on('click', function() {
      closeFibe();
    });
  }
}

function button2Action() {
  if (arguments[0]) {
    var action = arguments[0];
    $('.fibe-button2').on('click', function() {
      closeFibe();
      setTimeout(function() {
        return action();
      }, 250);
    });
  } else {
    $('.fibe-button2').on('click', function() {
      closeFibe();
    });
  }
}

function closeFibe() {
  $('.fibe-window').css('transition', '.2s');
  $('.fibe-window').css({
    transform: 'scale(0,0)',
    opacity: 0
  }, 350);
  $('.fibe-shadow').fadeOut(200);
}

$(function() {
  $('body').on('click', '.fibe-shadow', function(e) {
    if (e.target.className == 'fibe-shadow') {
      closeFibe();
    }
  });
});
