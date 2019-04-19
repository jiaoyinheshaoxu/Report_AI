/**
 * Created by qjl on 2017/4/6.
 */
//页面加载----------------------------------
function yemianJIAzai(){
    var delay=document.getElementById("delay");
    var jiazai=document.getElementById("jiazai");
    jiazai.style.display="none";
    delay.style.display="block";
};

if(ClassReportData && typeof ClassReportData !== 'undefined'){
    //reportType=2 不含年级信息；
    delayload();
    checkGrade();
    yemianJIAzai();
}
//判断是否包含年信息
function checkGrade(){
    if(reportType==2){
        //一、本次考试分析
        $('.AverageScore').hide();//1、本次考试班级平均得分
        $('.part_12>h3>b').html('2、班级得分分布情况');//2、班级得分分布情况
        //try{
            (function () {
                var preClass=ClassReportData.sectionmap.classScoresection;
                var classAry1=[],classAry2=[],classAry3=[];
                for(var i=0;i<preClass.length;i++){
                    classAry1.unshift(preClass[i].key);
                    classAry2.unshift(preClass[i].value)
                }
                $('#container').highcharts({                   //图表展示容器，与div的id保持一致
                  chart: {
                    width:800,
                    style: {
                      fontSize: "1.8rem",
                      fontFamily: 'KaiTi',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      width:'800px'
                    }
                  },
                    plotOptions:{
                        series:{
                            dataLabels:{
                                enabled: true,
                                style:{"color": "green",fontWeight:"normal"}
                            }
                        }
                    }
                    ,
                    legend: {
                        itemStyle: {
                            fontSize:"1.8rem"
                        }
                    },
                    title: {
                        text: '班级得分分布情况'      //指定图表标题
                        ,
                        style: {

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
                        categories: classAry1       //指定x轴分组
                        , labels:{
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

                                fontSize:"1.8rem"
                            }
                        }

                    },
                    series: [{                                 //指定数据列
                        name: '班级人数',                          //数据列名
                        data:  classAry2                     //数据
                    }],
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled:false
                    }
                });
                function makeTable (){
                    var scoreDistribution=document.getElementById("scoreDistribution");
                }
                try{
                    makeTable ()
                }catch(err){
                }
            })();//chart1= 2班级分数段与年级分数段对比
        //}catch(err){
        //}
        //二、本次测试知识点掌握情况
        $('.part_24_P').html('班级能力值水平如下:');
        (function(){
            var preClassability=ClassReportData.classsubjectAbilityList;
             var categories=[];
            var data=[],data2=[];
            var obj={};
            for(var i=0;i<preClassability.length;i++){
                categories.push(preClassability[i].name);
                data.push(parseFloat(preClassability[i].ability));

            }

            $('#PART3_table_ability_Map').highcharts({
                chart: {
                    polar: true,
                    type: 'line',
                    width:800,
                    style : {
                        fontSize:"1.6rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto',
                        width:"800px"
                    }
                },
                plotOptions: {
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


                            fontSize:"1.6rem"
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


                            fontSize:"1.6rem"
                        }
                    }
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
                    ,    style: {


                        fontSize:"1.6rem"
                    }
                },

                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: 0,
                    layout: 'vertical',
                    itemStyle: {
                        fontSize:"1.6rem"
                    }
                },

                series: [{
                    name: '班级能力值 ',
                    data:data,
                    pointPlacement: 'on',
                    color:'rgb(124, 181, 236)'
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }

            });
        }

        )();
        //错题 - 1092 判断改动
    }
}

