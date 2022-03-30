$(function() {
    getUserInfo()

    $('#btnLogout').on('click', function() {
        layui.layer.confirm('Are you sure to quit？', {
            icon: 3,
            title: 'tip',
            btn: ['confirm', 'cancel']
        }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.close(index)
        });
    })
})

function getUserInfo() {
    $('.layui-nav-img').hide()
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.msg)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // welcome user
    var name = user.nickname || user.username
    $('#welcome').html(`Welcome ${name}`)

    // user photo render
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}

function setNavSelected(origin, current) {
    $(origin).addClass('layui-this')
    $(current).removeClass('layui-this')
}