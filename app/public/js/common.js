$(function() {

  // 自定义modal框
  let myModal = (content, cb, title='提示')=>{
    let modal = $('#my-common-modal');
    modal.find('.modal-title').text(title);
    modal.find('.modal-body').text(content);
    modal.modal('show');
    modal.on('hidden.bs.modal', function (e) {
      if(typeof(cb) === 'function') {
        cb();
      }
    });
    setTimeout(()=>{
      modal.modal('hide');
    }, 2000);
  }
  // 禁止按钮不允许提交
  $('.disabled').click((e)=>{
    return false
  })

  // 电影详情页评论回复
  $(".comment").click(function(e) {
    var target=$(this);
    var toId=target.data('tid');
    var commentId=target.data('cid');
    $('#toId').val(toId);
    $('#commentId').val(commentId);
    // 滚动到输入框
    window.scrollTo(0,$('#txt-area').offset().top - $('.navbar-fixed-top').height()-10);
  })

  // 根据name读取cookie
  let getCookie = (name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      return unescape(arr[2]); 
    } else {
      return null;
    }
  }

  // 修改用户信息
  $(".change-user-info").click(function(e){
    e.preventDefault();
    let form = $(this).closest('form');
    let actionUrl =  form.attr('action');
    if($(this).attr('id') === 'change-pwd') {
      // 说明是修改密码
      if(!$("#username").val()) {
        $("#username").tooltip({
          title: '用户名不能为空！'
        }).tooltip('show');
        setTimeout(()=>{
          $("#username").tooltip('destroy');
        }, 1500);
        return;
      }else if(!$("#oldpwd").val()) {
        $("#oldpwd").tooltip({
          title: '请输入旧密码！'
        }).tooltip('show');
        setTimeout(()=>{
          $("#oldpwd").tooltip('destroy');
        }, 1500);
        return;
      } else if(!$("#newpwd").val()) {
        $("#newpwd").tooltip({
          title: '请输入新密码！'
        }).tooltip('show');
        setTimeout(()=>{
          $("#newpwd").tooltip('destroy');
        }, 1500);
        return;
      }
      $.ajax({
        url: actionUrl,
        type: "POST",
        data: form.serialize(),
        dataType: 'json'
      })
      .done((results)=>{
        console.log('results:', results);
        if(results.success===1){
          myModal(results.msg, ()=>{
            window.location.reload();
          });
        } else {
          myModal(results.msg, ()=>{
            window.location.reload();
          });
        }
      })
    } else {
      // 说明是修改头像
      if($('#avatar')[0].files.length === 0) {
        return myModal('请选择图片！');
      }
      let formData = new FormData($('#avatar-form')[0]);
      $.ajax({
        url: actionUrl,
        type: 'POST',
        data: formData,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        // 告诉jQuery不要去处理发送的数据
        processData: false 
      })
      .done((results)=>{
        console.log('results avatar:', results);
        if(results.success===1){
          myModal(results.msg, ()=>{
            window.location.reload();
          });
        } else {
          myModal(results.msg, ()=>{
            window.location.reload();
          });
        }
      })
    }
  });


  // 用户修改信息，上传图片
  $('#avatar').change(function(){
    let that = $(this);
    let url = getFileUrl(that.attr('id'));
    $('#avatarPic').attr('src', url);
  })
  let getFileUrl = (sourceId)=>{
    let url = null;
    let blobData = $('#' + sourceId)[0].files;
    if(blobData.length < 1) {
      return false;
    }
    if(navigator.userAgent.indexOf('MSIE') >= 1) {
      url = $(sourceId).val();
    } else if(navigator.userAgent.indexOf('Firefox') > 0) {
      if(blobData.length > 0) {
        url = window.URL.createObjectURL($('#' + sourceId)[0].files.item(0));
      }
    } else if(navigator.userAgent.indexOf('Chrome') > 0) {
      url = window.URL.createObjectURL($('#' + sourceId)[0].files.item(0));
    } else {
      // 其他，如果支持就支持，不支持就算
      url = window.URL.createObjectURL($('#' + sourceId)[0].files.item(0));
    }
    return url;
  }

  // 添加评论
  $('#submit').click((e)=>{
    let data = $('#commentForm').serialize();
    let csrftoken = document.cookie
    console.log(data);
    e.preventDefault()
    
    $.ajax({
      url:'/comments/add',
      type:'POST',
      dataType: 'json',
      data: data
    })
    .done((results)=>{
      console.log('results:', results);
      if(results.success===1){
        window.location.reload();
      } else {
        console.log(results);
      }
    })
  })

  // 鼠标滑过评论区下用户头像，出现 “点击回复” 的 tooltip
  $('[data-toggle="tooltip-avatar"]').tooltip();
})