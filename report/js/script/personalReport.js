/**
 * Created by qjl on 2016/12/23.
 */
//2017-3-14  'old' 学科能力图谱结构新旧判断
function fullScoreJurge(fullId) {
  var fs_goodword = document.getElementById("fs_goodword");
  var fs_problem = document.getElementById("fs_problem");
  var fs_highPoint = document.getElementById("fs_highPoint");
  var fs_weekPoint = document.getElementById("fs_weekPoint");
  var errorTest = document.getElementById("errorTest");
  var strongNum = document.getElementById("strongNum");
  if (fullId) {
    fs_goodword.style.display = "block";
    fs_problem.style.display = "none";

    fs_highPoint.style.display = "block";
    fs_weekPoint.style.display = "none";
    var highPiont = PersonReportData.highPoint;
    if (highPiont && highPiont.length > 0) {
      fs_highPoint.style.display = "block";
    } else {
      fs_highPoint.style.display = "none";
    }

    errorTest.style.display = "none";
    strongNum.innerHTML = "1";
  } else {
    fs_goodword.style.display = "none";
    fs_problem.style.display = "block";


    fs_highPoint.style.display = "none";
    fs_weekPoint.style.display = "block";

    errorTest.style.display = "block";
    strongNum.innerHTML = "2";
  }

}

