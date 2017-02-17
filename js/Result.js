$(document).ready(function () {
    var h;
    var w;
    w=document.documentElement.clientWidth||window.screen.width;
    h=document.documentElement.clientHeight||window.screen.height;
    $('body').css('height',h);
    $('body').css('width',w);
    var cookies=document.cookie.split(";")[0].split("=")[1];   //利用split函数对cookies进行取值
    var test=sessionStorage.getItem('testKey'); // => 返回testKey对应的值
    if(test) { //判断session是否为空
        document.getElementById("request").innerHTML=test;
        $.get("php/Result.php",{name:test},function (data) {    //利用GET将值利用php去查询Mysql数据库
            if(data==0)   //判断数据库中是否有相应结果
            {
                $('#warning').fadeIn();
            }
            else
            {
                $number=data.split(" ",1)[0];
                $count=1;
                for(;$count<=$number;$count++){
                    $("div#div"+$count).fadeIn();
                }
                //将软件的各种信息通过for函数查询出来
                for($left=2,$right=1,$test=1,$start=0;$start<$number;$start++){
                    document.getElementById("name"+$test).innerHTML=data.split(" ",$left++)[$right++];
                    document.getElementById("company"+$test).innerHTML=data.split(" ",$left++)[$right++];
                    document.getElementById("picture"+$test).setAttribute("src",data.split(" ",$left++)[$right++]);
                    document.getElementById("url"+$test).setAttribute("href",data.split(" ",$left++)[$right++]);
                    $test++;
                }
            }
        });
    }
    else {
        document.getElementById("request").innerHTML=cookies;
        $.get("php/Result.php",{name:cookies},function (data) {
            if(data==0)
            {
                $('#warning').fadeIn();
            }
            else
            {
                $number=data.split(" ",1)[0];
                $count=1;
                for(;$count<=$number;$count++){
                    $("div#div"+$count).fadeIn();
                }
                for($left=2,$right=1,$test=1,$start=0;$start<$number;$start++){
                    document.getElementById("name"+$test).innerHTML=data.split(" ",$left++)[$right++];
                    document.getElementById("company"+$test).innerHTML=data.split(" ",$left++)[$right++];
                    document.getElementById("picture"+$test).setAttribute("src",data.split(" ",$left++)[$right++]);
                    document.getElementById("url"+$test).setAttribute("href",data.split(" ",$left++)[$right++]);
                    $test++;
                }
            }
        });
    }
    $("button#check").click(function () {
        if($("#content").val().toLowerCase()){
            document.cookie="name="+$("#content").val().toLowerCase();
            $.get("php/Result.php",{name:$('input#content').val()},function (data) {
                if(data==0)
                {
                    $('#warning').fadeIn();
                }
                else
                {
                    document.location.reload();
                    $number=data.split(" ",1)[0];
                    $count=1;
                    for(;$count<=$number;$count++){
                        $("div#div"+$count).fadeIn();
                    }
                    for($left=2,$right=1,$test=1,$start=0;$start<$number;$start++){
                        document.getElementById("name"+$test).innerHTML=data.split(" ",$left++)[$right++];
                        document.getElementById("company"+$test).innerHTML=data.split(" ",$left++)[$right++];
                        document.getElementById("picture"+$test).setAttribute("src",data.split(" ",$left++)[$right++]);
                        document.getElementById("url"+$test).setAttribute("href",data.split(" ",$left++)[$right++]);
                        $test++;
                    }
                }
            });
        }
    });
});
