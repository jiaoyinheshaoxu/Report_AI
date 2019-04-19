/**
 * Created by qjl on 2016/12/23.
 */
//2017-3-14  'old' 学科能力图谱结构新旧判断
function fullScoreJurge(fullId){

    var fs_goodword=document.getElementById("fs_goodword");
    var fs_problem=document.getElementById("fs_problem");
    var fs_highPoint=document.getElementById("fs_highPoint");
    var fs_weekPoint=document.getElementById("fs_weekPoint");
    var errorTest=document.getElementById("errorTest");
    var strongNum=document.getElementById("strongNum");
    if(fullId){
        fs_goodword.style.display="block";
        fs_problem.style.display="none";


        fs_highPoint.style.display="block";
        fs_weekPoint.style.display="none";
        var highPiont=PersonReportData.highPoint;
        if(highPiont && highPiont.length>0){
            fs_highPoint.style.display="block";
        }else{
            fs_highPoint.style.display="none";
        }

        errorTest.style.display="none";
        strongNum.innerHTML="1";
    }else{
        fs_goodword.style.display="none";
        fs_problem.style.display="block";


        fs_highPoint.style.display="none";
        fs_weekPoint.style.display="block";

        errorTest.style.display="block";
        strongNum.innerHTML="2";
    }

}

