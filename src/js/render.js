//实现也买你渲染  img + info + like-btn
(function($,root){
    
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src',src)
            root.blurImg(img,$('body'));
        }
    }

    function renderInfo(info){
        var str = '<div class="song-name">'+info.song +'</div>\
        <div class="singer-name">'+info.singer +'</div>\
        <div class="album-name">'+info.album +'</div>';
        $('.song-info').html(str);
    }

    function renderIslike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    function renderlist(info){
        // console.log(info)
        var str = '';
        info.forEach(function(ele,index){
              str += '<li> '+ ele.song+' <span>-' +ele.singer + '</span></li>'
        })
        $('.list-wrapper').html(str);
    }
    root.render = function(data){
        renderImg(data.image)
        renderInfo(data)
        renderIslike(data.isLike)
    };
    root.randerList = {
        renderlist:renderlist
    }




})(window.Zepto,window.player || (window.player = {} ));


