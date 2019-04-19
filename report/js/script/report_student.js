/**
 * Created by qjl on 2017/5/16.
 */
//2017-5-16 v4.3.9 新版本
//----------四舍五入----------
//页面加载----------------------------------
function yemianJIAzai(){
    var delay=document.getElementById("delay");
    var jiazai=document.getElementById("jiazai");
    jiazai.style.display="none";
    delay.style.display="block";
}

if(PersonReportData && typeof PersonReportData !== 'undefined'){
    delayload(contentType,perId);
    checkGrade();
    yemianJIAzai();
}
function checkGrade(){
    if(reportType==2||reportType==3){
        var rank=PersonReportData.thisTestScore.classSort;
        var Avg=PersonReportData.thisTestScore.classAvg;
        $('.GYDF_2').show();
        $('.GYDF_2_cRank span:nth-child(2)').text('班级排名：'+rank+'名');
        $('.GYDF_2_cAvr span:nth-child(2)').text('班级平均分：'+Avg+'分');
        $('.GYDF_2_gAvr span:nth-child(2)').hide();
    }

}
//动态添加数据。
function delayload(contentType,perId){
    //封面----->>>>>>>>>>>>>
    function deelwithFace() {
        var cover=PersonReportData.cover;
        $('.FMBT1 header>span').text('-'+cover.subjectName);
        $('#FMBT2_1 tr:nth-child(1)>td:nth-child(2)').html(cover.className);
        $('#FMBT2_1 tr:nth-child(2)>td:nth-child(2)').text(cover.studentName);
        $('.FMXX footer').text(cover.schoolName)
    }
    try {deelwithFace();} catch(err){}
    //概要----->>>>>>>>>>>>>
    function gaiyao(){
        //1-1得分情况
        var thisTestScore=PersonReportData.thisTestScore;
        $('#GYDF_1 span:nth-child(1)').text(thisTestScore.studentScore);
        $('#GYDF_1 span:nth-child(2)').text(thisTestScore.testAllScore);
        $('.GYDF_2').hide();
		$('.GYDF_1').after("<div style='text-align:center;font-size:2rem;color:gray;'>"+PersonReportData.cover.paperName+"</p>");;

        //1-2测试评价
        var evaluation=PersonReportData.evaluation;
        if(evaluation.excellentPoints.length>0){
            for(var i=0;i<evaluation.excellentPoints.length;i++){
                $('.GYPJ_2_l').append('<div>'+evaluation.excellentPoints[i]+'</div>')
            }
        }else{
            $('.GYPJ_2_l').append('<div>'+'无'+'</div>')
        }
        if(evaluation.weakPoints.length>0){
            for(var i=0;i<evaluation.weakPoints.length;i++){
                $('.GYPJ_2_r').append('<div>'+evaluation.weakPoints[i]+'</div>')
            }
        }else{
            $('.GYPJ_2_r').append('<div>'+'无'+'</div>')
        }
        if((evaluation.excellentPoints.length-evaluation.weakPoints.length)>0){
             $('.GYPJ_2>div:nth-child(1)').css('border-right','1px dashed black')
        }else{
            $('.GYPJ_2>div:nth-child(2)').css('border-left','1px dashed black')
        }

    }
    try{ gaiyao();}catch(err){}
    //题分方案----->>>>>>>>>>>>>
    //2-1题目分析
    function tifenfangan(){
        var datalist=PersonReportData.thisTestQuestionAnalyze.questionAnalyzeList;

        for(var i=0;i<datalist.length;i++){
            datalist[i].cnType='';
            switch(datalist[i].questionType)
            {
                case 1:
                    datalist[i].cnType='单选';
                    break;
                case 2:
                    datalist[i].cnType='多选';
                    break;
                case 3:
                    datalist[i].cnType='填空';
                    break;
                case 4:
                    datalist[i].cnType='简答';
                    break;
                  }
            var chazhi=parseInt(datalist[i].studentScore)-parseInt(datalist[i].score);
            var color='',font='';
             if(chazhi<0){
                 color='#de685c';font='white';
             }else{
                 color='#e3f2f5';font='black';
             }
            $('#TMFX_1_1').append(
                '<tr><td>'+datalist[i].number+'</td><td>'+datalist[i].cnType+'</td><td>'+datalist[i].points+'</td><td>'+datalist[i].score+'</td><td style="background-color:'+color+';color:'+font+'">'+datalist[i].studentScore+'</td></tr>'
            )

        }

    }
    tifenfangan();
    //2-2典型错题分析
    function cuotifenxi(){
        var datalist=PersonReportData.classicErrorQuestionExplain;
        function deelwithAnswer(){
            var a=datalist;
            for(var i=0;i< a.length;i++){
                a[i].text = formatQuestionText(a[i].text);
                var b= a[i].answers;
                //绑定abcd
                for(var j=0;j< b.length;j++){
                    //单选双选题
                    if(a[i].qtype==1||a[i].qtype==2){
                        if(j==0){
                            b[j].abcd="A";
                        }else if(j==1){
                            b[j].abcd="B";
                        }else if(j==2){
                            b[j].abcd="C";
                        }else if(j==3){
                            b[j].abcd="D";
                        }else if(j==4){
                            b[j].abcd="E";
                        }else if(j==5){
                            b[j].abcd="F";
                        }else if(j==6){
                            b[j].abcd="G";
                        }else if(j==7){
                            b[j].abcd="H";
                        }
                        //拼接一个完整的选择题选项
                        b[j].holeAnwser1=formatQuestionText1(b[j].answer);
                        //图片解析
                        b[j].holeAnwser= b[j].holeAnwser1;
                        //添加正确答案 属性
                        if(b[j].isrightanswer==1){
                            a[i].rightAnswer=b[j].abcd;
                        };
                    }
                    //简答题
                    if(a[i].qtype==4){
                        a[i].rightAnswer=b[j].answer

                    }
                    //填空题
                    if(a[i].qtype==3){
                        a[i].rightAnswer=b[j].answer
                    }
                }
            }
        }
        deelwithAnswer();
        function deelwithAnswer2(){
            var a=datalist;
            for(var i=0;i< a.length;i++){

                if(typeof a[i].testText !=='undefined'){
                    a[i].testText = formatQuestionText(a[i].testText);
                }
                if(typeof a[i].testAnswers !=='undefined'){
                    var b= a[i].testAnswers;
                    for(var j=0;j< b.length;j++){
                        //单选双选题
                        if(a[i].testQtype==1||a[i].testQtype==2){
                            if(j==0){
                                b[j].abcd="A";
                            }else if(j==1){
                                b[j].abcd="B";
                            }else if(j==2){
                                b[j].abcd="C";
                            }else if(j==3){
                                b[j].abcd="D";
                            }else if(j==4){
                                b[j].abcd="E";
                            }else if(j==5){
                                b[j].abcd="F";
                            }else if(j==6){
                                b[j].abcd="G";
                            }else if(j==7){
                                b[j].abcd="H";
                            }
                            //拼接一个完整的选择题选项
                            b[j].holeAnwser2=formatQuestionText1(b[j].answer);
                            //图片解析
                            //添加正确答案 属性
                            if(b[j].isrightanswer==1){
                                a[i].rightAnswer2=b[j].abcd;
                            }
                        }
                        //简答题
                        if(a[i].testQtype==4){
                            a[i].rightAnswer2=b[j].answer

                        }
                        //填空题
                        if(a[i].testQtype==3){
                            a[i].rightAnswer2=b[j].answer
                        }
                    }
                }
                //绑定abcd
         }
        }
        deelwithAnswer2();
        for(var i=0;i<datalist.length;i++){
            var xuanxiang='';
            for(var j=0;j<datalist[i].answers.length; j++){
                if(datalist[i].qtype==1||datalist[i].qtype==2){
                    xuanxiang += '<div style="float: left">'+datalist[i].answers[j].abcd+" "+"."+" "+'</div>'+ datalist[i].answers[j].holeAnwser;
                }
            }
            var xuanxiang2='';
            if(typeof datalist[i].testText =='undefined'||datalist[i].testText ==null){
                datalist[i].testText='';
            }
            if(typeof datalist[i].testExplain =='undefined'||datalist[i].testExplain ==null){
                datalist[i].testExplain='';
            }
            if(typeof datalist[i].testAnswers =='undefined'||datalist[i].testAnswers ==null){
                datalist[i].testAnswers=[];
            }else{
                for(var j=0;j<datalist[i].testAnswers.length; j++){
                    if(datalist[i].testQtype==1||datalist[i].testQtype==2){
                        xuanxiang2 += '<div style="float: left">'+datalist[i].testAnswers[j].abcd+" "+"."+" "+'</div>'+ datalist[i].testAnswers[j].holeAnwser2;
                    }
                }
            }
       $('#CTlist').append('<div class="DXCT_1">'+
                '<div class="DXCTpart1">'+
                '<div style="overflow: hidden">'+'<div style="float: left">'+datalist[i].errorNum+'. '+'</div>'+datalist[i].text+'</div>'+
                    xuanxiang+
                '</div>'+
                '<div class="DXCTpart2">'+'<div>'+'<span>分</span><span>析</span>'+'</div>'+'  ' +
                    '<div>'+formatQuestionText1(datalist[i].analysis)+'</div>' +
                '</div>'+
                '<div class="DXCTpart3">'+'<div>'+'<span>解</span><span>答</span>'+'</div>'+'  ' +
                    '<div>'+formatQuestionText1(datalist[i].explain)+'</div>' +
                '</div>'+
                '<div class="DXCTpart4">'+'<div>'+'<span>点</span><span>评</span>'+'</div>'+'  ' +
                    '<div>'+formatQuestionText1(datalist[i].comments)+'</div>' +
                '</div>'+
                '<div class="DXCTpart5">'+'<div>'+'<span>知</span><span>识</span><span>点</span><span>讲</span><span>解</span>'+'</div>'+'  ' +
                     '<div>'+formatQuestionText1(datalist[i].pointExplain)+'</div>' +
                '</div>'+
                '<div class="DXCTpart4">'+'<div>'+'<span>练</span><span>一</span><span>练</span>'+'</div>'+'  ' +
                     '<div>'+formatQuestionText1(datalist[i].testText)+'</div>' +
                      xuanxiang2+
                '</div>'+
                '<div class="DXCTpart4">'+'<div>'+'<span>练</span><span>一</span><span>练</span><span>答</span><span>案</span>'+'</div>'+'  ' +
                     '<div>'+formatQuestionText1(datalist[i].testExplain)+'</div>' +
                '</div>'+
                '</div>'
            );
        }
    }
    cuotifenxi();
    function qianghualianxi(){
        var datalist=PersonReportData.strengthenPractice;
        var src=PersonReportData.strengthenPracticeCodeUrl;
        $('#tpEWM').css('background-image','url("'+src+'")');
        function deelwithAnswer(){
            var a=datalist;
            for(var i=0;i< a.length;i++){
                a[i].text = formatQuestionText(a[i].text);
                var b= a[i].answers;
                //绑定abcd
                for(var j=0;j< b.length;j++){
                    //单选双选题
                    if(a[i].qtype==1||a[i].qtype==2){
                        if(j==0){
                            b[j].abcd="A";
                        }else if(j==1){
                            b[j].abcd="B";
                        }else if(j==2){
                            b[j].abcd="C";
                        }else if(j==3){
                            b[j].abcd="D";
                        }else if(j==4){
                            b[j].abcd="E";
                        }else if(j==5){
                            b[j].abcd="F";
                        }else if(j==6){
                            b[j].abcd="G";
                        }else if(j==7){
                            b[j].abcd="H";
                        }
                        //拼接一个完整的选择题选项
                        b[j].holeAnwser1=formatQuestionText1(b[j].answer);
                        //图片解析
                        b[j].holeAnwser= b[j].holeAnwser1;
                        //添加正确答案 属性
                        if(b[j].isrightanswer==1){
                            a[i].rightAnswer=b[j].abcd;
                        };
                    }
                    //简答题
                    if(a[i].qtype==4){
                        a[i].rightAnswer=b[j].answer

                    }
                    //填空题
                    if(a[i].qtype==3){
                        a[i].rightAnswer=b[j].answer
                    }
                }
            }
        }
        deelwithAnswer();
        $('#LXlist').append('<div class="QHLX_1"></div>');
        for(var i=0;i<datalist.length;i++){
            var xuanxiang='';
            for(var j=0;j<datalist[i].answers.length; j++){
                if(datalist[i].qtype==1||datalist[i].qtype==2){
                    xuanxiang += '<div style="float: left;padding-left:15px;">'+datalist[i].answers[j].abcd+" "+"."+" "+'</div>'+ datalist[i].answers[j].holeAnwser;
                }
            }
            $('#LXlist > .QHLX_1').append(
               '<div>'+ '<div style="overflow: hidden;">'+'<div style="float: left">'+(i+1)+'. '+'</div>'+datalist[i].text+
                    xuanxiang+
                '</div>')
        }
    }
    qianghualianxi();

    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    //处理试题
    function formatQuestionText(txt){

        txt = txt.toString().trim();


        if(txt.indexOf("<P>") == 0){
            txt = txt.substring(3,txt.length-4);
        }

        txt = "<DIV>" + txt + "</DIV>";

        // 替换图片地址
        var reg=new RegExp('src="/Public/pic/',"g");

        txt=txt.replace(reg,'src="http://img.51youpu.com/Public/pic/');

        return txt;
    }
    function formatQuestionText1(txt){
        txt = txt.toString().trim();
		txt = "<DIV>" + txt + "</DIV>";
        var txt=txt.replace(/(<P>)/g,"<div>");
        txt=txt.replace(/(<\/P>)/g,"<\/div>");
        //txt=txt.replace(/(解)/g,"");
        //txt=txt.replace(/(：)/g,"");
        txt=txt.replace(/<link rel="stylesheet" type="text\/css" href="http:\/\/img2.51youpu.com\/css\/question.css"\/>/,"");

        // 替换图片地址
        var reg=new RegExp('src="/Public/pic/',"g");

        txt=txt.replace(reg,'src="http://img.51youpu.com/Public/pic/');

        return txt;
    }

}
//周周清-判断没有强化练习或者薄弱知识点时，隐藏此项目
function weekClear(){
    if(PersonReportData.strengthenPractice.length<1 && PersonReportData.classicErrorQuestionExplain.length<1){
        var opart4=document.getElementsByClassName('part_4')[0];
        opart4.style.display='none';
    }
}
try{
    weekClear();
} catch(err) {
    //在此处理错误
}

var loadPdf=document.getElementById("loadPdf");
function bindUrlTOa(){
    var pdfUrl="http://115.29.220.75:8080/WKPDFReport/import?type="+11+"&key=id&value="+	     reportId+"&filename="+"RS"+reportId;

    loadPdf.href=pdfUrl;
    loadPdf.target="_blank"
}
bindUrlTOa();