try{
    fullScoreJurge(fullId);
}catch(err){

}
//----------四舍五入----------
function deelwithscore(score,bit){
    var oScore=null;
    var oScore1=null;
    var oScore2=null;
    if(typeof score =="number"){
        oScore=score;
        if(oScore>0 && oScore<1){
            oScore=oScore*100-0;
            oScore1=oScore.toFixed(bit);
            oScore2=oScore.toFixed(0);
            if(oScore1-oScore2){
                return oScore1;
            }else{
                return oScore2;
            }

        }else{
            oScore1=oScore.toFixed(bit);
            oScore2=oScore.toFixed(0);
            if(oScore1-oScore2){
                return oScore1;
            }else{
                return oScore2;
            }
        }

    }else{
        oScore=parseFloat(score);
        if(oScore>0 && oScore<1){
            oScore=oScore*100-0;
            oScore1=oScore.toFixed(bit);
            oScore2=oScore.toFixed(0);
            if(oScore1-oScore2){
                return oScore1;
            }else{
                return oScore2;
            }

        }else{
            oScore1=oScore.toFixed(bit);
            oScore2=oScore.toFixed(0);
            if(oScore1-oScore2){
                return oScore1;
            }else{
                return oScore2;
            }
        }
    }

}
//页面加载----------------------------------
function yemianJIAzai(){
    var delay=document.getElementById("delay");
    var jiazai=document.getElementById("jiazai");

    jiazai.style.display="none";
    delay.style.display="block";

}
yemianJIAzai();
//动态添加数据。
//-----------PAGE1-------------------------------------
function delayload(contentType,perId){
    //权限参数1 显示；0只显示摘要；
    function judgeJurisdiction(){

        var jiaofei=document.getElementById("jiaofei");
        var judge=document.getElementById("judge");
        //if(PersonReportData==1){
        //    judge.style.display="block";
        //
        //}else{
        //    judge.style.display="none";jiaofei.style.display="block";
        //
        //}

        if(contentType=="summary"){
            judge.style.display="none";jiaofei.style.display="block";

        }else{
            judge.style.display="block";
        }

    }
    judgeJurisdiction();
    function deelwithFace() {
        //教学周
        var ospanWeek=document.getElementsByClassName("teachWeek");
        var weekUnit=PersonReportData.cover.testWeek;

        ospanWeek[0].innerHTML="第"+weekUnit.index+"教学周"+"("+weekUnit.learningtime+")";      //个人信息
        var personalInfo=document.getElementById("personalInfo");
        var oh1=personalInfo.querySelectorAll("h1");
        oh1[0].querySelector("span").innerHTML=PersonReportData.cover.studentName+"同学";
        oh1[1].querySelector("span").innerHTML="（"+PersonReportData.cover.subjectName+"）";
        //学号，班级
        var faceDetail = document.getElementsByClassName("faceDetail");
//      faceDetail[0].innerHTML = PersonReportData.cover.code;
        faceDetail[0].innerHTML = PersonReportData.cover.schoolName;
        faceDetail[1].innerHTML = PersonReportData.cover.className;
        if(perId){
            faceDetail[1].parentNode.style.display="none";
        }
        faceDetail[2].innerHTML = PersonReportData.cover.material;
        var time = new Date(PersonReportData.cover.date);
        var weekDay = null;
        switch (time.getDay()) {
            case 0:
                weekDay = "星期日";
                break;
            case 1:
                weekDay = "星期一";
                break;
            case 2:
                weekDay = "星期二";
                break;
            case 3:
                weekDay = "星期三";
                break;
            case 4:
                weekDay = "星期四";
                break;
            case 5:
                weekDay = "星期五";
                break;
            case 6:
                weekDay = "星期六";
                break;

        }
        var timeMosaic = time.getFullYear() +" "+ "年"+" "+ (time.getMonth()+1)+" "+ "月" +" "+ time.getDate()+" "+"日" +" "+ weekDay;
        faceDetail[3].innerHTML = PersonReportData.cover.date;
    }
    try {
        deelwithFace();
    } catch(err){
        //在此处理错误
    }
    //
    function Getyoupuzhanghao(){
        var youpuzhanghao=document.getElementById("youpuzhanghao");
        var ospan=youpuzhanghao.querySelectorAll("span");
        ospan[0].innerHTML=PersonReportData.questionData.youpuid;
        ospan[1].innerHTML=PersonReportData.questionData.youpuid
    }
    try{
        Getyoupuzhanghao();
    }catch(err){

    }



    //-----------YEmei--------------------------------
    function deelWithYemei(){
        var yemei=document.getElementsByClassName("yemei");
        for(var i=0;i<yemei.length;i++){
            yemei[i].innerHTML=PersonReportData.cover.studentName+"同学"+PersonReportData.cover.subjectName+"学情周报"+"("+"第"+PersonReportData.cover.testWeek.index+"教学周"+")"
        }
    }
    try {
        deelWithYemei()
    } catch(err){
        //在此处理错误
    }

    //-----------PAGE2----------------------------------
    function deelwithPage2() {
        var judgeProblem=document.getElementById("judgeProblem");
        var findProblem=document.getElementById("judgeProblem");
        //if(PersonReportData.weakPointName.length>0||PersonReportData.weakSubjectAbility.length){
        //    judgeProblem.style.display="block";
        //}else{
        //
        //}

        //1、单体数据；
        function anserwerDate() {
            //
            var testDate=document.getElementById("testDate");
            var testSPan=testDate.querySelectorAll("span");
            for(var i=0;i<testSPan.length;i++){
                testSPan[i].className="testDateSpan";
            }
            testSPan[0].innerHTML=deelwithscore(PersonReportData.questionData.studentScore,1);


            testSPan[1].innerHTML=" 班级排名第"+PersonReportData.questionData.classSort+"名 ，";

            testSPan[2].innerHTML='年级排名前'+PersonReportData.questionData.gradeRange+"%";
            //按个人方式出的报告
            if(perId){
                testSPan[1].style.display="none";
                testSPan[2].style.display="none";
            }

            var testB=testDate.querySelectorAll("b");
            testB[0].innerHTML=PersonReportData.questionData.questionNum;
            testB[1].innerHTML=PersonReportData.questionData.pointNum;
            testB[2].innerHTML=PersonReportData.questionData.answerRightNum;
            //app
            var testDate_app=document.getElementById("testDate_app");
            if(PersonReportData.selfTestQuestion){
                var ob=testDate_app.querySelectorAll("b");
                ob[0].innerHTML=PersonReportData.selfTestQuestion.appAnswerNum;
                var rightRate=PersonReportData.selfTestQuestion.rightRate*100-0;

                ob[1].innerHTML=rightRate.toFixed(0)+"%";
                ob[2].innerHTML=PersonReportData.selfTestQuestion.pointSize;
            }else{
                testDate_app.style.display='none';
            }

        }

        try{
            anserwerDate();
        }catch(err){

        }
        //2、问题发现；
        function problem(){
            function findProblem() {
                var fs_goodword = document.getElementById("fs_goodword");
                var fs_problem = document.getElementById("fs_problem");
                var oSpanProblem = document.getElementById("findProblem");
                var judgefindProblem=document.getElementById("judgefindProblem");
                var ary = [];
                var ospan1 = null;
                var ospan2 = null;
                var length=0;
                ospan1 = document.createElement("span");
                ospan1.className = "ospan1";
                var problem=PersonReportData.weakPointName;
                if(problem.length>0){
                    judgefindProblem.style.display="block";
                    if(problem.length>5){
                        length=5;
                    }else{
                        length=problem.length;
                    }
                    for (var i = 0; i < length; i++) {
                        ospan2 = null;
                        ospan2 = document.createElement("span");
                        ospan2.className = "ospan2";
                        ospan2.innerHTML = problem[i];
                        if (i < length - 1) {
                            ospan1.innerHTML += '“';
                            ospan1.appendChild(ospan2);
                            ospan1.innerHTML += '”';
                            ospan1.innerHTML += '、';

                        } else {
                            ospan1.innerHTML += '“';
                            ospan1.appendChild(ospan2);
                            ospan1.innerHTML += '”';
                        }
                    }
                    oSpanProblem.appendChild(ospan1);
                }else{
                    fs_problem.style.display="none";
                    fs_goodword.style.display="block";
                }

            }

            try{
                findProblem();
            }catch(err){

            }

            function findabilitiy(){
                var oSpanAbility=document.getElementById("findabilitiy");
                var judgefindProblem=document.getElementById("judgefindabilitiy");

                var ary = [];
                var ospan1 = null;
                var ospan2 = null;
                var length=0;
                ospan1 = document.createElement("span");
                ospan1.className = "ospan1";
                var findability=PersonReportData.weakSubjectAbility;

                if(findability.length>0){
                    judgefindProblem.style.display="block";
                    if(findability.length>5){
                        length=5;
                    }else{
                        length=findability.length;
                    }
                    for (var i = 0; i < length; i++) {
                        ospan2 = null;
                        ospan2 = document.createElement("span");
                        ospan2.className = "ospan2";
//_______________________________________________________________________________________学科能力图谱结构变化新旧判断
                        if(old){
                            ospan2.innerHTML = findability[i];
                        }else{
                            ospan2.innerHTML = findability[i].value;
                        }

                        if (i < length - 1) {
                            ospan1.innerHTML += '“';
                            ospan1.appendChild(ospan2);
                            ospan1.innerHTML += '”';
                            ospan1.innerHTML += '、';

                        } else {
                            ospan1.innerHTML += '“';
                            ospan1.appendChild(ospan2);
                            ospan1.innerHTML += '”';
                        }
                    }
                    oSpanAbility.appendChild(ospan1);
                }else{
                    judgefindProblem.style.display="none";
                }

            }
            findabilitiy();

            deelwithtestBySelf();
        }

        try{
            problem();
        }catch(err){

        }
        //2、学习建议；
        function learnSuggestion(){
            var olearnSuggestion=document.getElementById("learnSuggestion");
            var judgelearnSuggestion=document.getElementById("judgelearnSuggestion")
            var oli=null;
            var suggest=PersonReportData.studySuggest;
            if(suggest.length>0){
                judgelearnSuggestion.style.display="block";
                for(var i=0;i<suggest.length;i++){
                    oli=null;
                    oli=document.createElement("li");
                    oli.innerHTML=suggest[i];
                    olearnSuggestion.appendChild(oli);
                }
            }else{
                judgelearnSuggestion.style.display="none";
            }


        }
        try{
            learnSuggestion();
        }catch(err){

        }

    }
    try {
        deelwithPage2();
    } catch(err){
        //在此处理错误
    }
    //-----------正文--------------------------------------
    //一、本周答题情况___________________________________________________________________
    //1、周测卷得分
    function weektest(){
        //score
        var oScore=document.getElementById("weekTestScore");
        oScore.innerHTML=deelwithscore(PersonReportData.weekPaperScore.studentScore,1);
        //rank
        var oRank=document.getElementsByClassName("weekTestRank");
        oRank[0].innerHTML=deelwithscore(PersonReportData.weekPaperScore.classAvg,1)+"分";
        oRank[1].innerHTML=deelwithscore(PersonReportData.weekPaperScore.gradeAvg,1)+"分";
        oRank[2].innerHTML="第"+deelwithscore(PersonReportData.weekPaperScore.classSort,1)+"名";
        oRank[3].innerHTML="前"+ PersonReportData.weekPaperScore.gradeRange+"%";

    }
    try {
        weektest();
        if(perId){
            document.getElementById('pId_one').style.display="none";
        }
    } catch(err){
        //在此处理错误
    }
    //hightChart-----

    try {
        (function () {
            var categories=[];
            var seriesGrade=[];
            var seriesClass=[];
            var fenbu=PersonReportData.classGradeScoreDistribution;
            if(fenbu){
                for(var i=0; i<fenbu.length;i++){
                    categories.push(fenbu[i].name);
                    seriesGrade.push(fenbu[i].grade);
                    seriesClass.push(fenbu[i].classNum);
                }
                $('#container').highcharts({                   //图表展示容器，与div的id保持一致
                    chart: {
                        type: 'column',
                        style : {
                            fontFamily: 'KaiTi',
                            marginRight:'auto',
                            marginLeft:'auto'

                        }
                        //指定图表的类型，默认是折线图（line）
                    },
                    plotOptions:{

                        series:{
                            dataLabels:{
                                enabled: true,
                                style:{"color": "green",fontWeight:"normal"}
                            }
                        }
                    },
                    title: {
                        text: '班级、年级得分分布情况'    ,  //指定图表标题
                        style: {
                            color: "black",

                            fontSize:"1.8rem"
                        }
                    },
                    legend: {
                        itemStyle: {

                            fontSize:"1.8rem"
                        }
                    },
                    tooltip: {
                        style: {
                            padding:15,
                            lineHeight:"20rem",


                            fontSize:"1.8rem"
                        }
                    },
                    xAxis: {
                        categories:categories  ,//指定x轴分组
                        labels:{
                            style: {


                                fontSize:"1.8rem"
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''                  //指定y轴的标题
                        },
                        labels:{
                            style: {
                                color: "black",

                                fontSize:"1.8rem"
                            }
                        }
                    },
                    series: [{                                 //指定数据列
                        name: '年级人数',                          //数据列名
                        data: seriesGrade                        //数据
                    }, {
                        name: '班级人数',
                        data: seriesClass
                    }],
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled:false
                    }

                });
            }else{

            }

        })();//chart1= 班级、年级得分分布情况
        if(perId){
            document.getElementById('pId_two').style.display="none";
        }

    } catch(err){
        //在此处理错误
    }

    try {
        $(function () {
            var categories=[];
            var series=[];
            var series0={};
            var fenbu=PersonReportData.historyScore;

            series=fenbu.series;
            if(perId){
                series=[];
                for(var i=0;i<fenbu.series.length;i++){
                    if(fenbu.series[i].name=="个人得分"){
                        series.push(fenbu.series[i]);
                    }

                }
            }
            categories=fenbu.xname;

            $('#history').highcharts({
                chart:{
                    style : {
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto'

                    }
                },
                plotOptions:{
                    series:{
                        dataLabels:{
                            enabled: true,
                            style:{"color": "green",fontWeight:"normal"}
                        }
                    }
                },
                title: {
                    text: ' ',
                    x: -20 //center
                },
                labels:{
                    style: {
                        color: "black",

                        fontSize:"1.8rem"
                    }
                },
                xAxis: {
                    categories: categories,
                    labels:{
                        style: {

                            fontSize:"1.8rem"
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }],
                    labels:{
                        style: {
                            color: "black",

                            fontSize:"1.8rem"
                        }
                    }
                },
                tooltip: {
                    valueSuffix: '',
                    style: {
                        color: "black",

                        fontSize:"1.8rem"
                    }
                },
                legend: {
                    itemStyle: {


                        fontSize:"1.8rem"
                    }
                },
                series:series,
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }

            });
        });//chart2= 历史得分情况

        if(perId){
            document.getElementById('pId_three').querySelector('h3').querySelector('b').innerHTML='1、历史得分情况';

        }

    } catch(err){
        //在此处理错误
    }

    //4、周测卷试题分布
    function deelWithtestRetail() {
        var preClassScore=PersonReportData.weekPaperQuestionDistribution;
        var tableFragment = document.createDocumentFragment();
        var testWeek_retail=	document.getElementById("testWeek_retail");
        if(preClassScore==null||preClassScore.length==0){
            testWeek_retail.style.display="none";
        }else{
            testWeek_retail.style.display="block";
        }

        var tbweek = document.getElementById("table_week_retail");
        var ary = [];
        var otr = null;
        var otd = null;
        var obj={};
        for (var name in preClassScore[0]) {
            ary.push(name);
        }
        for (var i = 0; i < preClassScore.length; i++) {
            otr = null;
            var otd1 = null;
            var otd2 = null;
            var otd3 = null;
            var otd4= null;
            var otd5= null;
            otd1 = document.createElement("td");
            otd2 = document.createElement("td");
            otd3 = document.createElement("td");
            otd4 = document.createElement("td");
            otd5 = document.createElement("td");
            otr = document.createElement("tr");
            otd1.innerHTML=preClassScore[i].name;
            otd2.innerHTML=preClassScore[i].questionNum;
            var a=0;
            var b=0;
            var   c=0;
            if(preClassScore[i].rightRate==1){
                a=100;
            }else{
                a=deelwithscore(preClassScore[i].rightRate,1);
            };
            if(preClassScore[i].classAvgRightRate==1){
                a=100;
            }else{
                b=deelwithscore(preClassScore[i].classAvgRightRate,1);
            };
            if(preClassScore[i].gradeAvgRightRate==1){
                a=100;
            }else{
                c=deelwithscore(preClassScore[i].gradeAvgRightRate);
            };



            otd3.innerHTML= a+"%";
            otd4.innerHTML=b+"%";
            otd5.innerHTML=c+"%";



            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            otr.appendChild(otd4);
            otr.appendChild(otd4);
            otr.appendChild(otd5);
            tableFragment.appendChild(otr);
        }
        tbweek.appendChild(tableFragment);
    }
    try {
        deelWithtestRetail();
    } catch(err){
        //在此处理错误
    }

    //2、周测卷试题分布 3栏
    function deelWithtestRetail2() {
        var preClassScore=PersonReportData.weekPaperQuestionDistribution;
        var tableFragment = document.createDocumentFragment();
        var pId_four=	document.getElementById("pId_four");
        if(preClassScore==null||preClassScore.length==0){
            pId_four.style.display="none";
        }else{
            pId_four.style.display="block";
        }

        var tbweek = document.getElementById("table_week_retail2");
        var ary = [];
        var otr = null;
        var otd = null;
        var obj={};
        for (var name in preClassScore[0]) {
            ary.push(name);
        }
        for (var i = 0; i < preClassScore.length; i++) {
            otr = null;
            var otd1 = null;
            var otd2 = null;
            var otd3 = null;
            var otd4= null;
            var otd5= null;
            otd1 = document.createElement("td");
            otd2 = document.createElement("td");
            otd3 = document.createElement("td");
            otd4 = document.createElement("td");
            otd5 = document.createElement("td");
            otr = document.createElement("tr");
            otd1.innerHTML=preClassScore[i].name;
            otd2.innerHTML=preClassScore[i].questionNum;

            var a=0;
            var b=0;
            var   c=0;
            if(preClassScore[i].rightRate==1){
                a=100;
            }else{
                a=deelwithscore(preClassScore[i].rightRate,1);
            };
            if(preClassScore[i].classAvgRightRate==1){
                a=100;
            }else{
                b=deelwithscore(preClassScore[i].classAvgRightRate,1);
            };
            if(preClassScore[i].gradeAvgRightRate==1){
                a=100;
            }else{
                c=deelwithscore(preClassScore[i].gradeAvgRightRate);
            };

            otd3.innerHTML= a+"%";
            otd4.innerHTML=b+"%";
            otd5.innerHTML=c+"%";
            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            tableFragment.appendChild(otr);
        }
        tbweek.appendChild(tableFragment);
    }
    try {
        if(perId){
            deelWithtestRetail2();
            document.getElementById('testWeek_retail').style.display="none";
        }else{
            document.getElementById('pId_four').style.display="none";
        }
    } catch(err){
        //在此处理错误
    }



    //5、周测卷试题分布
    function deelwithtestBySelf() {
        var testDate_app=document.getElementById("testBySelf");
        var ob=testDate_app.querySelectorAll("b");
        ob[0].innerHTML=PersonReportData.selfTestQuestion.appAnswerNum;
        var rightRate=0;
        if(PersonReportData.selfTestQuestion.rightRate==1){
            rightRate=100;
        }else{
            rightRate=deelwithscore(PersonReportData.selfTestQuestion.rightRate);
        }


        ob[1].innerHTML=rightRate+"%";
        ob[2].innerHTML=PersonReportData.selfTestQuestion.pointSize;
    }
    try {
        deelwithtestBySelf();
        if(perId){
            document.getElementById('pId_five').querySelector('h3').querySelector('b').innerHTML='3、自主测试试题：'
        }

    } catch(err){
        //在此处理错误
    }
    //二、本次测试知识点掌握情况____________________________________________________________
    //1、概况
    (function () {
        var masterData=PersonReportData.thisTestPointMasterOverview.pointMasterStatus;
        var data=[];
        var obj={};
        for(var i=0;i<masterData.length;i++){
            obj={};
            obj.name=masterData[i].name;
            obj.y=masterData[i].rate;
            data.push(obj);
        }


        $('#part2_Survey').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                style : {
                    fontFamily: 'KaiTi',
                    fontWeight: '0',
                    fontSize:"1.8rem",
                    marginRight:'auto',
                    marginLeft:'auto'

                }
            },

            title: {
                text: '知识点状态',
                style: {

                    fontWeight: '0',
                    fontSize:"1.8rem"
                }
            } ,
            tooltip: {
                pointFormat: '{series.name}: <b style="font-size:1.5rem ">{point.percentage:.1f}%</b>',
                style: {
                    padding:15,
                    lineHeight:"20rem",

                    fontWeight: '0',
                    fontSize:"1.8rem"
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,

                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {

                            fontWeight: '0',
                            fontSize:"1.8rem"
                        }
                    }
                }
            },
            xAxis: {
                labels:{

                }
            },
            series: [{
                type: 'pie',
                name: '知识点掌握状态',
                data: data,

            }],
            credits: {
                enabled: false
            },
            exporting: {
                enabled:false
            }

        });
