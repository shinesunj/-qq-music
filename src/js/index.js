
var root = window.player;
var dataList;
var len;
var audio = root.AudioManager;
var control;
var timer = null;
var duration = 0;
var flag = true;


function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            len = data.length;
            control = new root.ControlIndex(len);
            dataList = data;
            root.randerList.renderlist(dataList)
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.pro.renderAllTime(data[0].duration)
            duration = data[0].duration;
            bindEvent();
            bindTouchEvent();
        },
        error:function(){
            console.log('error');
        }
    })
}
function bindEvent(){
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio)
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration)
        duration = dataList[index].duration;
        if(audio.status == 'play'){
            rotated(0);
            root.pro.start(0)
            audio.play();
            
        }else{
            root.pro.update(0);
        }
        $('.img-box').attr('data-deg',0)
        $('.img-box').css({
            'transform':'rotateZ('+ 0 +'deg)',
            'transition':'none'
        })
    });
    $('.prev').on('click',function(){
        var i = control.prev()
        $('body').trigger('play:change',i);
        root.pro.stop()
        if (audio.status == "play") {

            root.pro.start();
            root.pro.stop()
        } else {
            root.pro.stop()
            root.pro.update(0);

        }
    })
    $('.next').on('click',function(){
        var i = control.next()
        $('body').trigger('play:change',i);
        root.pro.stop()
        if (audio.status == "play") {

            root.pro.start();
            root.pro.stop()
        } else {
            root.pro.stop()
            root.pro.update(0);

        }
     
    })
    $('.play').on('click',function(){
       if(audio.status == 'pause'){
        // root.pro.stop();
           audio.play();
           root.pro.start();
           var deg = $('.img-box').attr('data-deg')
        //    console.log(deg)
           rotated(deg)
       }
       else{
           audio.pause();
           root.pro.stop();

           clearInterval(timer);

       }
       $('.play').toggleClass('playing');
    })

    $('.list').on('click',function(){
        if(flag){
            $('.playList').css({
                'bottom':0
            })
            flag = false;
        }
    })
    $('.close').on('click',function(){
        if(!flag){
            $('.playList').css({
                'bottom':-410
            })
            flag = true;
        }
    })

    $('.list-wrapper').on('click','li',function(){
        var i = $(this).index();
        root.pro.stop();
        $('body').trigger('play:change',i);
        root.pro.stop();
        audio.play();
        root.pro.start();
        $('.play').addClass('playing');
    })

}
function bindTouchEvent(){
    $('.slider').on('touchstart',function(e){
        root.pro.stop();
    }).on('touchmove',function(e){
        var left = $('.pro-bottom').offset().left;
        var width =  $('.pro-bottom').offset().width;
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        if(per >=0 && per < 1){
             root.pro.update(per)
        }
    }).on('touchend',function(e){
        var left = $('.pro-bottom').offset().left;
        var width =  $('.pro-bottom').offset().width;
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        var curTime = per * duration;
        if(per >=0 && per < 1){
        audio.playto(curTime);
        audio.play();
        root.pro.start(per)
        $('.play').addClass('playing');
       }

    })

}

$(audio.audio).on('ended',function(){
    $('.next').trigger('click');
    
})

function rotated(deg){
    clearInterval(timer);
    // var deg = 0;
    deg = +deg
   timer =  setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg)
        $('.img-box').css({
            'transform':'rotateZ('+ deg +'deg)',
            'transition':'all 1s ease-out'
        })
    },200)
}




getData('../mock/data.json')

//信息+上图片渲染到页面上
//点击按钮
//音频的播放与暂停 切歌
//进度条运动与拖拽
//图片旋转
//列表切歌