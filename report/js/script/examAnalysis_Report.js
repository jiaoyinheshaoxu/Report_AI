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
    console.log(perId);
    //权限参数1 显示；0只显示摘要；
    function judgeJurisdiction(){

        var jiaofei=document.getElementById("jiaofei");
        var judge=document.getElementById("judge");
        if(contentType=="summary"){
            judge.style.display="none";jiaofei.style.display="block";

        }else{
            judge.style.display="block";
        }

    }
    judgeJurisdiction();
    var subjectName='';
    function deelwithFace() {
        //教学周

        var ospanWeek=document.getElementsByClassName("teachWeek");
        var weekUnit=PersonReportData.cover.testTime;

        ospanWeek[0].innerHTML='考试时间: '+weekUnit;   //个人信息
        var personalInfo=document.getElementById("personalInfo");
        var oh1=personalInfo.querySelectorAll("h1");
        oh1[0].querySelector("span").innerHTML=PersonReportData.cover.studentName+"同学";

       subjectName=PersonReportData.cover.subjectName;
       if(subjectName=='初中数学'||subjectName=='高中数学'||subjectName=='高中文科数学'||subjectName=='高中理科数学'||subjectName=='小学数学'){
         subjectName='数学';
       }else if(subjectName=='初中物理'||subjectName=='高中物理'){
         subjectName='物理';
       }else if(subjectName=='初中化学'||subjectName=='高中化学'){
         subjectName='化学';
       }else if(subjectName=='初中英语'){
         subjectName='英语';
       }

        oh1[1].querySelector("span").innerHTML="（"+subjectName+"）";
        //学号，班级
        var faceDetail = document.getElementsByClassName("faceDetail");
 
        faceDetail[0].innerHTML = PersonReportData.cover.schoolName;
 
        faceDetail[1].innerHTML = PersonReportData.cover.material;
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
        faceDetail[2].innerHTML = PersonReportData.cover.date;
    }
    deelwithFace();
    try {
    } catch(err){
        //在此处理错误
    }
    //-----------页眉--------------------------------
    function deelWithYemei(){
        var yemei=document.getElementsByClassName("yemei");
        for(var i=0;i<yemei.length;i++){
            yemei[i].innerHTML=PersonReportData.cover.studentName+"同学"+subjectName+"考试分析报告"
        }
    }
    try {
        deelWithYemei()
    } catch(err){
        //在此处理错误
    }

    //-----------第二页----------------------------------
    function deelwithPage2() {
        var judgeProblem=document.getElementById("judgeProblem");
        var findProblem=document.getElementById("judgeProblem");
        //1、单体数据；
        function anserwerDate() {
            var testDate=document.getElementById("testDate");
            var testDate1=document.getElementById("testDate1");
            var testSPan=testDate.querySelectorAll("span");

            testSPan[0].innerHTML='<b class="testDateSpan">'+deelwithscore(PersonReportData.questionData.studentScore,1)+'</b>';
            testSPan[1].innerHTML=",班级排名第"+'<b class="testDateSpan">'+PersonReportData.questionData.classSort+'</b>'+"名,";
            testSPan[2].innerHTML='年级排名前'+'<b class="testDateSpan">'+PersonReportData.questionData.gradeRange+'</b>'+"%";
            //按个人方式出的报告
            if(perId){
                testSPan[1].style.display="none";
                testSPan[2].style.display="none";
            }
            var testB=testDate1.querySelectorAll("b");
            for(var i=0;i<testB.length;i++){
                testB[i].className+="testDateSpan "
            }
            testB[0].innerHTML=PersonReportData.questionData.questionNum;
            testB[1].innerHTML=PersonReportData.questionData.pointNum;
            testB[2].innerHTML=PersonReportData.questionData.answerRightNum;
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

                        ospan2.innerHTML = findability[i].value;


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
    //一、本次考试分析___________________________________________________________________
    //1、本次考试得分
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
        if(perId){
            // document.getElementById('pId_one').style.display="none";
            oRank[0].parentNode.style.display="none";
            oRank[1].parentNode.style.display="none";
            oRank[2].parentNode.style.display="none";
            oRank[3].parentNode.style.display="none";
        }
    }
    try {
        weektest();
 
    } catch(err){
        //在此处理错误
    }
    //2、班级、年级得分分布情况
 
    //3、本次考试试题分析
    function AnalysisTest(){
        var pId_three=document.getElementById('pId_three');
        var TestAnalyze = PersonReportData.thisTestQuestionAnalyze;
        $('#tableMonth').before('<p  >本次考试总分<b class="weekTestRank">'+TestAnalyze.allScore+'</b>分，共有<b class="weekTestRank">'+TestAnalyze.questionNum	+'</b>道试题，涉及知识点<b class="weekTestRank">'+TestAnalyze.pointNum+'</b>个，答对题数<b class="weekTestRank">'+TestAnalyze.rightQuestionNum+'</b>道。</p>');
        var preClassScore=TestAnalyze.questionAnalyzeList;
            for(var i=0;i<preClassScore.length;i++){
            $('#tableMonth').append('<tr><td>'+preClassScore[i].number+'</td><td>'+preClassScore[i].score+'</td><td>'+preClassScore[i].rightAnswer+'</td><td>'+preClassScore[i].studentScore+'</td></tr> ');
        }
    }
    try{
        AnalysisTest();
        if(perId){
            document.getElementById('pId_three').querySelector('h3').querySelector('b').innerHTML='2、本次考试试题分析';
        }
    }catch(err){

    }

    //4、本次考试知识点分析
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
        var tbweek = document.getElementById("PART2_table_week_retail");
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
        if(WeakPiont.length>5){
          WeakPiont.length=5;
        }

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
    //5、本次测试学科能力和思想方法分析
    function subility_analize(){
        var subilityAnalizAry=PersonReportData.thisTestSubjectAbilityAndThoughtMethodAnaylze;
        if(typeof subilityAnalizAry =='undefined'){
            $('#subility_anali').parent().hide();
        }else{
            if(subilityAnalizAry.length>0){
                for(var i=0;i<subilityAnalizAry.length;i++){
                    $('#subility_anali').append('<tr><td>'+subilityAnalizAry[i].subjectAbilityName+'</td><td>'+subilityAnalizAry[i].subjectAbilityScore+'</td><td>'+subilityAnalizAry[i].studentSubjectAbilityScore+'</td><td>'+(subilityAnalizAry[i].classSubjectAbilityScoreRate*100).toFixed(0)+'%</td><td>'+(subilityAnalizAry[i].gradeSubjectAbilityScoreRate*100).toFixed(0)+'%</td></tr>')
                }
            }else{
                $('#subility_analize').hide();
                $('#subility_anali0').hide();
            }
        }
    }
    try {
        subility_analize();
    } catch(err){
        //在此处理错误
    }
    //二、学科整体学习情况分析_______________________________________________________________________

    //1、累计答题
    function grandTotal() {
//        leartn point
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
    try{
        grandTotal();
    } catch(err){
        //在此处理错误
    }
    //3、学科知识图谱
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
        K_Map[0].innerHTML=subjectName;
        K_Map[1].innerHTML=subMap.subjectPointNum;
        K_Map[2].innerHTML=subMap.testedPointNum;
        //各章掌握情况
        var obody=document.getElementById("mastersitu2");

        var a=PersonReportData.unitGradeARateList;
//      var a=[{name:"第一章",untiGradeARate:0},{name:"第asda",untiGradeARate:0.33},{name:"第一章",untiGradeARate:0.23}];
        creatCanvasCircle(a,"mastersitu2")
    }
    try{
        subjectK_map();
    } catch(err){
        //在此处理错误
    }
    function subjectAbility_Map(){
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
                ospan2.innerHTML = PersonReportData.subjectPowerGraph.weakAbility[i].value;

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
        findabilitiy2();
        try{

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
    //canvas

    try{
        subjectAbility_Map();
    } catch(err) {
        //在此处理错误
    }
    //三、学习建议
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
                        b[j].holeAnwser1= formatQuestionText1(b[j].answer);
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
        var errquestionList=document.getElementById("errquestionList");

        deelwithAnswer();
//        errquestionList.innerHTML=ClassReportData.errquestionList[0].text;

        var odiv=null;
        var ob=null;
        var fragment=document.createDocumentFragment();
        if(datalist.length>10){
          datalist.length=10;
        }
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
                    option.innerHTML ='<div style="float: left">'+datalist[i].answers[j].abcd+" "+"."+" "+'</div>'+ datalist[i].answers[j].holeAnwser;
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
                        b[j].holeAnwser1= formatQuestionText(b[j].answer);
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
                    option.innerHTML ='<div style="float: left">'+datalist[i].answers[j].abcd+" "+"."+" "+'</div>'+ datalist[i].answers[j].holeAnwser;
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
delayload(contentType,perId);
var loadPdf=document.getElementById("loadPdf");
function bindUrlTOa(){
    var pdfUrl="http://115.29.220.75:8080/WKPDFReport/import?type="+7+"&key=id&value="+	     reportId+"&filename="+"RS"+reportId;

    loadPdf.href=pdfUrl;
    loadPdf.target="_blank"
}
bindUrlTOa();