//        chart.series[0].setData(JSONpart2_Survey);
    })();//chart3= 概况
    function deelwithSurvey(){
        var ospan=document.getElementsByClassName("posintState");
        ospan[0].innerHTML=PersonReportData.thisTestPointMasterOverview.pointNum;
        ospan[1].innerHTML=PersonReportData.thisTestPointMasterOverview.pointStatusUp;
        ospan[2].innerHTML=PersonReportData.thisTestPointMasterOverview.pointStatusDown;
    }
    try {
        deelwithSurvey()
    } catch(err){
        //在此处理错误
    }
    //2、明细------处理知识点名称-----------------------------
    function deelWithPart2_Retail() {
        var preClassScore=PersonReportData.thisTestPointMasterDetail;
        var tableFragment = document.createDocumentFragment();
        var tbweek = document.getElementById("PART3_table_ability_Map");
        var ary = [];
        var otr = null;
        var otd = null;
        var obj={};
        for (var name in preClassScore[0]) {
            ary.push(name);
        }
        for (var i = 0; i < preClassScore.length; i++) {
            otr = null;
            var otd1 = null;
            var otd2 = null;
            var otd3 = null;
            var otd4= null;
            var otd5= null;
            preClassScore[i].preStatus='';
            preClassScore[i].thisStatus='';

            otd1 = document.createElement("td");
            otd2 = document.createElement("td");
            otd3 = document.createElement("td");
            otd4 = document.createElement("td");
            otd5 = document.createElement("td");
            otr = document.createElement("tr");
            otd1.innerHTML=preClassScore[i].name;
            if(preClassScore[i].preWeekStatus ==null||preClassScore[i].preWeekStatus ==""|| typeof preClassScore[i].preWeekStatus =="undefined"||typeof preClassScore[i].preWeekStatus==0){
                otd2.innerHTML="未知";
            }else if(preClassScore[i].preWeekStatus == 4){
                otd2.innerHTML="优"
            }else if(preClassScore[i].preWeekStatus == 3){
                otd2.innerHTML="良"
            }else if(preClassScore[i].preWeekStatus == 2){
                otd2.innerHTML="中"
            }else{
                otd2.innerHTML="差"
            }
            if(preClassScore[i].thisWeekStatus ==null||preClassScore[i].thisWeekStatus ==""|| typeof preClassScore[i].thisWeekStatus =="undefined"||typeof preClassScore[i].thisWeekStatus==0){
                otd3.innerHTML="未知";
            }else if(preClassScore[i].thisWeekStatus == 4){
                otd3.innerHTML="优"
            }else if(preClassScore[i].thisWeekStatus == 3){
                otd3.innerHTML="良"
            }else if(preClassScore[i].thisWeekStatus == 2){
                otd3.innerHTML="中"
            }else{
                otd3.innerHTML="差"
            }

            otd4.innerHTML=preClassScore[i].answerNum;
            var a=0;

            if(preClassScore[i].rightRate==1){
                a=100;
            }else{
                a=deelwithscore(preClassScore[i].rightRate);
            }

            otd5.innerHTML= a+"%";
            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            otr.appendChild(otd4);
            otr.appendChild(otd4);
            otr.appendChild(otd5);
            tableFragment.appendChild(otr);
        }
        tbweek.appendChild(tableFragment);
    }
    try {
        deelWithPart2_Retail();
    } catch(err){
        //在此处理错误
    }
    //-------------------------------------
    //3、薄弱知识点及其讲解-------------处理知识点名称
    function deelknowledge() {
        var fs_weekPoint = document.getElementById("fs_weekPoint");
        var WeakPiont=PersonReportData.weakPointAndExplain;
        if(WeakPiont.length==0){
            fs_weekPoint.style.display="none";
        }else{
            fs_weekPoint.style.display="block";
        }
        var tableFragment = document.createDocumentFragment();
        var knowledge = document.getElementById("knowledgeName");
        var knowledgeBox = null;
        var knowledgename = null;
        var currentMaster = null;
        var averageMaster = null;
        var knowledgeExplain = null;
        for (var i = 0; i < WeakPiont.length; i++) {
            knowledgeBox = null;
            knowledgename = null;
            currentMaster = null;
            averageMaster = null;
            knowledgeExplain = null;
            knowledgeBox = document.createElement("div");
            knowledgename = document.createElement("h4");
            currentMaster = document.createElement("h5");
            averageMaster = document.createElement("h5");
            knowledgeExplain = document.createElement("h5");
            knowledgename.innerHTML = "知识点名称" + ":" + "<span style='color:#00b0f0'>"+ WeakPiont[i].name+"</span>";
            currentMaster.innerHTML = "当前掌握状态" + ":" +"<span style='color:#00b0f0'>"+ WeakPiont[i].currentMasterStatus+"</span>";
            averageMaster.innerHTML = "平均掌握状态" + ":" +"<span style='color:#00b0f0'>"+ WeakPiont[i].avgMasterStatus+"</span>";
            knowledgeExplain.innerHTML = "知识点讲解" + ":" + WeakPiont[i].pointExplain;
            knowledgeBox.appendChild(knowledgename);
            knowledgeBox.appendChild(currentMaster);
            knowledgeBox.appendChild(averageMaster);
            knowledgeBox.appendChild(knowledgeExplain);
            tableFragment.appendChild(knowledgeBox);

        }
        knowledge.appendChild(tableFragment);

    }
    try {
        deelknowledge();
    } catch(err){
        //在此处理错误
    }
    //3、高频知识点及其讲解-------------处理知识点名称

    function deelknowledge_high() {
        var fs_highPoint=document.getElementById("fs_highPoint");


        var highPiont=PersonReportData.highPoint;


        var tableFragment = document.createDocumentFragment();
        var knowledge = document.getElementById("knowledgeName1");
        var knowledgeBox = null;
        var knowledgename = null;
        var currentMaster = null;
        var averageMaster = null;
        var knowledgeExplain = null;
        for (var i = 0; i < highPiont.length; i++) {
            knowledgeBox = null;
            knowledgename = null;
            currentMaster = null;
            averageMaster = null;
            knowledgeExplain = null;
            knowledgeBox = document.createElement("div");
            knowledgename = document.createElement("h4");
            currentMaster = document.createElement("h5");
            averageMaster = document.createElement("h5");
            knowledgeExplain = document.createElement("h5");
            knowledgename.innerHTML = "知识点名称" + ":" + "<span style='color:#00b0f0'>"+ highPiont[i].name+"</span>";
            currentMaster.innerHTML = "当前掌握状态" + ":" + "<span style='color:#00b0f0'>"+ highPiont[i].currentMasterStatus+"</span>";
            averageMaster.innerHTML = "平均掌握状态" + ":"+ "<span style='color:#00b0f0'>" + highPiont[i].avgMasterStatus+"</span>";
             knowledgeExplain.innerHTML = "知识点讲解" + ":" + highPiont[i].pointExplain;
            knowledgeBox.appendChild(knowledgename);
            knowledgeBox.appendChild(currentMaster);
            knowledgeBox.appendChild(averageMaster);
            knowledgeBox.appendChild(knowledgeExplain);
            tableFragment.appendChild(knowledgeBox);

        }
        knowledge.appendChild(tableFragment);

    }
    try {
        deelknowledge_high();
    } catch(err){
        //在此处理错误
    }
    //三、学科整体掌握情况_______________________________________________________________________
    //累计答题

    function grandTotal() {
        //leartn point


//      part3_ansDate[1].innerHTML=rightRate.toFixed(0)+"%";
        //table
        var tableFragment = document.createDocumentFragment();
        var PART3_table_week_retail=document.getElementById("PART3_table_week_retail");
        var preUnitDetail=PersonReportData.aggregateQuestionData.unitDetail;
        var ary = [];
        var otr = null;
        var otd = null;
        var obj={};

        for (var i = 0; i < preUnitDetail.length; i++) {
            otr = null;
            var otd1 = null;
            var otd2 = null;
            var otd3 = null;

            otd1 = document.createElement("td");
            otd2 = document.createElement("td");
            otd3 = document.createElement("td");
            otr = document.createElement("tr");
            otd1.innerHTML=preUnitDetail[i].unitNum;
            otd2.innerHTML=preUnitDetail[i].anserNum;
            var a=deelwithscore(preUnitDetail[i].rightRate,1);
            if(preUnitDetail[i].rightRate==1){
                a=100;
            }else{
                a=deelwithscore(preUnitDetail[i].rightRate,1);
            }

            otd3.innerHTML= a+"%";
            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            tableFragment.appendChild(otr);
        }
        PART3_table_week_retail.appendChild(tableFragment);
    }

    try
    {
        grandTotal();
    }
    catch(err)
    {
        //在此处理错误
    }
