$(function() {
  $('.avatar').click(function() {
    $(this).toggleClass('dropdown');
  });
  // 点赞功能 ajax提交
  $('.stat-appreciations').on('click', function() {
    // 判断是否登录 待优化
    if ($(this).attr('name') == 'isLogin') {
      var poetryId = $(this).parents('.poetry-item').attr('data-poetryid');
      var likesNum = Number($(this).text());
      var inc;
      if ($(this).hasClass('likes')) {
        $(this).removeClass('likes');
        inc = -1;
        likesNum -= 1;
        $(this).text(likesNum);
      } else {
        $(this).addClass('likes');
        inc = 1;
        likesNum += 1;
        $(this).text(likesNum);
      }
      var info = {
        poetryId: poetryId,
        incNum: inc
      };
      sendLikes(info);
    } else {
      alert('请先登录！');
    }
  });
  function sendLikes(data) {
    $.ajax({
      url: '/poetry/likes',
      type: 'POST',
      data: data
    });
  }
  // 上传图片是否为空
  var $avatarFile = $('#upload-avatar');
  var $avatarBtn = $('#upload-avatar-btn');
  $avatarBtn.click(function() {
    if (!$avatarFile.val()) {
      $avatarBtn.parent().append('<p class="no-pic-tips">请选择一张图片</p>');
      setTimeout(function() {
        $avatarBtn.parent().find('.no-pic-tips').fadeOut('slow', function() {
          $(this).remove();
        });
      }, 1000);
      return false;
    }
  });
});

// 头像预览 html5 FileReader()
function showImage() {
  var img = document.getElementById('upload-avatar').files[0];
  var imgParent = img.parentNode;
  var show = document.getElementById('show-avatar');
  if (!/image\/\w+/.test(img.type)) {
    alert('仅支持 jpg、png 格式大小 5M 以内图片。');
    return false;
  }
  var reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function(e) {
    show.style.backgroundImage = 'url(' + e.target.result + ')';
  };
}