function delayload(){

//  judgeJurisdiction();
    //动态添加数据。
    //-----------PAGE1-------------------------------------
    function deelwithFace() {
        //教学周
        var ospanWeek=document.getElementsByClassName("teachWeek");
        ospanWeek[0].innerHTML=ClassReportData.covermap.createtime;
        //个人信息
        var personalInfo=document.getElementById("personalInfo");
        var oh1=personalInfo.querySelectorAll("h1");
        oh1[0].querySelector("span").innerHTML=ClassReportData.covermap.classname;
        oh1[1].querySelector("span").innerHTML="学情周报（"+ClassReportData.covermap.subjectname+"）";
        //学号，班级
        var faceDetail = document.getElementsByClassName("faceDetail");
//      faceDetail[0].innerHTML =ClassReportData.covermap.classno;
        faceDetail[0].innerHTML = ClassReportData.covermap.schoolname;
        faceDetail[1].innerHTML = ClassReportData.covermap.gradename;
        faceDetail[2].innerHTML = ClassReportData.covermap.materialname;
    }
    try {
        deelwithFace();
    } catch(err){
        //在此处理错误
    }
    //-----------页眉-------------------------------
    function deelWithYemei(){
        var yemei=document.getElementsByClassName("yemei");
        for(var i=0;i<yemei.length;i++){
            yemei[i].innerHTML=ClassReportData.covermap.classname+ClassReportData.covermap.subjectname+"考试分析报告"+"( "+ClassReportData.covermap.createtime+")"
        }
    }
    try {
        deelWithYemei()
    } catch(err){
        //在此处理错误
    }
    //-----------PAGE2----------------------------------
    function deelwithPage2() {
        //1、单体数据;
        function anserwerDate() {
            //
            var testDate=document.getElementById("testDate");
            var testSPan=testDate.querySelectorAll("span");
            for(var i=0;i<testSPan.length;i++){
                testSPan[i].className="testDateSpan";
            }
            testSPan[0].innerHTML= ClassReportData.questiondatamap.studenttotal;
            testSPan[1].innerHTML= ClassReportData.questiondatamap.completetotal;
            //app
            var qData=ClassReportData.questiondatamap;
            $('#testDate_app').append('本次考试试卷满分<span class="testDateSpan">'+qData.score+'</span>，涉及知识点<span class="testDateSpan">'+qData.pointtotal+'</span>个，班级平均分<span class="testDateSpan">'+qData.avgScore+'</span>分。')
        }
        try {
            anserwerDate();
        } catch(err){
            console.log('考试情况')
        }
        //2、典型错题;
        function classicalErr(){
            var third=ClassReportData.oneThirdTestQuestionAnalysis;
            var ary1=third.classicalError;

            var ary1_1_4=[],ary2_1_4=[],ary3_1_4=[];
            var ary2=third.highError;
            var ary3=third.lowError;

            var a1_1_4= parseInt(ary1.length);
            var a1_2_4= parseInt(ary2.length);
            var a1_3_4= parseInt(ary3.length);
            for(var i=0;i<a1_1_4;i++){
                ary1_1_4.push(ary1[i])
            }
            for(var i=0;i<a1_2_4;i++){
                ary2_1_4.push(ary2[i])
            }
            for(var i=0;i<a1_3_4;i++){
                ary3_1_4.push(ary3[i])
            }
            var a1= ary1_1_4.length>0?'第'+ary1_1_4.toString()+'题。':'无';
            var a2=  ary2.length>0?'第'+ary2_1_4.toString()+'题。':'无';
            var a3=  ary3.length>0?'第'+ary3_1_4.toString()+'题。':'无';
            $('.classicalErr li:nth-child(1)').append('班级典型错题: <span class="testDateSpan">'+a1+'</span>');
            $('.classicalErr li:nth-child(2)').append('高分段典型错题: <span class="testDateSpan">'+a2+'</span>');
            $('.classicalErr li:nth-child(3)').append('低分段典型错题: <span class="testDateSpan">'+a3+'</span>');
        }
        try {
            classicalErr();
        } catch(err){
            //在此处理错误
        }
        //3、班级薄弱点
        function weakPoint(){
            var weaklist0= ClassReportData.weaklist,weaklist=[];
            var weakAbilitylist0=ClassReportData.weakAbilitylist,weakAbilitylist=[];

            if(weaklist0.length>=5){
                for(var i= 0;i<5;i++){weaklist.unshift("“"+weaklist0[i]+"”")}
            }else if(weaklist0.length<5&&weaklist0.length>0){
                for(var i= 0;i<weaklist0.length;i++){weaklist.unshift("“"+weaklist0[i]+"”")}
            }else{
                weaklist.push('"无"')
            }

            if(weakAbilitylist0.length>=5){
                for(var i= 0;i<5;i++){weakAbilitylist.unshift("“"+weakAbilitylist0[i]+"”")}
            }else if(weakAbilitylist0.length>0&&weakAbilitylist0.length<5){
                for(var i= 0;i<weakAbilitylist0.length;i++){weakAbilitylist.unshift("“"+weakAbilitylist0[i]+"”")}
            }else{
                weakAbilitylist.push('"无"')
            }
            $('#weakPoint li:nth-child(1)').append('班级薄弱知识点: <span class="testDateSpan">'+weaklist.toString()+'</span>等'+weaklist0.length+'个。');
            $('#weakPoint li:nth-child(2)').append('班级薄弱能力和思想方法: <span class="testDateSpan">'+weakAbilitylist.toString()+'</span>等'+weakAbilitylist0.length+'个。');
        }
        try {
            weakPoint();
        } catch(err){
            //在此处理错误
        }
    }
    try {
        deelwithPage2();
    } catch(err){
        //在此处理错误
    }
    //-----------正文--------------------------------------
    //一、本次考试分析
    //1、本次考试班级平均得分
    function weektest(){
        //score
        var oScore=document.getElementById("weekTestScore");
        oScore.innerHTML=deelwithscore(ClassReportData.weekanswermap.avgScore,1);
        //rank
        var oRank=document.getElementsByClassName("weekTestRank");
        oRank[0].innerHTML=deelwithscore(ClassReportData.weekanswermap.gradeAvgScore,1)+"分";
        oRank[1].innerHTML="第"+ClassReportData.weekanswermap.graderank+"名";
        oRank[2].innerHTML=ClassReportData.weekanswermap.studenttotal;
        oRank[3].innerHTML=ClassReportData.weekanswermap.completetotal;
    }
    try {
        weektest();
    } catch(err){
        //在此处理错误
    }
    //2、班级分数段与年级分数段对比
    //hightChart-----
    try{
        (function () {
            var preClass=ClassReportData.sectionmap.classScoresection;
            var classAry1=[],classAry2=[],classAry3=[];
            for(var i=0;i<preClass.length;i++){
                classAry1.unshift(preClass[i].key);
                classAry2.unshift(preClass[i].value)
            }
            var preGrade=ClassReportData.sectionmap.gradeScoresection;
            for(var i=0;i<preGrade.length;i++){
                classAry3.unshift(preGrade[i].value)
            }
            $('#container').highcharts({                   //图表展示容器，与div的id保持一致
                chart:{
                  width:800,
                    style : {
                        fontSize:"1.8rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto',
                        width:'800px'
                    }
                },
                plotOptions:{
                    series:{
                        dataLabels:{
                            enabled: true,
                            style:{"color": "green",fontWeight:"normal"}
                        }
                    }
                }
                ,
                legend: {
                    itemStyle: {
                        fontSize:"1.8rem"
                    }
                },
                title: {
                    text: '班级、年级得分分布情况'      //指定图表标题
                    ,
                    style: {

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
                    categories: classAry1       //指定x轴分组
                    , labels:{
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

                            fontSize:"1.8rem"
                        }
                    }

                },
                series: [{                                 //指定数据列
                    name: '班级人数',                          //数据列名
                    data:  classAry2                     //数据
                }, {
                    name: '年级人数',
                    data:  classAry3                    //数据

                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }
            });
            function makeTable (){
                var scoreDistribution=document.getElementById("scoreDistribution");

            }
            try{
                makeTable ()
            }catch(err){
            }

        })();//chart1= 2班级分数段与年级分数段对比
    }catch(err){
    }
    //chart2= 3班级平均分历史对照
    try{
        (function () {
        var preClass=ClassReportData.historycompareMap.classAvgList;
        var preGrade=ClassReportData.historycompareMap.gradeAvgList;
        var preweek=ClassReportData.historycompareMap.weekindexlist;
        var gradeData=[];
        var gradeClass=[];


        for(var i=0;i<preGrade.length;i++){
            gradeData.push(preGrade[i].score)
        }




        for(var i=0;i<preClass.length;i++){
            gradeClass.push(preClass[i].score)
        }


        $('#history').highcharts({
            chart:{
                style : {
                    fontSize:"1.8rem",
                    fontFamily: 'KaiTi',
                    marginRight:'auto',
                    marginLeft:'auto'
                }
            },
            title: {
                text: ' ',
                x: -20 //center
            },

            plotOptions:{
                series:{
                    dataLabels:{
                        enabled: true,
                        style:{"color": "green",fontWeight:"normal"}
                    }
                }
            }
            ,
            xAxis: {
                categories: preweek,
                labels:{
                    style: {
                        fontFamily: 'KaiTi',
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
                }]
                , labels:{
                    style: {
                        fontSize:"1.8rem"
                    }
                }
            },
            tooltip: {
                valueSuffix: '',
                style: {
                    lineHeight:"20rem",
                    color: "black",
                    fontSize:"1.8rem"
                }
            },
            colors:["#f7a35c","#7cb5ec"],
            legend: {
                itemStyle: {
                    fontSize:"1.8rem"
                }
            },
            series: [{
                name: '班级平均',
                data:gradeClass
            }, {
                name: '年级平均',
                data:gradeData
            }],
            credits: {
                enabled: false
            },
            exporting: {
                enabled:false
            },
        });
    })();}catch(err){}
    //3、本次考试试题分析:
    //试题得分率和区分度分布图

    try{
        (function () {
            var ary=ClassReportData.oneThirdTestQuestionAnalysis.distributionList;
            var ary0=[];
            for(var i=0;i<ary.length;i++){
                ary0.push({x:ary[i].scoreRate,y:ary[i].distributionRate,z:0.5,name:ary[i].sequence+"题"})
            }
            $('#testAnalysis1').highcharts({
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy',
                    width:800,
                    style : {
                        fontSize:"1.8rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto',
                        width:'800px'
                    }
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: '试题得分率和区分度分布图'
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: '得分率（%）'
                    },
                    labels: {
                        format: '{value} %'
                    },
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 60,
                        label: {
                            rotation: 0,
                            y: 15,
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '得分率60%'
                        },
                        zIndex: 3
                    }]
                },
                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: '区分度'
                    },
                    labels: {
                        format: '{value} '
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value:0,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '区分度0',
                            x: -10
                        },
                        zIndex: 3
                    }]
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                    '<tr><th>得分率:</th><td>{point.x}%</td></tr>' +
                    '<tr><th>区分度:</th><td>{point.y}</td></tr>' ,
                    footerFormat: '</table>',
                    followPointer: true
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    data:ary0,
                    color:'rgba(124,181,236,0.2)'
                }]
                ,credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                },
            });
        })();
    }catch(err){

    }
    //详情列表
    function testAnalycis2(){
        var ary=ClassReportData.oneThirdTestQuestionAnalysis.paperQuestionInfoList;
        for(var i=0;i<ary.length;i++){
            ary[i].leixing="";
            switch(ary[i].qtype){
                case 1 : ary[i].leixing="单选";
                    break;
                case 2 : ary[i].leixing="多选";
                    break;
                case 3 : ary[i].leixing="填空";
                    break;
                case 4 : ary[i].leixing="简答";
                    break;
            }
            $('#testAnalycis2').append('<tr>'+'<td>'+ary[i].sequence+'题'+'</td>'+'<td>'+ary[i].leixing+'</td>'+'<td>'+ary[i].score+'</td>'+'<td>'+ary[i].pointName+'</td>'+'<td>'+ary[i].subjectAbility+'</td>'+'<td>'+ary[i].avgScore+'</td>'+'<td>'+ary[i].highScore+'</td>'+
                '<td>'+ary[i].lowScore+'</td>'+'<td>'+ary[i].distributionRate+'</td>'+'<td>'+ary[i].scoreRate+'%'+'</td>'+'<td>'+ary[i].highScoreRate+'%'+'</td>'+'<td>'+ary[i].lowScoreRate+'%'+'</td>'+'</tr>')
        }
    }
    try {
        testAnalycis2()
    } catch(err){
        //在此处理错误
    }
    //4、本次考试知识点分析:
    function KnowledgeAnalyze(){
        var obj=ClassReportData.oneFourTestPointAnalysis;
        $('#KnowledgeAnalyze1').append('本次考试主要考察<span class="testDateSpan">'+obj.unitsName+'</span>共<span class="testDateSpan">'+obj.unitCount+'</span>章知识，其中涉及<span class="testDateSpan">'+obj.subUnitCount+'</span>小节、<span class="testDateSpan">'+obj.pointNum+'</span>个知识点。根据知识点的得分率与区分度的分布，我们发现：')
        var ary1=ClassReportData.oneFourTestPointAnalysis.classweak;
        var ary2=ClassReportData.oneFourTestPointAnalysis.highweak;
        var aryClass=ary1.length>0?ary1.toString():'无';
        var aryHigh=ary2.length>0?ary2.toString():'无';
        $('#weakKnowledge li:nth-child(1)' ).append('班级薄弱知识点有:<span class="testDateSpan">'+aryClass+'</span>等<span class="testDateSpan">'+ary1.length+'</span>个');
        $('#weakKnowledge li:nth-child(2)' ).append('高分段学生的薄弱知识点有:<span class="testDateSpan">'+aryHigh+'</span>等<span class="testDateSpan">'+ary2.length+'</span>个');
    }
    try{KnowledgeAnalyze()}catch(err){}
    //本次考试知识点得分率和区分度分布图
    try{
        (function () {
            var ary=ClassReportData.oneFourTestPointAnalysis.pointDistribution;

            var ary0=[];
            for(var i=0;i<ary.length;i++){
//                    ary[i].pointScoreRate= (ary[i].pointScoreRate*100).toFixed(2);
                ary0.push({x:ary[i].pointScoreRate,y:ary[i].distributionRate,name:ary[i].pointName})
            }
            $('#KnowledgeAnalysisMap').highcharts({
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy',
                    width:800,
                    style : {
                        fontSize:"1.8rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto',
                        width:'800px'
                    }
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: '知识点得分率和区分度分布图'
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: '得分率（%）'
                    },
                    labels: {
                        format: '{value} %'
                    },
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 60,
                        label: {
                            rotation: 0,
                            y: 15,
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '得分率60%'
                        },
                        zIndex: 3
                    }]
                },
                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: '区分度'
                    },
                    labels: {
                        format: '{value} '
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 0,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '区分度0',
                            x: -10
                        },
                        zIndex: 3
                    }]
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                    '<tr><th>得分率:</th><td>{point.x}%</td></tr>' +
                    '<tr><th>区分度:</th><td>{point.y}</td></tr>' ,
                    footerFormat: '</table>',
                    followPointer: true
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    data:ary0
                }]
                ,credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                },
            });
        })();

    }catch(err){

    }
    //详情列表
    function KnowledgeAnalyze2(){
        var ary = ClassReportData.oneFourTestPointAnalysis.unitList.sort(function (a, b) {
            return a.chapter - b.chapter;
        });
        for(var i=0;i<ary.length;i++){
            $('#KnowledgeAnalyze2').append('<tr>'+'<td>'+ary[i].unitName+'</td>'+'<td>'+''+'</td><td>'+''+'</td><td>'+ary[i].frequency+'</td><td>'+ary[i].score+'</td><td>'+''+'</td><td>'+'</td><td>'+''+'</td><td>'+''+'</td></tr>');
            var ary20=ary[i].subuintList;
            var ary21=[];
            for(var n=0;n<ary20.length;n++){
                if(ary20[n].score>0){
                    ary21.push(ary20[n])
                }
            }

            for(var j= 0,ary2=ary21;j<ary2.length;j++){
                $('#KnowledgeAnalyze2').append('<tr>'+'<td>'+''+'</td>'+'<td>'+ary2[j].chapter+'.'+ary2[j].name+'</td><td>'+''+'</td><td>'+ary2[j].frequency+'</td><td>'+ary2[j].score+'</td><td>'+'</td><td>'+''+'</td><td>'+''+'</td><td>'+''+'</td></tr>');
                var ary30=ary2[j].subUnitPointList;
                var ary31=[];
                for(var m=0;m<ary30.length;m++){
                    if(ary30[m].score>0){
                        ary31.push(ary30[m])
                    }
                }

                for(var k= 0,ary3=ary31;k<ary3.length;k++){
                    $('#KnowledgeAnalyze2').append('<tr>'+'<td>'+''+'</td>'+'<td>'+''+'</td><td>'+ary3[k].pointName+'</td><td>'+ary3[k].frequency+'</td><td>'+ary3[k].score+'</td><td>'+ary3[k].distributionRate+'</td><td>'+ary3[k].pointScoreRate+'%</td><td>'+ary3[k].pointHighScoreRate+'%</td><td>'+ary3[k].pointLowScoreRate+'%</td></tr>');

                }
            }
        }
    }
    try {
        KnowledgeAnalyze2()
    } catch(err){
        //在此处理错误
    }

    //5、本次考试学科能力和思想方法分析:
    function subAbilityAnalyze(){
        var ary=ClassReportData.oneFiveTestSubjectAbility.abilityInfoList;
        for(var i=0;i<ary.length;i++){
            $('#subAbilityAnalyze').append('<tr>'+'<td>'+ary[i].abilityName+'</td>'+'<td>'+ary[i].score+'</td>'+'<td>'+ary[i].avgScore+'</td>'+'<td>'+ary[i].highScore+'</td>'+'<td>'+ary[i].lowScore+'</td>'+'<td>'+ary[i].scoreRate+'%</td>'+'<td>'+ary[i].highScoreRate+'%</td>'+'<td>'+ary[i].lowScoreRate+'%</td>'+'</tr>')
        }
    }
    try{subAbilityAnalyze()}catch(err){}
    function improveAbility(){
        var ary=ClassReportData.oneFiveTestSubjectAbility.weakAbility;
        if(ary.length==0){
            $('#improveAbility').append(' ')
        }else{
            $('#improveAbility').append('班级的<span class="testDateSpan">'+ary+'</span>有待提高')
        }

    }
    try{improveAbility()}catch(err){}
    //学科能力图谱
    function subjectAbility_Map0(){
        (function () {
//
            var categories=[];
            var data=[],data1=[],data2=[];
            var ary=ClassReportData.oneFiveTestSubjectAbility.abilityInfoList;
            for(var i=0;i<ary.length;i++){
                categories.push(ary[i].abilityName);
                data.push(ary[i].scoreRate/100);
                data1.push(ary[i].highScoreRate/100);
                data2.push(ary[i].lowScoreRate/100);
            }

            $('#PART3_table_ability_Map0').highcharts({
                chart: {
                    polar: true,
                    type: 'line',
                    width:800,
                    style : {
                        fontSize:"1.2rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto',
                        width:'800px',
                    }
                },
                plotOptions: {
                    line:{
                        dataLabels:{
                            enabled: true,
                            style:{"color": "green",fontWeight:"normal"}
                        }
                    },

                },
                title: {
                    text: '思想方法与学科能力得分情况图',
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
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
                    ,    style: {
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

                series: [{
                    name: '平均得分率 ',
                    data:data,
                    pointPlacement: 'on',
                    color:'rgb(124, 181, 236)'
                },
                    {
                        name: '高分组得分率 ',
                        data:data1,
                        pointPlacement: 'on',
                        color:'rgb(247, 163, 92)'
                    },
                    {
                        name: '低分组得分率 ',
                        data:data2,
                        pointPlacement: 'on',
                        color:'rgb(144, 238, 126)'
                    },],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }

            });
            if(ary.length<3){
                $('#PART3_table_ability_Map0').hide();
            }
        })();
    }
    try {
        subjectAbility_Map0();
    } catch(err){
        //在此处
        // 理错误
    }
    //4、班级学生得分明细
    function deelWithtestRetail() {
        var preClassScore=ClassReportData.studentsHistoryScorelist;
        var tableFragment = document.createDocumentFragment();
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
            otd1 = document.createElement("td");
            otd2 = document.createElement("td");
            otd3 = document.createElement("td");
            otd4 = document.createElement("td");
            otr = document.createElement("tr");
            otd1.innerHTML=preClassScore[i].studentname;
            if(preClassScore[i].nowscore==null||typeof preClassScore[i].nowscore=="undefined"||preClassScore[i].nowscore==""){
                otd2.innerHTML="-";
            }else{
                otd2.innerHTML=preClassScore[i].nowscore;
            }
            if(preClassScore[i].lastscore==null||typeof preClassScore[i].lastscore=="undefined"||preClassScore[i].lastscore==""){
                otd3.innerHTML="-";
            }else{
                otd3.innerHTML=preClassScore[i].lastscore;
            }
            if(preClassScore[i].scoreChange==null||preClassScore[i].scoreChange==""||typeof preClassScore[i].scoreChange=="undefined"){
                otd4.innerHTML='0';
            }else{
                otd4.innerHTML=preClassScore[i].scoreChange;
                if(preClassScore[i].scoreChange>0){
                    otd4.style.color="green"
                }else if(preClassScore[i].scoreChange<0){
                    otd4.style.color="red"
                };
            }

            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            otr.appendChild(otd4);

            tableFragment.appendChild(otr);
        }
        tbweek.appendChild(tableFragment);
    }
    try {
        deelWithtestRetail();
    } catch(err){
        //在此处理错误
    }

    //6、班级典型错题
    function formatQuestionText(txt){
        txt = txt.trim();

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
        txt=txt.replace(/(解)/g,"");
        txt=txt.replace(/(：)/g,"");
        // 替换图片地址
        var reg=new RegExp('src="/Public/pic/',"g");

        txt=txt.replace(reg,'src="http://img.51youpu.com/Public/pic/');

        return txt;
    }
    //1、典型错题详解（请仔细阅读）
    //1、典型错题详解（请仔细阅读）
    function erranswerList(){
        function deelwithAnswer(){
            var a=datalist;
            for(var i=0;i< a.length;i++){
                a[i].text = formatQuestionText(a[i].text);
                //console.log( a[i].text1);
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
                        }
                        //拼接一个完整的选择题选项
                        b[j].holeAnwser1=formatQuestionText(b[j].answertext);
                        //图片解析
                        b[j].holeAnwser= b[j].holeAnwser1;
                        //添加正确答案 属性
                        if(b[j].isrightanswer==1){
                            a[i].rightAnswer=b[j].abcd;
                        };
                    }
                    //简答题
                    if(a[i].qtype==4){
                        a[i].rightAnswer=b[j].answertext

                    }
                    //填空题
                    if(a[i].qtype==3){
                        a[i].rightAnswer=b[j].answertext
                    }
                }
            }
        }
        var datalist0=ClassReportData.oneSixErrorQuestionList;
        var errquestionList=document.getElementById("errquestionList");
        var typicalErr=document.getElementById("typicalErr");
        if(datalist0==null||datalist0.length==0){
            typicalErr.style.display="none";
        }else{
            typicalErr.style.display="block";
        }
        var datalist1=[];
        var data1_4=parseInt(datalist0.length);
        for(var i=0;i<data1_4;i++){
            datalist1.push(datalist0[i]);
        }

        //for(var i=0;i<data1_4;i++){
        //    for(var j = i + 1;j<data1_4;j++){
        //        if(datalist1[i].scoreRate>datalist1[j].scoreRate){
        //            var tmp = datalist1[i];
        //            datalist1[i] = datalist1[j];
        //            datalist1[j] = tmp;
        //        }
        //    }
        //}
        var datalist=[];

        datalist=datalist0;
        deelwithAnswer();