//
    //学科知识图谱
    function subjectK_map(){
        var subMap=PersonReportData.subjectMappingKnowledgeDomain;
        var pointMasterStatus=PersonReportData.subjectMappingKnowledgeDomain.pointMasterStatus;
        var data=[];
        var obj={};
        for(var i=0;i<pointMasterStatus.length;i++){
            obj={};
            obj.name=pointMasterStatus[i].name;
            obj.y=pointMasterStatus[i].value;
            data.push(obj);
        }


        (function () {
            $('#subJectMap').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    style : {
                        fontSize:"1.8rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto'

                    }
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b style="font-size:1.5em ">{point.percentage:.1f}%</b>'
                    ,style: {
                        padding:15,
                        lineHeight:"20rem",


                        fontSize:"1.5rem"
                    }

                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            ,style: {

                                fontWeight: '0',
                                fontSize:"1.8rem"
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data:data
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }
            });
        })();
        var K_Map=document.getElementsByClassName("K_Map");
        K_Map[0].innerHTML=PersonReportData.cover.subjectName;
        K_Map[1].innerHTML=subMap.subjectPointNum;
        K_Map[2].innerHTML=subMap.testedPointNum;
        //各章掌握情况
        var obody=document.getElementById("mastersitu2");

        var a=PersonReportData.unitGradeARateList;
