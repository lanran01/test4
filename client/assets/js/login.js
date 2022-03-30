$(function() {
    $('#link_login').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_reg').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pass: [
            /^[\S]{6,12}$/, 'password must have 6 to 12 digits，without space'
        ],

        repass: function(newpwd) {
            var oldpwd = $('.reg-box [name=password]').val()

            if (newpwd != oldpwd) {
                return 'password different'
            }
        }
    })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg('register success')
                $('#link_reg').trigger('click')
            }
        })
    })

    $('#form-login').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg('login success')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})