try {
  fullScoreJurge(fullId);
} catch (err) {

}
//----------四舍五入----------
function deelwithscore(score, bit) {
  var oScore = null;
  var oScore1 = null;
  var oScore2 = null;
  if (typeof score == "number") {
    oScore = score;
    if (oScore > 0 && oScore < 1) {
      oScore = oScore * 100 - 0;
      oScore1 = oScore.toFixed(bit);
      oScore2 = oScore.toFixed(0);
      if (oScore1 - oScore2) {
        return oScore1;
      } else {
        return oScore2;
      }

    } else {
      oScore1 = oScore.toFixed(bit);
      oScore2 = oScore.toFixed(0);
      if (oScore1 - oScore2) {
        return oScore1;
      } else {
        return oScore2;
      }
    }

  } else {
    oScore = parseFloat(score);
    if (oScore > 0 && oScore < 1) {
      oScore = oScore * 100 - 0;
      oScore1 = oScore.toFixed(bit);
      oScore2 = oScore.toFixed(0);
      if (oScore1 - oScore2) {
        return oScore1;
      } else {
        return oScore2;
      }

    } else {
      oScore1 = oScore.toFixed(bit);
      oScore2 = oScore.toFixed(0);
      if (oScore1 - oScore2) {
        return oScore1;
      } else {
        return oScore2;
      }
    }
  }

}
//页面加载----------------------------------
function yemianJIAzai() {
  var delay = document.getElementById("delay");
  var jiazai = document.getElementById("jiazai");

  jiazai.style.display = "none";
  delay.style.display = "block";

}
yemianJIAzai();
//动态添加数据。
//-----------PAGE1-------------------------------------
function delayload(contentType, perId) {
  //权限参数1 显示；0只显示摘要；
  function judgeJurisdiction() {
    var jiaofei = document.getElementById("jiaofei");
    var judge = document.getElementById("judge");
    if (contentType == "summary") {
      judge.style.display = "none";
      jiaofei.style.display = "block";
    } else {
      judge.style.display = "block";
    }
  }

  judgeJurisdiction();
  function deelwithFace() {
    //教学周
    var ospanWeek = document.getElementsByClassName("teachWeek");
    var weekUnit = PersonReportData.report.cover.createDate;

    ospanWeek[0].innerHTML = weekUnit;      //个人信息
    var personalInfo = document.getElementById("personalInfo");
    var oh1 = personalInfo.querySelectorAll("h1");
    oh1[0].querySelector("span").innerHTML = PersonReportData.report.cover.studentName + "同学";
    oh1[1].querySelector("span").innerHTML = "（" + PersonReportData.report.cover.subjectName + "）";
    //学号，班级
    var faceDetail = document.getElementsByClassName("faceDetail");
    faceDetail[0].innerHTML = PersonReportData.report.cover.schoolName;
    if (!PersonReportData.report.cover.teacherName) {
      $('.laoshi').css({
        display: 'none'
      })
    }
    faceDetail[1].innerHTML = PersonReportData.report.cover.teacherName;
    faceDetail[2].innerHTML = PersonReportData.report.cover.materialName;
  }

  try {
    deelwithFace();
  } catch (err) {
    //在此处理错误
  }
  //
  function Getyoupuzhanghao() {
    var youpuzhanghao = document.getElementById("youpuzhanghao");
    var ospan = youpuzhanghao.querySelectorAll("span");
    ospan[0].innerHTML = PersonReportData.questionData.youpuid;
    ospan[1].innerHTML = PersonReportData.questionData.youpuid
  }

  try {
    Getyoupuzhanghao();
  } catch (err) {

  }
  //-----------YEmei--------------------------------
  function deelWithYemei() {
    var yemei = document.getElementsByClassName("yemei");
    for (var i = 0; i < yemei.length; i++) {
      yemei[i].innerHTML = PersonReportData.report.cover.studentName + "同学学情分析报告（" + PersonReportData.report.cover.subjectName + '）';
    }
  }

  try {
    deelWithYemei()
  } catch (err) {
    //在此处理错误
  }

  //-----------PAGE2----------------------------------
  function deelwithPage2() {
    var judgeProblem = document.getElementById("judgeProblem");
    var findProblem = document.getElementById("judgeProblem");

    //1、单体数据；
    function anserwerDate() {
      var testDate = document.getElementById("testDate");
      var testSPan = testDate.querySelectorAll("span");
      for (var i = 0; i < testSPan.length; i++) {
        testSPan[i].className = "testDateSpan";
      }
      testSPan[0].innerHTML = deelwithscore(PersonReportData.report.summary.studentScore, 1);
      var testDate_app = document.getElementById("testDate_app");
      testDate_app.innerHTML = PersonReportData.report.summary.PointNum;
    }

    try {
      anserwerDate();
    } catch (err) {

    }
    //2、问题发现；
    function problem() {
      try {
        getProblem();
        getAbility();
        getThought();
      } catch (err) {

      }
      deelwithtestBySelf();
    }

    function getProblem() {
      var fs_goodword = document.getElementById("fs_goodword");
      var fs_problem = document.getElementById("fs_problem");
      var oSpanProblem = document.getElementById("findProblem");
      var judgefindProblem = document.getElementById("judgefindProblem");
      var ary = [];
      var ospan1 = null;
      var ospan2 = null;
      var length = 0;
      ospan1 = document.createElement("span");
      ospan1.className = "ospan1";
      var problem = PersonReportData.report.summary.weakPointList;
      if (problem.length > 0) {
        judgefindProblem.style.display = "block";
        if (problem.length > 5) {
          length = 5;
        } else {
          length = problem.length;
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
      } else if (PersonReportData.report.summary.paperScore == PersonReportData.report.summary.studentScore) {
        fs_problem.style.display = "none";
        fs_goodword.style.display = "block";
      }

    }

    function getAbility() {
      var oSpanAbility = document.getElementById("findabilitiy");
      var judgefindProblem = document.getElementById("judgefindabilitiy");

      var ary = [];
      var ospan1 = null;
      var ospan2 = null;
      var length = 0;
      ospan1 = document.createElement("span");
      ospan1.className = "ospan1";
      var findability = PersonReportData.report.summary.weakAbilityList;

      if (findability.length > 0) {
        judgefindProblem.style.display = "block";
        if (findability.length > 5) {
          length = 5;
        } else {
          length = findability.length;
        }
        for (var i = 0; i < length; i++) {
          ospan2 = null;
          ospan2 = document.createElement("span");
          ospan2.className = "ospan2";
          ospan2.innerHTML = findability[i];

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
      } else {
        judgefindProblem.style.display = "none";
      }

    }

    function getThought() {
      var oSpanAbility = document.getElementById("thought");
      var judgefindProblem = document.getElementById("judgefindthought");

      var ary = [];
      var ospan1 = null;
      var ospan2 = null;
      var length = 0;
      ospan1 = document.createElement("span");
      ospan1.className = "ospan1";
      var findability = PersonReportData.report.summary.weakThoughtList;

      if (findability.length > 0) {
        judgefindProblem.style.display = "block";
        if (findability.length > 5) {
          length = 5;
        } else {
          length = findability.length;
        }
        for (var i = 0; i < length; i++) {
          ospan2 = null;
          ospan2 = document.createElement("span");
          ospan2.className = "ospan2";
          ospan2.innerHTML = findability[i];
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
      } else {
        judgefindProblem.style.display = "none";
      }

    }

    try {
      problem();
    } catch (err) {

    }
    //2、学习建议；
    function learnSuggestion() {
      var olearnSuggestion = document.getElementById("learnSuggestion");
      var judgelearnSuggestion = document.getElementById("judgelearnSuggestion");
      var oli = null;
      var suggest = PersonReportData.studySuggest;
      if (suggest.length > 0) {
        judgelearnSuggestion.style.display = "block";
        for (var i = 0; i < suggest.length; i++) {
          oli = null;
          oli = document.createElement("li");
          oli.innerHTML = suggest[i];
          olearnSuggestion.appendChild(oli);
        }
      } else {
        judgelearnSuggestion.style.display = "none";
      }
    }

    try {
      learnSuggestion();
    } catch (err) {

    }

  }

  try {
    deelwithPage2();
  } catch (err) {
    //在此处理错误
  }
  //-----------正文--------------------------------------
  //一、本次测试分析
  //1、本次测试得分
  function testScore() {
    //score
    var studentScore = document.getElementById("studentScore");
    var totalScore = document.getElementById("totalScore");
    studentScore.innerHTML = deelwithscore(PersonReportData.report.summary.studentScore, 1);
    totalScore.innerHTML = '（共' + deelwithscore(PersonReportData.report.summary.paperScore, 1) + '分）';
  }

  try {
    testScore();
  } catch (err) {
    //在此处理错误
  }
  //二、本次测试知识点掌握情况
  //1、概况
  $(function () {
    var ospan = document.getElementsByClassName("posintState");
    ospan[0].innerHTML = PersonReportData.report.summary.PointNum;
    var masterData = PersonReportData.report.analysis.pointGrasp;
    var great = (masterData.great.substring(0, masterData.great.length - 1) / 100).toFixed(2);
    var good = (masterData.good.substring(0, masterData.good.length - 1) / 100).toFixed(2);
    var medium = (masterData.medium.substring(0, masterData.medium.length - 1) / 100).toFixed(2);
    var poor = (masterData.poor.substring(0, masterData.poor.length - 1) / 100).toFixed(2);
    var data = [
      {name: '优', y: parseFloat(great)},
      {name: '良', y: parseFloat(good)},
      {name: '中', y: parseFloat(medium)},
      {name: '差', y: parseFloat(poor)}
    ];
    $('#part2_Survey').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        style: {
          fontFamily: 'KaiTi',
          fontWeight: '0',
          fontSize: "1.8rem",
          marginRight: 'auto',
          marginLeft: 'auto'
        }
      },

      title: {
        text: '知识点状态',
        style: {

          fontWeight: '0',
          fontSize: "1.8rem"
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b style="font-size:1.5rem ">{point.percentage:.1f}%</b>',
        style: {
          padding: 15,
          lineHeight: "20rem",

          fontWeight: '0',
          fontSize: "1.8rem"
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
              fontSize: "1.8rem"
            }
          }
        }
      },
      xAxis: {
        labels: {}
      },
      series: [{
        type: 'pie',
        name: '知识点掌握状态',
        data: data
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    });
  });
  //2、明细
  function handlePoints() {
    var points = PersonReportData.report.analysis.pointDetailList;
    var pointTable = document.getElementById("pointDetails");
    if (points.length > 0) {
      for (var i = 0; i < points.length; i++) {
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdStatus = document.createElement('td');
        var tdRate = document.createElement('td');
        tdName.innerHTML = points[i].pointName;
        tdStatus.innerHTML = points[i].pointStatus;
        tdRate.innerHTML = points[i].getScoreRate;
        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tr.appendChild(tdRate);
        pointTable.appendChild(tr);
      }
    }
  }

  try {
    handlePoints();
  } catch (err) {
    //在此处理错误
  }
  //3、薄弱知识点及其讲解
  function handleKnowledge() {
    var fs_weekPoint = document.getElementById("fs_weekPoint");
    var WeakPiont = PersonReportData.report.analysis.weakPointExplainList;
    if (WeakPiont.length == 0) {
      fs_weekPoint.style.display = "none";
    } else {
      fs_weekPoint.style.display = "block";
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
      knowledgename.innerHTML = "知识点名称" + ":" + "<span style='color:#00b0f0'>" + WeakPiont[i].pointName + "</span>";
      currentMaster.innerHTML = "当前掌握状态" + ":" + "<span style='color:#00b0f0'>" + WeakPiont[i].pointStatus + "</span>";
      knowledgeExplain.innerHTML = "知识点讲解" + ":" + (WeakPiont[i].pointExplain == null ? '暂无' : WeakPiont[i].pointExplain);
      knowledgeBox.appendChild(knowledgename);
      knowledgeBox.appendChild(currentMaster);
      knowledgeBox.appendChild(knowledgeExplain);
      tableFragment.appendChild(knowledgeBox);
    }
    knowledge.appendChild(tableFragment);
  }

  try {
    handleKnowledge();
  } catch (err) {
    //在此处理错误
  }
  //三、本次测试学科能力和思想方法分析：
  function handleAbilityAndThought() {
    var pointsAndThoughts = PersonReportData.report.analysis.abilityDetailList.concat(PersonReportData.report.analysis.thoughtDetailsList);
    if (pointsAndThoughts.length < 1) {
      document.getElementById('pId_three').style.display = 'none';
    } else {
      var pointTable = document.getElementById("abilityAndThoughtDetails");
      if (pointsAndThoughts.length > 0) {
        for (var i = 0; i < pointsAndThoughts.length; i++) {
          var tr = document.createElement('tr');
          var tdName = document.createElement('td');
          var tdTotalScore = document.createElement('td');
          tdTotalScore.style.width = '210px';
          var tdYourScore = document.createElement('td');
          var tdRate = document.createElement('td');
          tdName.innerHTML = pointsAndThoughts[i].abilityName ? pointsAndThoughts[i].abilityName : pointsAndThoughts[i].thoughtName;
          tdTotalScore.innerHTML = pointsAndThoughts[i].totalScore;
          tdYourScore.innerHTML = pointsAndThoughts[i].getScore;
          tdRate.innerHTML = (pointsAndThoughts[i].getScoreRate * 100).toFixed(1) + '%';
          tr.appendChild(tdName);
          tr.appendChild(tdTotalScore);
          tr.appendChild(tdYourScore);
          tr.appendChild(tdRate);
          pointTable.appendChild(tr);
        }
      }
    }
  }

  try {
    handleAbilityAndThought();
  }
  catch (err) {
    //在此处理错误
  }
  //学科知识图谱
  function subjectAbility_Map() {
    var categories0 = PersonReportData.report.analysis.abilityDetailList.concat(PersonReportData.report.analysis.thoughtDetailsList);
    var categories = [];
    var categoriesNames = [];
    //var data = [];

    for (var i = 0; i < categories0.length; i++) {
      categories.push(categories0[i].getScoreRate);
      categoriesNames.push(categories0[i].abilityName ? categories0[i].abilityName : categories0[i].thoughtName);
    }

    var series = [];
    var obj2 = {
      name: '个人能力值',
      data: categories,
      pointPlacement: 'on'
    };
    series.push(obj2);
    $(function () {
      $('#subjectMap').highcharts({
        chart: {
          polar: true,
          type: 'line',
          style: {
            fontSize: "1.8rem",
            fontFamily: 'KaiTi',
            marginRight: 'auto',
            marginLeft: 'auto'
          }
        }, plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
              style: {"color": "green", fontWeight: "normal"}
            }
          }
        },
        title: {
          text: '  ',
          x: -1
        },
        pane: {
          size: '80%'
        },
        xAxis: {
          categories: categoriesNames,
          tickmarkPlacement: 'on',
          lineWidth: 0,
          labels: {
            style: {
              fontSize: "1.8rem"
            }
          }
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: 1,
          labels: {
            style: {
              fontSize: "1.8rem"
            }
          }
        },

        tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>',
          style: {
            fontSize: "1.8rem"
          }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          y: 0,
          layout: 'vertical',
          itemStyle: {
            fontSize: "1.8rem"
          }
        },

        series: series,
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    });

    /*function findabilitiy2() {
     //新课标界定
     var totalAbility = document.getElementsByClassName("totalAbility");
     totalAbility[0].innerHTML = PersonReportData.subjectPowerGraph.subjectName;
     totalAbility[1].innerHTML = PersonReportData.subjectPowerGraph.subjectAbilityNum;
     var totalAbility2 = document.getElementById("totalAbility2");
     var oP_oSpanAbility2 = document.getElementById("oP_oSpanAbility2");
     var ary = [];
     var ospan1 = null;
     var ospan2 = null;
     ospan1 = document.createElement("span");
     ospan1.className = "ospan1";
     if (PersonReportData.subjectPowerGraph.weakAbility.length > 0) {
     oP_oSpanAbility2.style.display = "block";
     } else {
     oP_oSpanAbility2.style.display = "none";
     }
     for (var i = 0; i < PersonReportData.subjectPowerGraph.weakAbility.length; i++) {
     ospan2 = null;
     ospan2 = document.createElement("span");
     ospan2.className = "ospan2";
     //_______________________________________________________________________________________学科能力图谱结构变化新旧判断
     if (old) {
     ospan2.innerHTML = PersonReportData.subjectPowerGraph.weakAbility[i];
     } else {
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

     try {
     findabilitiy2();
     } catch (err) {
     //在此处理错误
     }*/
  }

  try {
    subjectAbility_Map();
  } catch (err) {
    //在此处理错误
  }
  //四、“周周清”学习建议-修改版
  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  function formatQuestionText(txt) {
    if (txt && typeof txt === 'object' && Array == txt.constructor) {
      txt = '[' + txt.toString() + ']';
    } else if (txt instanceof Object) {
      txt = JSON.stringify(txt);
    }
    txt = txt.trim();
    if (txt.indexOf("<P>") == 0) {
      txt = txt.substring(3, txt.length - 4);
    }
    txt = "<DIV>" + txt + "</DIV>";
    // 替换图片地址
    var reg = new RegExp('src="/Public/pic/', "g");
    txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
    return txt;
  }

  function formatQuestionText1(txt) {
    if(txt && typeof txt==='object' && Array == txt.constructor){
      txt = '[' + txt.toString() + ']';
    }else if(txt instanceof Object){
      txt = JSON.stringify(txt);
    }
    txt = txt.trim();
    var txt = txt.replace(/(<P>)/g, "<div>");
    txt = txt.replace(/(<\/P>)/g, "<\/div>");
    txt = txt.replace(/<link rel="stylesheet" type="text\/css" href="http:\/\/img2.51youpu.com\/css\/question.css"\/>/, "");
    // 替换图片地址
    var reg = new RegExp('src="/Public/pic/', "g");
    txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
    return txt;
  }

  //2、强化练习
  function getIntensiveExercise() {
    function deelwithAnswer() {
      var a = datalist;
      for (var i = 0; i < a.length; i++) {
        a[i].text = formatQuestionText(a[i].questionText);
        a[i].answers = [];
        if (a[i].answerList && a[i].answerList.length > 0) {
          for (var j = 0; j < a[i].answerList.length; j++) {
            a[i].answers.push({answer: a[i].answerList[j]});
          }
          var b = a[i].answers;
        }
        //绑定abcd
        if (a[i].answerList && a[i].answerList.length > 0) {
          for (var j = 0; j < a[i].answerList.length; j++) {
            //单选双选题
            b[j].text = a[i].answerList[j];
            if (j == 0) {
              b[j].abcd = "A";
            } else if (j == 1) {
              b[j].abcd = "B";
            } else if (j == 2) {
              b[j].abcd = "C";
            } else if (j == 3) {
              b[j].abcd = "D";
            } else if (j == 4) {
              b[j].abcd = "E";
            } else if (j == 5) {
              b[j].abcd = "F";
            } else if (j == 6) {
              b[j].abcd = "G";
            } else if (j == 7) {
              b[j].abcd = "H";
            }
            //拼接一个完整的选择题选项
            b[j].holeAnwser1 = '<div style="float: left;padding-left:15px;">' + b[j].abcd + ' . </div>' + formatQuestionText(b[j].text);
            //图片解析
            b[j].holeAnwser = b[j].holeAnwser1;
          }
        }
      }
    }

    var datalist = PersonReportData.report.adviceList;
    var intensiveExercise = document.getElementById("intensiveExercise");
    //判断强化练习存不存在
    var strongPrectice = document.getElementsByClassName("part_2");
    if (datalist == null || datalist.length == 0) {
      strongPrectice[0].style.display = "none";
    } else {
      strongPrectice[0].style.display = "block";
    }
    deelwithAnswer();
    var odiv = null;
    var ob = null;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < datalist.length; i++) {
      var pointDiv = null;
      var AnalysisDiv = null;
      var solutionDiv = null;
      var CommentDiv = null;
      datalist[i].order = "题" + (i + 1) + ":";
      odiv = document.createElement("div");
      odiv.className = "exercisesStyle";
      ob = document.createElement("b");
      ob.innerHTML = datalist[i].order;
      //添加题号
      odiv.appendChild(ob);
      var oh4 = document.createElement("h4");
      oh4.innerHTML = formatQuestionText1(datalist[i].text);
      //添加题目
      odiv.appendChild(oh4);
      if (datalist[i].answerList && datalist[i].answerList.length > 0) {
        for (var j = 0; j < datalist[i].answerList.length; j++) {
          var option = document.createElement("div");
          if (datalist[i].answerList) {
            option.innerHTML = datalist[i].answers[j].holeAnwser;
            option.className = "ansSelectLIst"
          } else {
            option.innerHTML = "";
          }
          //添加题目
          odiv.appendChild(option);
        }
      }
      fragment.appendChild(odiv);
    }
    intensiveExercise.appendChild(fragment);

    //处理强化练习二维码图片;
    var S_practice = document.getElementById("S_practice");
    var s_word = document.getElementById("s_word");
    if (PersonReportData.report.strongPracticeUrl == "" || PersonReportData.report.strongPracticeUrl == null || typeof PersonReportData.report.strongPracticeUrl == "undefined") {
      S_practice.src = "";
      S_practice.style.display = "none";
      s_word.style.display = "none";
    } else {
      S_practice.src = PersonReportData.report.strongPracticeUrl;
      S_practice.style.display = "block";
      s_word.style.display = "block";
    }
  }

  try {
    getIntensiveExercise();
  } catch (err) {
    //在此处理错误
  }
}

delayload(contentType, perId);
var loadPdf = document.getElementById("loadPdf");

function bindUrlTOa() {
  var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 16 + "&key=id&value=" + reportId + "&filename=" + "RS" + reportId;
  loadPdf.href = pdfUrl;
  loadPdf.target = "_blank"
}

bindUrlTOa();


//wkhtmltopdf --outline-depth 2 --footer-html http://192.168.1.113:8081/reportModal/report/studentReport_new/studentFooter.html --header-html http://192.168.1.113:8081/reportModal/report/studentReport_new/studentHeader.html?id=76569 cover http://192.168.1.113:8081/reportModal/report/studentReport_new/studentCover.html?id=76569 http://192.168.1.113:8081/reportModal/report/studentReport_new/studentReport.html?id=76569 grbg.pdf