//      var a=[{name:"第一章",untiGradeARate:0},{name:"第asda",untiGradeARate:0.33},{name:"第一章",untiGradeARate:0.23}];
//      createCanvas(a,obody)
//        creatSvgCircle1(a,"mastersitu2");
        creatCanvasCircle(a,"mastersitu2")
    }
    try{
        subjectK_map();
    }
    catch(err){
        //在此处理错误
    }

    function subjectAbility_Map(){
//_______________________________________________________________________________________学科能力图谱结构变化新旧判断
        if(old){
            var categories=PersonReportData.subjectPowerGraph.abilityName;

            var stu_Score="0";
            var studata=[];
            for(var i=0;i<PersonReportData.subjectPowerGraph.studentScore.length;i++){
                stu_Score="0";
                stu_Score=PersonReportData.subjectPowerGraph.studentScore[i].toFixed(2)-0;
                studata.push(stu_Score)
            }
            var grade_Score="0";
            var gradedata=[];
            for(var i=0;i<PersonReportData.subjectPowerGraph.gradeAvgScore.length;i++){
                grade_Score="0";
                grade_Score=PersonReportData.subjectPowerGraph.gradeAvgScore[i].toFixed(2)-0;
                gradedata.push(grade_Score)
            }
        }else{
            var categories=[];
            var categories0=PersonReportData.subjectPowerGraph.abilityName;
            var stu=PersonReportData.subjectPowerGraph.studentScore;
            var gra=PersonReportData.subjectPowerGraph.gradeAvgScore;
            var stu_Score="0";
            var studata=[];
            var grade_Score="0";
            var gradedata=[];

            for(var i=0;i<categories0.length;i++){
                categories.push(categories0[i].value);
                for(var j=0;j<stu.length;j++){
                    if(stu[j].key==categories0[i].key){
                        stu_Score="0";
                        stu_Score=stu[j].value.toFixed(2)-0;
                        studata.push(stu_Score)
                    }
                }
                for(var k=0;k<gra.length;k++){
                    if(gra[k].key==categories0[i].key){
                        grade_Score="0";
                        grade_Score=gra[k].value.toFixed(2)-0;
                        gradedata.push(grade_Score)
                    }
                }
            }
        }

        var series=[];
        var obj1={       name: '平均能力',
            data: gradedata,
            pointPlacement: 'on'};
        var obj2={ name: '个人能力',
            data: studata,
            pointPlacement: 'on'};
        if(!perId){
            series.push(obj1);
        }
        series.push(obj2);
        console.log(series)
//      var studata=PersonReportData.subjectPowerGraph.studentScore;
       (function () {
            $('#PART3_table_ability_Map').highcharts({
                chart: {
                    polar: true,
                    type: 'line',
                    style : {
                        fontSize:"1.8rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto'

                    }
                },plotOptions: {
                    line:{
                        dataLabels:{
                            enabled: true,
                            style:{"color": "green",fontWeight:"normal"}
                        }
                    },

                },

                title: {
                    text: '  ',
                    x: -1
                },

                pane: {
                    size: '80%'
                },

                xAxis: {
                    categories:categories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                    labels:{
                        style: {
                            fontSize:"1.8rem"
                        }
                    }
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min:0,
                    max:1,
                    labels:{
                        style: {
                            fontSize:"1.8rem"
                        }
                    }

                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>',
                    style: {
                        fontSize:"1.8rem"
                    }
                },

                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: 0,
                    layout: 'vertical',
                    itemStyle: {
                        fontSize:"1.8rem"
                    }

                },

                series: series,
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }

            });
        })();

        function findabilitiy2(){
            //新课标界定
            var totalAbility=document.getElementsByClassName("totalAbility");

            totalAbility[0].innerHTML=PersonReportData.subjectPowerGraph.subjectName;
            totalAbility[1].innerHTML=PersonReportData.subjectPowerGraph.subjectAbilityNum;

            var totalAbility2=document.getElementById("totalAbility2");
            var oP_oSpanAbility2=document.getElementById("oP_oSpanAbility2");
            var ary = [];
            var ospan1 = null;
            var ospan2 = null;
            ospan1 = document.createElement("span");
            ospan1.className = "ospan1";
            if(PersonReportData.subjectPowerGraph.weakAbility.length>0){
                oP_oSpanAbility2.style.display="block";
            }else{
                oP_oSpanAbility2.style.display="none";
            }
            for (var i = 0; i < PersonReportData.subjectPowerGraph.weakAbility.length; i++) {
                ospan2 = null;
                ospan2 = document.createElement("span");
                ospan2.className = "ospan2";
//_______________________________________________________________________________________学科能力图谱结构变化新旧判断
                if(old){
                    ospan2.innerHTML = PersonReportData.subjectPowerGraph.weakAbility[i];

                }else{
                    ospan2.innerHTML = PersonReportData.subjectPowerGraph.weakAbility[i].value;

                }
                if (i < PersonReportData.subjectPowerGraph.weakAbility.length - 1) {
                    ospan1.innerHTML += '“';
                    ospan1.appendChild(ospan2);
                    ospan1.innerHTML += '”';
                    ospan1.innerHTML += '、';

                } else {
                    ospan1.innerHTML += '“';
                    ospan1.appendChild(ospan2);
                    ospan1.innerHTML += '”';
                }
            }
            totalAbility2.appendChild(ospan1);
        }

        try{
            findabilitiy2();
        } catch(err) {
            //在此处理错误
        }

    }

    //canvas highchart:
    function creatCanvasCircle(list,odivId){


        // 画圆环方法
        function drawRing(id,num){//圆环所在div的id，百分比中%前边的数字
            var gaugeOptions = {
                chart: {
                    plotBackgroundImage: 'images/3_r1_c3.png',
                    plotShadow: true,
                    type: 'solidgauge'
                },
                title: null,
                pane: {
                    center: ['50%', '50%'],
                    size: '100%',
                    startAngle: 0,
                    endAngle: 360,
                    background: {
                        innerRadius: '90%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.001, '#f13e1a'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: null,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },

                plotOptions: {
                    solidgauge: {
                        innerRadius: '90%',
                        dataLabels: {
                            y: -20,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }

            }
            $('#'+id).highcharts(Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 100
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: [num],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:20px;color:black' + '">{y}%</span></div>'
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }
            }));
        }


        var circle=document.getElementById(odivId);
        var odiv=null;
        var rate=null;
        var  txt=null;
        var svgText=null;
        var ocircle=null;

        for(var i=0;i<list.length;i++){
            ocircle=null;
            odiv=null;
            rate=null;
            txt=null;

            odiv=document.createElement("div");
            odiv.className="outside";
            ocircle=document.createElement("div");

            ocircle.id="canvasCircle"+i;
//        ocircle.style.width="120px";
//        ocircle.style.height="120px";
            ocircle.className="inside";

            var rate0= list[i].untiGradeARate*100-0;
            rate=parseFloat(rate0.toFixed(2)-0);

            txt=document.createElement("p");
            txt.style.fontSize="1.6rem";
            txt.innerHTML=list[i].name;

            odiv.appendChild(ocircle);
            odiv.appendChild(txt);
            circle.appendChild(odiv);
            drawRing(ocircle.id,rate);

        }

    }



    //svg
    //各章节掌握情况如下------svg：

    function creatSvgCircle1(list,odivId){

        var circle=document.getElementById(odivId);
        var odiv=null;
        var oOut=null;
        var rate=null;
        var  txt=null;
        var svgText=null;
        var ocircle=null;
        for(var i=0;i<list.length;i++){
            odiv=null;
            rate=null;
            svgText=null;
            odiv=document.createElement("div");
            oOut=document.createElement("div");
            oOut.className="outside";
            odiv.id="makeSvg"+i;
            odiv.className="inside";
            txt=document.createElement("p");

            rate0= list[i].untiGradeARate*100-0;
            rate=rate0.toFixed(2)-0;

            ocircle="ocircle"+i;
            var oSvgid="circleProcess"+i;
            svgText= '<svg '+'id="'+oSvgid+'"'+'class="circleProcess"'+'width="100" '+'height="100" '+'>'+
                '<g>'+ '<image xlink:href="data:image/png;base64,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"  x="0" y="0" width="100px" height="100px"/>'
                +'<text x="50" y="53" text-anchor="middle" dominant-baseline="middle" style="font-family: Times New Roman;font-size: 24px;stroke: black;fill: black;">'
                +rate+'%</text>'+'</g>' +
                '<circle id='+'"'+ocircle+'"'+ 'cx="50" cy="50" r="46" stroke="red" stroke-width="5" fill="none"'+"stroke-dashoffset='"+(289-rate*2.89)+ "%"+"'" + 'transform="rotate(-90 50,50)"/>'+'</svg>';
            txt.innerHTML=list[i].name;

            odiv.innerHTML=svgText;

            oOut.appendChild(odiv);
            oOut.appendChild(txt);
            circle.appendChild(oOut);

//        getPercentCircle1(ocircle,rate);
        }
    }

    //canvas
    function createCanvas(a,obody){
        for(var i=0;i< a.length;i++){
            var outDiv=document.createElement("div");
            outDiv.className="clock";
            var oDiv=document.createElement("div");
            oDiv.className+="time-box";
            oDiv.className+=" ";
            oDiv.className+="circle";

            var ocanvas =document.createElement("canvas");
            ocanvas.width=100;
            ocanvas.height=100;
            ocanvas.id="canvas"+i;
            ocanvas.className="secondCircle";
            var oimg=new Image();
            var op=document.createElement("p");
            op.innerHTML=a[i].name;
            op.style.textAlign="center";
            oimg.src="images/3_r1_c3.png";


            oDiv.appendChild(ocanvas);
            oDiv.appendChild(oimg);
            outDiv.appendChild(oDiv);
            outDiv.appendChild(op);
            obody.appendChild(outDiv);
        }
        for(var j=0;j< a.length;j++){
            var canvas2=null;
            var cxt=null;
            var canvas= "canvas"+j;
            canvas2 = document.getElementById(canvas);
            cxt = canvas2.getContext("2d");

            var percent= a[j].untiGradeARate;
            if(percent>0){
                drawCircle(cxt,percent)
            }
            else{

                drawCircle(cxt,percent)
            }


        }
        function drawCircle(cxt,percent) {
            // 环形样式
            cxt.lineWidth = 5;
            cxt.strokeStyle = 'red';
//                            cxt.restore();
            // 清空当前路径
//                            cxt.clearRect(0, 0, circleWidth, circleHeight);
            // 把range的度数值换成Math.PI值
            var img=new Image();
            img.src="3_r1_c3.png";
            cxt.drawImage(img,0,0);
            if(percent!==""){
                var percent = percent;
                var endAngle = - Math.PI / 2 + percent * 2 * Math.PI;
                cxt.beginPath();
                // 绘制圆弧
                cxt.arc(50, 50, 47, - Math.PI / 2, endAngle, false);
                cxt.stroke();
                cxt.font = '30px normal';

                var aa=(percent*100).toFixed(0)+"%";
                cxt.fillStyle="red";
                cxt.fillText(aa,30,60);
            }else{
            }
        }

    }
    try{
        subjectAbility_Map();
    } catch(err) {
        //在此处理错误
    }
    //四、“周周清”学习建议-修改版
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };

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
    //1、典型错题详解（请仔细阅读）
    function erranswerList(){
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


                        b[j].holeAnwser1=b[j].abcd+" "+"."+" "+formatQuestionText1(b[j].answer);
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
        var datalist=PersonReportData.classicErrorQuestionExplain;
        var IntensiveExercise=document.getElementById("errquestionList");

        deelwithAnswer();
//        errquestionList.innerHTML=ClassReportData.errquestionList[0].text;

        var odiv=null;
        var ob=null;
        var fragment=document.createDocumentFragment();
        for(var i=0;i<datalist.length;i++) {
            ob = null;
            odiv = null;
            var pointDiv=null;
            var AnalysisDiv=null;
            var solutionDiv=null;
            var CommentDiv=null;
            datalist[i].order = "题" + (i + 1) + ":";
            odiv = document.createElement("div");
            odiv.className="exercisesStyle";
            ob = document.createElement("b");
            ob.innerHTML = datalist[i].order;
            //添加题号
            odiv.appendChild(ob);
            var oh4=document.createElement("h4");
            oh4.innerHTML = datalist[i].text ;
            //添加题目

            odiv.appendChild(oh4);
            for (var j = 0; j < datalist[i].answers.length; j++) {
                var option= document.createElement("div");
                if(datalist[i].qtype==1||datalist[i].qtype==2){
                    option.innerHTML = datalist[i].answers[j].holeAnwser;
                    option.className="ansSelectLIst"
                }else{
                    option.innerHTML = "";

                }
                //添加题目

                odiv.appendChild(option);
            }
            pointDiv=document.createElement("div");
            pointDiv.className="paoxi";
            AnalysisDiv=document.createElement("div");
            AnalysisDiv.className="paoxi";
            solutionDiv=document.createElement("div");
            solutionDiv.className="paoxi";
            CommentDiv=document.createElement("div");
            CommentDiv.className="paoxi";

            var pointName_1=datalist[i].pointname;
            var pointNam="";
            for(var k=0;k<pointName_1.length;k++){
                pointNam+=pointName_1[k];
            }
            if(datalist[i].analysis==null||typeof datalist[i].analysis=="undefined"){
                AnalysisDiv.innerHTML="<div class='jiange'>【"+"分析"+"】</div>"+" ";
            }else{
                AnalysisDiv.innerHTML="<div class='jiange'>【"+"分析"+"】</div>"+" "+formatQuestionText1( datalist[i].analysis);

            }
            if(datalist[i].explain==null||typeof datalist[i].explain=="undefined"){
                solutionDiv.innerHTML="<div class='jiange'>【"+"解答"+"】</div>"+" ";
            }else{
                solutionDiv.innerHTML="<div class='jiange'>【"+"解答"+"】</div>"+" "+formatQuestionText1( datalist[i].explain);

            }

            if(datalist[i].comments==null||typeof datalist[i].comments=="undefined"){
                CommentDiv.innerHTML="<div class='jiange'>【"+"点评"+"】</div>"+" ";
            }else{
                CommentDiv.innerHTML="<div class='jiange'>【"+"点评"+"】</div>"+" "+formatQuestionText( datalist[i].comments);
            }

//        odiv.appendChild(pointDiv);
            odiv.appendChild(AnalysisDiv);
            odiv.appendChild(solutionDiv);
            odiv.appendChild(CommentDiv);
            fragment.appendChild(odiv);
        }
        errquestionList.appendChild(fragment);
    }

    try {
        erranswerList();
    } catch(err){
        //在此处理错误
    }
    //2、强化练习
    function getIntensiveExercise(){


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
                        b[j].holeAnwser1=b[j].abcd+" "+"."+" "+formatQuestionText(b[j].answer);
                        //图片解析
                        b[j].holeAnwser= b[j].holeAnwser1;
                        //添加正确答案 属性
                        if(b[j].isrightanswer==1){
                            a[i].rightAnswer=b[j].abcd;
                        };
                    }
                    //简答题
                    if(a[i].qtype==4){
                        a[i].rightAnswer=b[j].answer;
                    }
                    //填空题
                    if(a[i].qtype==3){
                        a[i].rightAnswer=b[j].answer;
                    }
                }
            }
        }
        var datalist=PersonReportData.strengthenPractice;
        var IntensiveExercise=document.getElementById("IntensiveExercise");
        //判断强化练习存不存在
        var strongPrectice=document.getElementById("strongPrectice");
        if(datalist ==null||datalist.length==0){
            strongPrectice.style.display="none";
        }else{
            strongPrectice.style.display="block";
        }


        deelwithAnswer();
