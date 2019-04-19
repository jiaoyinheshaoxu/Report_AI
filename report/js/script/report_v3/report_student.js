/**
 * Created by qjl on 2017/5/16.
 */
//2017-5-16 v4.3.9 新版本
//----------四舍五入----------
//页面加载----------------------------------
function yemianJIAzai() {
  var delay = document.getElementById("delay");
  var jiazai = document.getElementById("jiazai");
  jiazai.style.display = "none";
  delay.style.display = "block";
}

if (PersonReportData && typeof PersonReportData !== 'undefined') {
  delayload(contentType, perId);
  checkGrade();
  yemianJIAzai();
}

function checkGrade() {
  if (reportType == 2 || reportType == 3) {
    var rank = PersonReportData.thisTestScore.classSort;
    var Avg = PersonReportData.thisTestScore.classAvg;
    $('.GYDF_2').show();
    $('.GYDF_2_cRank span:nth-child(2)').text('班级排名：' + rank + '名');
    $('.GYDF_2_cAvr span:nth-child(2)').text('班级平均分：' + Avg + '分');
    $('.GYDF_2_gAvr span:nth-child(2)').hide();
  }
}
//动态添加数据。
function delayload(contentType, perId) {
  //封面----->>>>>>>>>>>>>
  function deelwithFace() {
    var cover = PersonReportData.cover;
    $('.FMBT1 header>span').text('-' + cover.subjectName);
    $('#FMBT2_1 tr:nth-child(1)>td:nth-child(2)').html(cover.className);
    $('.FMBT1>header:nth-child(1)').text(cover.studentName);
    $('.FMBT').text(cover.subjectName)
    $('.FMXX_sch').text(cover.schoolName);
    console.log($('.FMXX_timeType')[1]);
    $('.FMXX_testTime').html(cover.testTime);
    $('.FMXX_type').html(cover.testType);
    $('.FMXX_reportTime').html(cover.date);
  }
  try {
    deelwithFace();
  } catch (err) {}
  // 页眉
  function deelYemei() {
    var cover = PersonReportData.cover;
    $('.yemei_2').html(cover.studentName+'学情分析报告：'+cover.subjectName+'、'+cover.testType)
  }
  deelYemei();
  //概要----->>>>>>>>>>>>>
  function gaiyao() {
    //1-1得分情况
    var thisTestScore = PersonReportData.thisTestScore;
    $('#GYDF_1 span:nth-child(1)').text(thisTestScore.studentScore);
    $('#GYDF_1 span:nth-child(2)').text(thisTestScore.testAllScore);
    // $('.GYDF_2').hide();
    $('#GYtitle .GYtitleContent').html(PersonReportData.summary.testName)
    // $('.GYDF_1').after("<div style='text-align:center;font-size:2rem;color:gray;'>"+PersonReportData.cover.paperName+"</p>");
    var summary = PersonReportData.summary
    $('.GYDF_2_cRank span:nth-child(2)').text('班级排名：');
    $('.GYDF_2_cRank span:nth-child(3)').text(summary.classSort);
    $('.GYDF_2_cAvr span:nth-child(1)').text('班级平均分：');
    $('.GYDF_2_cAvr span:nth-child(2)').text(summary.classAvg);
    $('.GYDF_2_gRank span:nth-child(2)').text('年级排名：');
    $('.GYDF_2_gRank span:nth-child(3)').text(summary.gradeSort);
    $('.GYDF_2_gAvr span:nth-child(1)').text('年级平均分：');
    $('.GYDF_2_gAvr span:nth-child(2)').text(summary.gradeAvg);
    //1-2测试评价
    var evaluation = PersonReportData.evaluation;
    if (evaluation.excellentPoints.length > 0) {
      for (var i = 0; i < evaluation.excellentPoints.length; i++) {
        $('.GYPJ_2_l').append('<div>' + evaluation.excellentPoints[i] + '</div>')
      }
    } else {
      $('.GYPJ_2_l').append('<div>' + '无' + '</div>')
    }
    if (evaluation.weakPoints.length > 0) {
      for (var i = 0; i < evaluation.weakPoints.length; i++) {
        $('.GYPJ_2_r').append('<div>' + evaluation.weakPoints[i] + '</div>')
      }
    } else {
      $('.GYPJ_2_r').append('<div>' + '无' + '</div>')
    }
    if ((evaluation.excellentPoints.length - evaluation.weakPoints.length) > 0) {
      $('.GYPJ_2>div:nth-child(1)').css('border-right', '1px dashed black')
    } else {
      $('.GYPJ_2>div:nth-child(2)').css('border-left', '1px dashed black')
    }
    // 班级排名图谱
    (function() {
      var historySort = PersonReportData.summary.historySort;
      var seriesData = [];
      var xAxisData = [];
      var classData = [],
        gradeData = [];
      if (historySort && historySort.length > 0) {
        for (var i = 0; i < historySort.length; i++) {
          classData.push(historySort[i].classSort);
          gradeData.push(historySort[i].gradeSort);
          xAxisData.push(historySort[i].testName);
        }
      }
      $('#classGrank').highcharts({
        chart: {
          type: 'column',
          width: 800,
          style: {
            fontSize: "1.8rem",
            fontFamily: 'KaiTi',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: '#e4f3f9',
          }
        },
        title: {
          text: ' '
        },
        xAxis: {
          categories: xAxisData
        },
        yAxis: {
          title: {
            text: '' //指定y轴的标题
          },
          labels: {
            style: {
              color: "black",
              fontSize: "1.8rem"
            }
          }
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false
        },
        series: [{ //指定数据列
          name: '班级排名', //数据列名
          data: classData //数据
        }, {
          name: '年级排名',
          data: gradeData
        }],
      });
    })()
  }
  gaiyao();
  // try{ gaiyao();}catch(err){}
  //得分统计----->>>>>>>>>>>>>
  //--得分分布
  //--本次测试班级，年级得分分布情况
  function thisTestGradeClassScoreDistribution() {
    (function() {
      var categories = [];
      var seriesGrade = [];
      var seriesClass = [];
      var fenbu = PersonReportData.gradeClassScoreDistribution;
      categories=fenbu.categories;
      seriesGrade=fenbu.gradeData;
      seriesClass=fenbu.classData;
      $('#ScoreDistribution').highcharts({ //图表展示容器，与div的id保持一致
        chart: {
          type: 'column',
          width: 800,
          style: {
            fontFamily: 'KaiTi',
            marginRight: 'auto',
            marginLeft: 'auto'
          }
          //指定图表的类型，默认是折线图（line）
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              style: {
                "color": "green",
                fontWeight: "normal"
              }
            }
          }
        },
        title: {
          text: '班级、年级得分分布情况', //指定图表标题
          style: {
            color: "black",
            fontSize: "1.8rem"
          }
        },
        legend: {
          itemStyle: {
            fontSize: "1.8rem"
          }
        },
        tooltip: {
          style: {
            padding: 15,
            lineHeight: "20rem",
            fontSize: "1.8rem"
          }
        },
        xAxis: {
          categories: categories, //指定x轴分组
          labels: {
            style: {
              fontSize: "1.8rem"
            }
          }
        },
        yAxis: {
          title: {
            text: '' //指定y轴的标题
          },
          labels: {
            style: {
              color: "black",
              fontSize: "1.8rem"
            }
          }
        },
        series: [{ //指定数据列
          name: '年级人数', //数据列名
          data: seriesGrade //数据
        }, {
          name: '班级人数',
          data: seriesClass
        }],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }

      });
    })(); //chart1= 班级、年级得分分布情况
  }
  thisTestGradeClassScoreDistribution();
  //--历史得分
  function histroyScore() {
    var chart = new Highcharts.Chart('history', {
      title: {
        text: ' ',
        x: -20
      },
      chart: {
        type: 'line',
        width: 800,
        style: {
          fontSize: "1.8rem",
          fontFamily: 'KaiTi',
          marginRight: 'auto',
          marginLeft: 'auto',
        }

      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories:PersonReportData.historyScore.xname,
      },
      yAxis: {
        title: {
          text: ' '
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        valueSuffix: '°C'
      },
      legend: {
        itemStyle: {
          fontSize: "1.8rem"
        }
      },
      series:PersonReportData.historyScore.series,
    });
  }
  histroyScore();
  //--本次测试得分
  function tifenfangan() {
    var datalist = PersonReportData.thisTestQuestionAnalyze.questionAnalyzeList;

    for (var i = 0; i < datalist.length; i++) {
      datalist[i].cnType = '';
      switch (datalist[i].questionType) {
        case 1:
          datalist[i].cnType = '单选';
          break;
        case 2:
          datalist[i].cnType = '多选';
          break;
        case 3:
          datalist[i].cnType = '填空';
          break;
        case 4:
          datalist[i].cnType = '简答';
          break;
      }
      var chazhi = parseInt(datalist[i].studentScore) - parseInt(datalist[i].score);
      var color = '',
        font = '';
      if (chazhi < 0) {
        color = '#de685c';
        font = 'white';
      } else {
        color = '#e3f2f5';
        font = 'black';
      }
      $('#TMFX_1_1').append(
        '<tr><td>' + datalist[i].number + '</td><td>' + datalist[i].cnType + '</td><td>' + datalist[i].points + '</td><td>' + datalist[i].score + '</td><td style="background-color:' + color + ';color:' + font + '">' + datalist[i].studentScore + '</td></tr>'
      )
    }
  }
  tifenfangan();
  //知识点、学科能力、思想方法分析----->>>>>>>>>>>>>
  //本次测试知识点分析
  function setKnowledge() {
    var goodWord = '';
    var sadWord = '';
    var evaluation = PersonReportData.evaluation;
    goodWord = evaluation.excellentPoints.join(',');
    sadWord = evaluation.weakPoints.join(',');
    $('.mastergood').html('“<span class="colorblue">' + goodWord + '</span>”')
    $('.mastersad').html('“<span class="colorblue">' + sadWord + '</span>”')
  };
  setKnowledge();
  //本次测试知识点分析详见下表：
  function makeTable() {
    var knowledgeAnaylzeAry = PersonReportData.thisTestKnowledgePointAnaylze;
    if (knowledgeAnaylzeAry && knowledgeAnaylzeAry.length > 0) {
      for (var i = 0; i < knowledgeAnaylzeAry.length; i++) {
        $('#scoreTable').append(
          '<tr><td style="text-align:center;">' + knowledgeAnaylzeAry[i].name + '</td><td style="text-align:center;">' + knowledgeAnaylzeAry[i].allScore + '</td><td style="text-align:center;">' + knowledgeAnaylzeAry[i].score + '</td><td style="text-align:center;">' + (knowledgeAnaylzeAry[i].classRate * 100).toFixed(0) + '%</td><td style="text-align:center;">' + (knowledgeAnaylzeAry[i].gradeRate * 100).toFixed(0) + '%</td></tr>'
        )
      }
    }
  }
  makeTable()
  //本次测试学科能力分析；
  function subjectAbility() {
    var subjectPowerGraph = PersonReportData.subjectPowerGraph;
    var ability = subjectPowerGraph.weakAbility.join(',');
  }
  // subjectAbility()

  function makeAbilityTable() {
    var abilityAnaylzeAry = PersonReportData.thisTestSubjectAbilityAndThoughtMethodAnaylze;
    if (abilityAnaylzeAry && abilityAnaylzeAry.length > 0) {
      for (var i = 0; i < abilityAnaylzeAry.length; i++) {
        $('#abilityTable').append(
          '<tr><td style="text-align:center;">' + abilityAnaylzeAry[i].subjectAbilityName + '</td><td style="text-align:center;">' + abilityAnaylzeAry[i].subjectAbilityScore + '</td><td style="text-align:center;">' + abilityAnaylzeAry[i].studentSubjectAbilityScore + '</td><td style="text-align:center;">' + (abilityAnaylzeAry[i].classSubjectAbilityScoreRate * 100).toFixed(0) + '%</td><td style="text-align:center;">' + (abilityAnaylzeAry[i].gradeSubjectAbilityScoreRate * 100).toFixed(0) + '%</td></tr>'
        )
      }
    }
  }
  makeAbilityTable()

  function abilityMap() {
    var categories = [],weakAbility=[];
    var categories0 = PersonReportData.subjectPowerGraph.abilityName;
    var weakAbility0 = PersonReportData.subjectPowerGraph.weakAbility;
    var stu = PersonReportData.subjectPowerGraph.studentScore;
    var gra = PersonReportData.subjectPowerGraph.gradeAvgScore;
    var stu_Score = "0";
    var studata = [];
    var grade_Score = "0";
    var gradedata = [];

    for (var i = 0; i < categories0.length; i++) {
      categories.push(categories0[i].value);
      for (var j = 0; j < stu.length; j++) {
        if (stu[j].key == categories0[i].key) {
          stu_Score = "0";
          stu_Score = stu[j].value.toFixed(2) - 0;
          studata.push(stu_Score)
        }
      }
      for (var k = 0; k < gra.length; k++) {
        if (gra[k].key == categories0[i].key) {
          grade_Score = "0";
          grade_Score = gra[k].value.toFixed(2) - 0;
          gradedata.push(grade_Score)
        }
      }
    }
    for(var i=0;i<weakAbility0.length;i++){
        weakAbility.push(weakAbility0[i].value);
    }
    $('.sadAbility').html('“<span class="colorblue">' + weakAbility + '</span>”')
    $('#sadAbility').html(PersonReportData.subjectPowerGraph.weakAbilityExplain)
    var series = [];
    var obj1 = {
      name: '平均能力',
      data: gradedata,
      pointPlacement: 'on'
    };
    var obj2 = {
      name: '个人能力',
      data: studata,
      pointPlacement: 'on'
    };
    if (!perId) {
      series.push(obj1);
    }
    series.push(obj2);
    //      var studata=PersonReportData.subjectPowerGraph.studentScore;
    (function() {
      $('#PART3_table_ability_Map').highcharts({
        chart: {
          polar: true,
          type: 'line',
          style: {
            fontSize: "1.8rem",
            fontFamily: 'KaiTi',
            marginRight: 'auto',
            marginLeft: 'auto'

          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
              style: {
                "color": "green",
                fontWeight: "normal"
              }
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
          categories: categories,
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
    })();
  };
  abilityMap();
  //提分方案----->>>>>>>>>>>>>
  //2-1典型错题分析
  function cuotifenxi() {
    var datalist = PersonReportData.classicErrorQuestionExplain;

    function deelwithAnswer() {
      var a = datalist;
      for (var i = 0; i < a.length; i++) {
        a[i].text = formatQuestionText(a[i].text);
        var b = a[i].answers;
        //绑定abcd
        for (var j = 0; j < b.length; j++) {
          //单选双选题
          if (a[i].qtype == 1 || a[i].qtype == 2) {
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
            b[j].holeAnwser1 = formatQuestionText1(b[j].answer);
            //图片解析
            b[j].holeAnwser = b[j].holeAnwser1;
            //添加正确答案 属性
            if (b[j].isrightanswer == 1) {
              a[i].rightAnswer = b[j].abcd;
            };
          }
          //简答题
          if (a[i].qtype == 4) {
            a[i].rightAnswer = b[j].answer
          }
          //填空题
          if (a[i].qtype == 3) {
            a[i].rightAnswer = b[j].answer
          }
        }
      }
    }
    deelwithAnswer();

    function deelwithAnswer2() {
      var a = datalist;
      for (var i = 0; i < a.length; i++) {
        if (typeof a[i].testText !== 'undefined') {
          a[i].testText = formatQuestionText(a[i].testText);
        }
        if (typeof a[i].testAnswers !== 'undefined') {
          var b = a[i].testAnswers;
          for (var j = 0; j < b.length; j++) {
            //单选双选题
            if (a[i].testQtype == 1 || a[i].testQtype == 2) {
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
              b[j].holeAnwser2 = formatQuestionText1(b[j].answer);
              //图片解析
              //添加正确答案 属性
              if (b[j].isrightanswer == 1) {
                a[i].rightAnswer2 = b[j].abcd;
              }
            }
            //简答题
            if (a[i].testQtype == 4) {
              a[i].rightAnswer2 = b[j].answer
            }
            //填空题
            if (a[i].testQtype == 3) {
              a[i].rightAnswer2 = b[j].answer
            }
          }
        }
        //绑定abcd
      }
    }
    deelwithAnswer2();
    for (var i = 0; i < datalist.length; i++) {
      var xuanxiang = '';
      for (var j = 0; j < datalist[i].answers.length; j++) {
        if (datalist[i].qtype == 1 || datalist[i].qtype == 2) {
          xuanxiang += '<div style="float: left">' + datalist[i].answers[j].abcd + " " + "." + " " + '</div>' + datalist[i].answers[j].holeAnwser;
        }
      }
      var xuanxiang2 = '';
      if (typeof datalist[i].testText == 'undefined' || datalist[i].testText == null) {
        datalist[i].testText = '';
      }
      if (typeof datalist[i].testExplain == 'undefined' || datalist[i].testExplain == null) {
        datalist[i].testExplain = '';
      }
      if (typeof datalist[i].testAnswers == 'undefined' || datalist[i].testAnswers == null) {
        datalist[i].testAnswers = [];
      } else {
        for (var j = 0; j < datalist[i].testAnswers.length; j++) {
          if (datalist[i].testQtype == 1 || datalist[i].testQtype == 2) {
            xuanxiang2 += '<div style="float: left">' + datalist[i].testAnswers[j].abcd + " " + "." + " " + '</div>' + datalist[i].testAnswers[j].holeAnwser2;
          }
        }
      }
      //新版错题解析；
      $('#ctList2').append(
        '<div class="DXCT_item">' +
        '<div class="DXCTpart1">' +
        '<div style="overflow: hidden">' + '<div style="float: left">' + datalist[i].errorNum + '. ' + '</div>' + datalist[i].text + '</div>' +
        xuanxiang +
        '</div>' +
        '<table class="DXCT_table">' +
        '<tr>' +
        '<td>' + '分析' + '</td>' + '<td>' + formatQuestionText1(datalist[i].analysis) + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '解答' + '</td>' + '<td>' + formatQuestionText1(datalist[i].explain) + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '点评' + '</td>' + '<td>' + formatQuestionText1(datalist[i].comments) + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '知识点讲解' + '</td>' + '<td>' + formatQuestionText1(datalist[i].pointExplain) + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '练一练' + '</td>' + '<td>' + formatQuestionText1(datalist[i].testText) + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '练一练答案' + '</td>' + '<td>' + formatQuestionText1(datalist[i].testExplain) + '</td>' +
        '</tr>' +
        '</table>' +
        '</div>'
      )
    }
  }
  cuotifenxi();
  //2-2强化练习；
  function qianghualianxi() {
    var datalist = PersonReportData.strengthenPractice;
    var src = PersonReportData.strengthenPracticeCodeUrl;
    $('#tpEWM').css('background-image', 'url("' + src + '")');
    // 处理文档结构，替换图片名称，添加abcd选项；
    function deelwithAnswer() {
      var a = datalist;
      for (var i = 0; i < a.length; i++) {
        a[i].text = formatQuestionText(a[i].text);
        var b = a[i].answers;
        //绑定abcd
        for (var j = 0; j < b.length; j++) {
          //单选双选题
          if (a[i].qtype == 1 || a[i].qtype == 2) {
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
            b[j].holeAnwser1 = formatQuestionText1(b[j].answer);
            //图片解析
            b[j].holeAnwser = b[j].holeAnwser1;
            //添加正确答案 属性
            if (b[j].isrightanswer == 1) {
              a[i].rightAnswer = b[j].abcd;
            };
          }
          //简答题
          if (a[i].qtype == 4) {
            a[i].rightAnswer = b[j].answer

          }
          //填空题
          if (a[i].qtype == 3) {
            a[i].rightAnswer = b[j].answer
          }
        }
      }
    }
    deelwithAnswer();
    $('#LXlist').append('<div class="QHLX_1"></div>');
    for (var i = 0; i < datalist.length; i++) {
      var xuanxiang = '';
      for (var j = 0; j < datalist[i].answers.length; j++) {
        if (datalist[i].qtype == 1 || datalist[i].qtype == 2) {
          xuanxiang += '<div style="float: left;padding:0 15px;">' + datalist[i].answers[j].abcd + " " + "." + " " + '</div>' + datalist[i].answers[j].holeAnwser;
        }
      }
      // 循环创建数据；
      $('#LXlist > .QHLX_1').append(
        '<div>' + '<div style="overflow: hidden;">' + '<div style="font-weight:900;">' + '题' + (i + 1) + ':' + '</div>' + '<div style="padding-left:15px;">' + datalist[i].text + '</div>' +
        xuanxiang +
        '</div>')
    }
  }
  qianghualianxi();
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  //处理试题
  function formatQuestionText(txt) {
    txt = txt.toString().trim();
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
    txt = txt.toString().trim();
    txt = "<DIV>" + txt + "</DIV>";
    var txt = txt.replace(/(<P>)/g, "<div>");
    txt = txt.replace(/(<\/P>)/g, "<\/div>");
    //txt=txt.replace(/(解)/g,"");
    //txt=txt.replace(/(：)/g,"");
    txt = txt.replace(/<link rel="stylesheet" type="text\/css" href="http:\/\/img2.51youpu.com\/css\/question.css"\/>/, "");
    // 替换图片地址
    var reg = new RegExp('src="/Public/pic/', "g");
    txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
    return txt;
  }
}
//周周清-判断没有强化练习或者薄弱知识点时，隐藏此项目
function weekClear() {
  if (PersonReportData.strengthenPractice.length < 1 && PersonReportData.classicErrorQuestionExplain.length < 1) {
    var opart4 = document.getElementsByClassName('part_4')[0];
    opart4.style.display = 'none';
  }
}
try {
  weekClear();
} catch (err) {
  //在此处理错误
}

var loadPdf = document.getElementById("loadPdf");

function bindUrlTOa() {
  var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 11 + "&key=id&value=" + reportId + "&filename=" + "RS" + reportId;

  loadPdf.href = pdfUrl;
  loadPdf.target = "_blank"
}
bindUrlTOa();
console.log($('.reportModel').width())
console.log($('#GYtitle').width());

function setCenter(ele, fdom) {
  var widthEle = $(ele).width(),
    widthFstr = $(fdom).width();
  var moveVal = (widthFstr - widthEle);
  var mid = moveVal / 2;
  $(ele).css('left', mid + 'px')

}
setCenter("#GYtitle", '.reportModel')