//        errquestionList.innerHTML=ClassReportData.errquestionList[0].text;
        var odiv=null;
        var ob=null;
        var fragment=document.createDocumentFragment();
        for(var i=0;i<datalist.length;i++) {
            ob = null;
            odiv = null;
            var otable= document.createElement("table");
            otable.className='tableMonth2 text-center';
            datalist[i].order ='题:'+datalist[i].sequence;
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
                    option.innerHTML = '<div style="float: left">'+datalist[i].answers[j].abcd+" "+"."+" "+'</div>'+datalist[i].answers[j].holeAnwser;
                    option.className="ansSelectLIst"
                }else{
                    option.innerHTML = "";
                }
                //添加题目
                odiv.appendChild(option);
            }
            fragment.appendChild(odiv);
            var tr1=document.createElement('tr');
            var tr2=document.createElement('tr');
            var tr3=document.createElement('tr');
            var tr4=document.createElement('tr');
            var tr5=document.createElement('tr');
            datalist[i].leixing='';
            switch(datalist[i].qtype){
                case 1 : datalist[i].leixing="单选";
                    break;
                case 2 : datalist[i].leixing="多选";
                    break;
                case 3 : datalist[i].leixing="填空";
                    break;
                case 4 : datalist[i].leixing="简答";
                    break;
            }
            tr1.innerHTML='<td><span style="font-weight: 900">'+'试题类型: </span>'+datalist[i].leixing+'</td>'+'<td><span style="font-weight: 900">班级错误人数:</span>'+datalist[i].errorNum+'</td>';
            tr2.innerHTML='<td style="text-align: left"  colspan="2"><span style="font-weight: 900">'+'试题涉及知识点: </span>'+datalist[i].pointName+'</td>';
            tr3.innerHTML='<td style="text-align: left" colspan="2"><span style="font-weight: 900">'+'试题涉及学科能力和思想方法: </span>'+datalist[i].subjectAbility+'</td>';
            if(reportType==2){
                tr4.innerHTML='<td  style="text-align: left" colspan="2"><span style="font-weight: 900">班级平均得分率:</span>'+datalist[i].scoreRate+'%</td>';

            }else if(reportType==3){
                tr4.innerHTML='<td><span style="font-weight: 900">'+'年级平均得分率: </span>'+datalist[i].gradeScoreRate+'%</td>'+'<td><span style="font-weight: 900">班级平均得分率:</span>'+datalist[i].scoreRate+'%</td>';
            }
            tr5.innerHTML='<td><span style="font-weight: 900">'+'班级高分组得分率: </span>'+datalist[i].highScoreRate+'%</td>'+'<td><span style="font-weight: 900">班级低分组得分率:</span>'+datalist[i].lowScoreRate+'%</td>';
            otable.appendChild(tr1);     otable.appendChild(tr2);     otable.appendChild(tr3);     otable.appendChild(tr4); otable.appendChild(tr5);
            fragment.appendChild(otable);
        }
        errquestionList.appendChild(fragment);
    }
    erranswerList();
    //二、本次测试知识点掌握情况
    //1、概况
    //canvars
    function deelwithSurvey(){
        function deelwithSurvey(){
            var ospanPoint=document.getElementsByClassName("part2_pointName");

            ospanPoint[0].innerHTML=ClassReportData.knowledgeLearnmap.unitname;

            var ospan=document.getElementsByClassName("posintState");
            ospan[0].innerHTML=ClassReportData.knowledgeLearnmap.pointtotal;
//    ospan[1].innerHTML=JSONpart2_Survey1[0].up_k;
//    ospan[2].innerHTML=JSONpart2_Survey1[0].up_d;
            var completeRate=null;
            var  gradeARate=null;
            var completeRate0=ClassReportData.knowledgeLearnmap.completerate;
            if(completeRate0==1){
                completeRate=100
            }else{
                completeRate=Number(deelwithscore(completeRate0,1));
            }

            var gradeARate0=ClassReportData.knowledgeLearnmap.gradeArate;

            if(gradeARate0==1){
                gradeARate=100;
            }else{
                gradeARate=Number(deelwithscore(gradeARate0,1));
            }



            $(document).ready(function() {
                var chart = {
                    type: 'solidgauge'
                };
                var title = null;

                var pane = {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                };

                var tooltip = {
                    enabled: false
                };

                // the value axis
                var yAxis = {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: ' '
                    }
                };

                var plotOptions = {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                };

                var credits = {
                    enabled: false
                };

                var series = [{
                    name: ' ',
                    data: [gradeARate],
                    dataLabels: {
                        format: ' <div style="border: none;width: 50px;height:30px;font-size: 2.5rem;font-weight: 900;text-align: center">{y} <br/> 百分比</div> '
                        ,
                        borderWidth: 0
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }];

                var json = {};
                credits= {
                    enabled: false
                };
                exporting= {
                    enabled:false
                };
                json.credits = credits;
                json.exporting = exporting;
                json.chart = chart;
                json.title = title;
                json.pane = pane;
                json.tooltip = tooltip;
                json.yAxis = yAxis;
                json.credits = credits;
                json.series = series;
                $('#excellent_rate').highcharts(json);

                // the value axis
                yAxis = {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: ' '
                    }
                };

                series = [{
                    name: ' ',
                    data: [completeRate],
                    dataLabels: {
                        format: ' <div style="border: none;width: 50px;height:30px;font-size: 2.5rem;font-weight: 900;text-align: center">{y} <br/> 百分比</div> '
                        ,
                        borderWidth: 0
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }];
                credits= {
                    enabled: false
                };
                exporting= {
                    enabled:false
                };
                json.credits = credits;
                json.exporting = exporting;
                json.yAxis = yAxis;
                json.series = series;
                $('#compete_rate').highcharts(json);

            });
        }
        deelwithSurvey()
    }
    try {
        deelwithSurvey()
    } catch(err){
        //在此处理错误
    }
    //2、共性薄弱知识点-----处理知识点名称-----------------------------
    function deelWithPart2_Retail() {
        var preClassScore=ClassReportData.weakpointList;
        var tableFragment = document.createDocumentFragment();
        var general_weekP = document.getElementById("general_weekP");
        if(preClassScore==null||preClassScore==0){
            general_weekP.style.display="none";

        }else{
            general_weekP.style.display="block";
        }


        var tbweek = document.getElementById("PART2_table_week_retail");
        var ary = [];
        var otr = null;
        var otd = null;

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
            otd1.innerHTML=preClassScore[i].pointname;
//        otd2.innerHTML=preClassScore[i].frequencyLevel;
            var pointImport=preClassScore[i].frequencyLevel;
            if(pointImport==0){
                otd2.innerHTML="低";
            }else if(pointImport==1){
                otd2.innerHTML="一般";
            }else if(pointImport==2){
                otd2.innerHTML="较高";
            }else if(pointImport==3){
                otd2.innerHTML="很高";

            }else{
                otd2.innerHTML="极高";
            }
            var a=preClassScore[i].pointGraterate;
            if(a==1){
                otd3.innerHTML="100%";
            }else{
                otd3.innerHTML=deelwithscore(a,0)+"%";
            }

            otd4.innerHTML=preClassScore[i].scoreRate;
            otd5.innerHTML=preClassScore[i].errorNum;
            otr.appendChild(otd1);
            otr.appendChild(otd2);
            otr.appendChild(otd3);
            otr.appendChild(otd4);
            otr.appendChild(otd5);

            tableFragment.appendChild(otr);
        }
        tbweek.appendChild(tableFragment);
        tbweek.appendChild(tableFragment);
    }
    try {
        deelWithPart2_Retail();
    } catch(err){
        //在此处理错误
    }
    //三、班级学科知识图谱
    //1、概况
    function grandTotal() {
        var preClassScore=ClassReportData.classsubjectMap;
        //leartn point
        var part3_ansDate=document.getElementsByClassName('totalAskData');
        part3_ansDate[0].innerHTML=ClassReportData.covermap.subjectname;
        part3_ansDate[1].innerHTML=preClassScore.pointtotal;
        part3_ansDate[2].innerHTML=preClassScore.knownpoint;
//      part3_ansDate[2].innerHTML=preClassScore.testWeeks;
//      part3_ansDate[3].innerHTML=preClassScore.subjectcompleteRate;
//      part3_ansDate[3].innerHTML=deelwithscore(preClassScore.subjectgradeArate,1)+"%";
        if(preClassScore.subjectgradeArate==1){
            part3_ansDate[3].innerHTML=100+"%";
        }else{
            part3_ansDate[3].innerHTML=deelwithscore(preClassScore.subjectgradeArate,1)+"%";
        }

        //table

    }
    try {
        grandTotal();
    } catch(err){
        //在此处理错误
    }
    //canvars_2
    function deelwithPart_3Survey(){
        function deelwithSurvey(){

            var completeRate0=ClassReportData.classsubjectMap.subjectcompleteRate;
            var completeRate=null;
            var  gradeARate=null;
            if(completeRate0==1){
                completeRate=100
            }else{
                completeRate=Number(deelwithscore(completeRate0,1));
            }
            var gradeARate0=ClassReportData.classsubjectMap.subjectgradeArate;
            if(gradeARate0==1){
                gradeARate=100;
            }else{
                gradeARate= Number(deelwithscore(gradeARate0,1));
            }



            $(document).ready(function() {
                var chart = {
                    type: 'solidgauge'
                };
                var title = null;

                var pane = {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                };

                var tooltip = {
                    enabled: false
                };

                // the value axis
                var yAxis = {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: ' '
                    }
                };

                var plotOptions = {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    },
                    series:{
                        dataLabels:{
                            enabled: true
                        }
                    }
                };

                var credits = {
                    enabled: false
                };

                var series = [{
                    name: ' ',
                    data: [gradeARate],
                    dataLabels: {
                        format: ' <div style="border: none;width: 50px;height:30px;font-size: 30px;font-weight: 900;text-align: center">{y} <br/> 百分比</div> '
                        ,
                        borderWidth: 0
                    },
                    tooltip: {
                        valueSuffix: ' km/h'
                    }

                }];
                credits= {
                    enabled: false
                };
                exporting= {
                    enabled:false
                };
                var json = {};
                json.credits=credits;
                json.exporting=exporting;
                json.chart = chart;
                json.title = title;
                json.pane = pane;
                json.tooltip = tooltip;
                json.yAxis = yAxis;
                json.credits = credits;
                json.series = series;
                $('#excellent_rate2').highcharts(json);

                // the value axis
                yAxis = {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: ' '
                    }
                };

                series = [{
                    name: ' ',
                    data: [completeRate],
                    dataLabels: {
                        format: ' <div style="border: none;width: 50px;height:30px;font-size: 2.5rem;font-weight: 900;text-align: center">{y} <br/> 百分比</div> '
                        ,
                        borderWidth: 0
                    },
                    tooltip: {
                        valueSuffix: ' revolutions/min'
                    }
                }];
                credits= {
                    enabled: false
                };
                exporting= {
                    enabled:false
                };
                json.credits=credits;
                json.exporting=exporting;
                json.yAxis = yAxis;
                json.series = series;
                $('#compete_rate2').highcharts(json);

            });
        }
        deelwithSurvey()
    }
    try {
        deelwithPart_3Survey();
    } catch(err){
        //在此处理错误
    }
    //学科知识图谱
    function subjectK_map(){
        var masterSubject=ClassReportData.classsubjectMap;
        //各章节掌握情况如下：
        var obody=document.getElementById("mastersitu2");
        var a=ClassReportData.unitlearninginfoList;
        creatCanvasCircle(a,"mastersitu2");
    }
    try {
        subjectK_map();
    } catch(err){
        //在此处理错误
    }
    //学科能力图谱
    function subjectAbility_Map(){

            var preClassability=ClassReportData.classsubjectAbilityList;
            var preGradeAbility=ClassReportData.gradeAvgSubjectAbility.gradeAbility;


            var categories=[];
            var data=[],data2=[];
            var obj={};
            for(var i=0;i<preClassability.length;i++){
                categories.push(preClassability[i].name);
                data.push(parseFloat(preClassability[i].ability));
                for(var j=0;j<preGradeAbility.length;j++){
                    if(preGradeAbility[j].key==preClassability[i].key){
                        data2.push(parseFloat(preGradeAbility[j].value));
                    }
                }
            }

            $('#PART3_table_ability_Map').highcharts({
                chart: {
                    polar: true,
                    type: 'line',
                    style : {
                        fontSize:"1.6rem",
                        fontFamily: 'KaiTi',
                        marginRight:'auto',
                        marginLeft:'auto'

                    }
                },
                plotOptions: {
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


                            fontSize:"1.6rem"
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


                            fontSize:"1.6rem"
                        }
                    }
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
                    ,    style: {


                        fontSize:"1.6rem"
                    }
                },

                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: 0,
                    layout: 'vertical',
                    itemStyle: {
                        fontSize:"1.6rem"
                    }
                },

                series: [{
                    name: '班级能力值 ',
                    data:data,
                    pointPlacement: 'on',
                    color:'rgb(124, 181, 236)'
                },{
                    name: '年级能力值 ',
                    data:data2,
                    pointPlacement: 'on',
                    color:'rgb(247, 163, 92)'
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled:false
                }

            });
    }
    if(reportType!==2){
        subjectAbility_Map();
    }
    try {

    } catch(err){
        //在此处
        // 理错误
    }
    function findabilitiy2(){
        //新课标界定
        var totalAbility=document.getElementsByClassName("totalAbility");
        totalAbility[0].innerHTML=ClassReportData.covermap.subjectname;
        totalAbility[1].innerHTML=ClassReportData.classsubjectAbilityList.length;


        var oSpanAbility2=document.getElementById("totalAbility2");
        var oP_oSpanAbility2=document.getElementById("oP_oSpanAbility2");
        var ary = [];
        var ospan1 = null;
        var ospan2 = null;
        ospan1 = document.createElement("span");
        ospan1.className = "ospan1";
        if(ClassReportData.weakAbilitylist.length>0){
            oP_oSpanAbility2.style.display="block";
        }else{
            oP_oSpanAbility2.style.display="none";
        }
        for (var i = 0; i < ClassReportData.weakAbilitylist.length; i++) {
            ospan2 = null;
            ospan2 = document.createElement("span");
            ospan2.className = "ospan2";
            ospan2.innerHTML = ClassReportData.weakAbilitylist[i];
            if (i < ClassReportData.weakAbilitylist.length - 1) {
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

        oSpanAbility2.appendChild(ospan1);
    }

    try {
        findabilitiy2();
    } catch(err){
        //在此处理错误
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
            };
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
                        format: '<div style="text-align:center"><span style="font-size:2.5rem;color:black' + '">{y}%</span></div>'
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


            var rate0= list[i].unitGradeArate*100-0;
            rate=rate0.toFixed(1)-0;

            txt=document.createElement("p");
            txt.innerHTML=list[i].unitname;

            odiv.appendChild(ocircle);
            odiv.appendChild(txt);
            circle.appendChild(odiv);
            drawRing(ocircle.id,rate);

        }

    }
    //svg
    //各章节掌握情况如下------svg：
    function getPercentCircle1 ( circle,num) {//num为%前边的数字比如0.13，那么num为13

        var circle = document.getElementById(circle);


        circle.setAttribute("stroke-dashoffset", (289-num*2.89)+ "%");

    };
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

            rate0= list[i].unitGradeArate*100-0;
            rate=rate0.toFixed(1)-0;
            ocircle="ocircle"+i;
            var oSvgid="circleProcess"+i;
            svgText= '<svg '+'id="'+oSvgid+'"'+'class="circleProcess"'+'width="100" '+'height="100" '+'>'+
                '<g>'+ '<image xlink:href="images/3_r1_c3.png" ng-src="images/3_r1_c3.png" x="0" y="0" width="100px" height="100px"/>'
                +'<text x="50" y="53" text-anchor="middle" dominant-baseline="middle" style="font-family: Times New Roman;font-size: 2.4rem;stroke: black;fill: black;">'
                +rate+'%</text>'+'</g>' +
                '<circle id='+'"'+ocircle+'"'+ 'cx="50" cy="50" r="46" stroke="red" stroke-width="5" fill="none" transform="rotate(-90 50,50)"/>'+'</svg>';
            txt.innerHTML=list[i].unitname;

            odiv.innerHTML=svgText;

            oOut.appendChild(odiv);
            oOut.appendChild(txt);
            circle.appendChild(oOut);

            getPercentCircle1(ocircle,rate);
        }


    }
    //各章节掌握情况如下------canvas：
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
            op.innerHTML=a[i].unitname;