//        errquestionList.innerHTML=ClassReportData.errquestionList[0].text;
        var odiv=null;
        var ob=null;
        var fragment=document.createDocumentFragment();
        for(var i=0;i<datalist.length;i++) {
            ob = null;
            odiv = null;
            var pointDiv=null;
            var AnalysisDiv=null;
            var solutionDiv=null;
            var CommentDiv=null;
            datalist[i].order = "题" + (i + 1) + ":";
            odiv = document.createElement("div");
            odiv.className="exercisesStyle";
            ob = document.createElement("b");
            ob.innerHTML = datalist[i].order;
            //添加题号
            odiv.appendChild(ob);
            var oh4=document.createElement("h4");
            oh4.innerHTML =formatQuestionText1(datalist[i].text) ;
            //添加题目
            odiv.appendChild(oh4);
            for (var j = 0; j < datalist[i].answers.length; j++) {
                var option= document.createElement("div");
                if(datalist[i].qtype==1||datalist[i].qtype==2){
                    option.innerHTML = datalist[i].answers[j].holeAnwser;
                    option.className="ansSelectLIst"

                }else{
                    option.innerHTML = "";

                }
                //添加题目
                odiv.appendChild(option);
            }
//        pointDiv=document.createElement("div");
//        AnalysisDiv=document.createElement("div");
//        solutionDiv=document.createElement("div");
//        CommentDiv=document.createElement("div");
//        pointDiv.innerHTML="【"+"知识点"+"】"+" "+formatQuestionText( datalist[i].pointname);
//        AnalysisDiv.innerHTML="【"+"分析"+"】"+" "+formatQuestionText( datalist[i].analysis);
//        solutionDiv.innerHTML="【"+"解答"+"】"+" "+formatQuestionText( datalist[i].explain);
//        CommentDiv.innerHTML="【"+"点评"+"】"+" "+formatQuestionText( datalist[i].comments);
//        odiv.appendChild(pointDiv);
//        odiv.appendChild(AnalysisDiv);
//        odiv.appendChild(solutionDiv);
//        odiv.appendChild(CommentDiv);
            fragment.appendChild(odiv);
        }
        IntensiveExercise.appendChild(fragment);

        //处理强化练习二维码图片;
        var S_practice=document.getElementById("S_practice");
        var s_word=document.getElementById("s_word");
        if(PersonReportData.strengthenPracticeCodeUrl==""||PersonReportData.strengthenPracticeCodeUrl==null||typeof PersonReportData.strengthenPracticeCodeUrl=="undefined"){
            S_practice.src="";
            S_practice.style.display="none";
            s_word.style.display="none";
        }else{

            S_practice.src=PersonReportData.strengthenPracticeCodeUrl;
            S_practice.style.display="block";
            s_word.style.display="block";
        }

    }

    try{
        getIntensiveExercise();
    } catch(err) {
        //在此处理错误
    }
}
    //周周清
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

delayload(contentType,perId);
var loadPdf=document.getElementById("loadPdf");

function bindUrlTOa(){
    var pdfUrl="http://115.29.220.75:8080/WKPDFReport/import?type="+1+"&key=id&value="+	     reportId+"&filename="+"RS"+reportId;

    loadPdf.href=pdfUrl;
    loadPdf.target="_blank"
}
bindUrlTOa();