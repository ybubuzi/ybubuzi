
function cookieToJson() {
  const cookieObj = document.cookie.split(';').map((item) => item.split('=')).reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});

  return cookieObj || {}
}
function saveJsonToCookie(cookieObj){
  if(cookieObj){
    for(const key in cookieObj){
      const value = cookieObj[key]
      document.cookie = `${key}=${value};path=/`
    }
    //document.cookie = "night=0;path=/"
  }
}
$(document).ready(function () {
  //img lazy loaded
  const observer = lozad();
  observer.observe();

  $(document).on('click', '.has-sub', function () {
    var _this = $(this)
    if (!$(this).hasClass('expanded')) {
      setTimeout(function () {
        _this.find('ul').attr("style", "")
      }, 300);

    } else {
      $('.has-sub ul').each(function (id, ele) {
        var _that = $(this)
        if (_this.find('ul')[0] != ele && !expandAll) {
          setTimeout(function () {
            _that.attr("style", "")
          }, 300);
        }
      })
    }
  })
  $('.user-info-menu .hidden-sm').click(function () {
    const o = cookieToJson()
    if ($('.sidebar-menu').hasClass('collapsed')) {
      $('.has-sub.expanded > ul').attr("style", "")
      o.collapsed = 1
    } else {
      $('.has-sub.expanded > ul').show()
      o.collapsed = 0
    }
    saveJsonToCookie(o)
  })
  $("#main-menu li ul li").click(function () {
    $(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
    $(this).addClass('active'); // 添加当前元素的样式
  });
  $("a.smooth").click(function (ev) {
    ev.preventDefault();

    public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
    ps_destroy();
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 30
    }, {
      duration: 500,
      easing: "swing"
    });
  });
  return false;
});

var href = "";
var pos = 0;
$("a.smooth").click(function (e) {
  $("#main-menu li").each(function () {
    $(this).removeClass("active");
  });
  $(this).parent("li").addClass("active");
  e.preventDefault();
  href = $(this).attr("href");
  pos = $(href).position().top - 30;
});
(function () {
  const cookieObj = cookieToJson()
  if(cookieObj.night==='1'){
      document.body.classList.add('night');
      console.log('夜间模式开启');
  }else{
      document.body.classList.remove('night');
      console.log('夜间模式关闭');
  }
  if(cookieObj.collapsed==='1'){
    $('.sidebar-menu.toggle-others.fixed').addClass('collapsed')
  }else{
    $('.sidebar-menu.toggle-others.fixed').removeClass('collapsed')
  }
})();


/**
sidebar-menu toggle-others fixed collapsed
sidebar-menu toggle-others fixed
sidebar-menu-inner ps-container ps-active-y
sidebar-menu-inner ps-container ps-active-y
 */