//        op.innerHTML=a[i].capter+" "+a[i].name;
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
            var image = new Image();
            canvas2 = document.getElementById(canvas);
            cxt = canvas2.getContext("2d");

            var percent= a[j].unitGradeArate;


            drawCircle(cxt,percent);


            image.src = canvas2.toDataURL("image/png");

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
                var percent =parseInt(percent)/100 ;
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
    function appendix(){
        var allStu=[],perStu={},item=[],item2=[];
        var ary=ClassReportData.appendix.stuQuestionList,ary2=ClassReportData.appendix.students;

        for(var i=0;i<ary2.length;i++){
            perStu={};
            var totalScore2=0;
            perStu.stuName=ary2[i];
            perStu.item=[];
            for(var j=0;j<ary.length;j++){
                for(var k=0;k<ary[j].scores.length;k++){
                    if(k==i){
                        perStu.item.push(ary[j].scores[k]);
                    }

                }

            }
            for(var b=0;b<perStu.item .length;b++){
                totalScore2+=parseInt(perStu.item[b])
            }

            perStu.item.unshift(totalScore2);
            perStu.item.unshift(ary2[i]);
            allStu.push(perStu);

        }
        item.push('总分');
        var totalScore=0;
        for(var i=0;i<ary.length;i++){
            item.push(ary[i].sequence);
            item2.push(ary[i].score);
            totalScore+=parseInt(ary[i].score);
        }
        item2.unshift(totalScore);

        var appendix=document.getElementById('appendix');
        var  otr1=document.createElement('tr');
        var  otr2=document.createElement('tr');
        var otr=null;
        var otdstu=null;
        var otd01=document.createElement('td');
        otd01.innerHTML='学生姓名';
        otd01.rowSpan = 2;
        otr1.appendChild(otd01);
        for(var i=0;i<item.length;i++){
            var otd=document.createElement('td');
            var otd2=document.createElement('td');
            otd.innerHTML=item[i];
            otd2.innerHTML=item2[i];
            otr1.appendChild(otd);
            otr2.appendChild(otd2);
        }
        appendix.appendChild(otr1);
        appendix.appendChild(otr2);
        var  Fragment=document.createDocumentFragment();
        for(var i=0;i<allStu.length;i++){
            otr=null;
            var otdTotalScore=0;
            otr=document.createElement('tr');
            for(var j=0;j<allStu[i].item.length;j++){
                otdstu=null;
                otdstu=document.createElement('td');
                otdstu.innerHTML=allStu[i].item[j];
                if(j>1){
                  var scoreVal=  Number(allStu[i].item[j])
                scoreVal==parseFloat(scoreVal)?scoreVal.toFixed(0):parseFloat(scoreVal);
                otdstu.innerHTML = scoreVal;
                    if(parseInt(item2[j-1])>parseInt(allStu[i].item[j])){
                        otdstu.style.color='red';
                    }else{
                        otdstu.style.color='green';
                    }
                }
                otr.appendChild(otdstu);
                otdTotalScore+=parseInt(allStu[i].item[j])
            }
//                var otdnew=document.createElement('td');
//                otdnew.innerHTML=otdTotalScore;
//                otr.insertBefore(otdnew,otr.childNodes[1]);
            Fragment.appendChild(otr);
        }
        appendix.appendChild(Fragment);


    }
    try{appendix()}catch(err){

    }
    var dataLabelNode = $(".highcharts-data-labels").find("g");//获取数据节点
    for(var i = 0; i<dataLabelNode.length; i++){
        if($(dataLabelNode[i]).find("tspan").text()!="0"){
            dataLabelNode[i].style.visibility = "visible";
            dataLabelNode[i].style.opacity = "1";
        }
    }

}

function bindUrlTOa(){
    var pdfUrl="http://115.29.220.75:8080/WKPDFReport/import?type="+9+"&key=id&value="+	     reportId+"&filename="+"RC"+reportId;
    loadPdf.href=pdfUrl;
    loadPdf.target="_blank"
}
bindUrlTOa();
