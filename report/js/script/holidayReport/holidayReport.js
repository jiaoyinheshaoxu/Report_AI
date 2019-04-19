function formatQuestionText1(txt) {
  txt = txt.toString().trim();
  var txt = txt.replace(/(<p)/gi, "<div");
  txt = txt.replace(/(<\/p>)/gi, "<\/div>");
  //txt=txt.replace(/(解)/g,"");
  //txt=txt.replace(/(：)/g,"");
  txt = txt.replace(/<link rel="stylesheet" type="text\/css" href="http:\/\/img2.51youpu.com\/css\/question.css"\/>/, "");

  // 替换图片地址
  var reg = new RegExp('src="/Public/pic/', "g");

  txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

  return txt;
}

function Rounding(num, key) {
  var power10 = Math.pow(10, key);
  var num = parseFloat(num);
  var fvalue = Math.round(num * power10) / power10;
  return fvalue;
};

function RoundingRate(num, key) {
  var power10 = Math.pow(10, key);
  var num = parseFloat(num);
  var fvalue = Math.round(num * power10);
  return fvalue;
};
(function facePage() {
  $('.teachWeek').html(PersonReportData.cover.yearSemester);
  $('.FMBT1>header').html(PersonReportData.cover.studentName + '<br>' + PersonReportData.cover.subjectSemester + '<br>' + '学期报告');
  $('.FMXX_sch').html(PersonReportData.cover.schoolName);
  $('.FMXX_class').html(PersonReportData.cover.gradeClass);
  $('.FMXX_makeTime').html(PersonReportData.cover.generateTime);
  $('.FMXX_materialName').html(PersonReportData.cover.materialName);
  //尾页
  $('.connectPhone').html('联系电话：' + PersonReportData.cover.schoolPhoneNum)
})();
//1.个人知识图谱 综述；
(function personKnowledgeMap() {
  function tupu1() {
    var zhang = PersonReportData.personKnowledgeGraph.pointStatus.chapterNum;
    var jie = PersonReportData.personKnowledgeGraph.pointStatus.sectionNum;
    var zhishidian = PersonReportData.personKnowledgeGraph.pointStatus.pointNum;
    var poorNum = PersonReportData.personKnowledgeGraph.pointStatus.poorNum;
    var goodNum = PersonReportData.personKnowledgeGraph.pointStatus.goodNum;
    var greatNum = PersonReportData.personKnowledgeGraph.pointStatus.greatNum;
    var Aa = '本学期涉及 ' + zhang + ' 章 ' + jie + ' 节 ,' + '共 ' + zhishidian + ' 个知识点,你的知识点的掌握状态如下：'
    $('.part1_0').find('p:first').html(Aa);
    $('.part1_0').find('p:first').css('textIndent', '2rem');

    var star3 = greatNum,
      star3Rate = ((star3 / zhishidian) * 100).toFixed(0) + '%';
    var star2 = greatNum + goodNum,
      star2Rate = ((star2 / zhishidian) * 100).toFixed(0) + '%';
    var star1 = poorNum,
      star1Rate = ((star1 / zhishidian) * 100).toFixed(0) + '%';
    var Ab1 = '<li style="text-indent:2rem"><span style="font-family:Wingdings">l<span style="font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span> 优秀知识点（三星）: ' + star3 + '个' + ' ,占 ' + star3Rate + ';</li>';
    var Ab2 = '<li style="text-indent:2rem"><span style="font-family:Wingdings">l<span style="font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span> 优良知识点（三星+二星）: ' + star2 + '个' + ' ,占 ' + star2Rate + ';</li>';
    var Ab3 = '<li style="text-indent:2rem"><span style="font-family:Wingdings">l<span style="font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span> 薄弱知识点（一星及以下）: ' + star1 + '个' + ' ,占 ' + star1Rate + ';</li>';
    var totalLi = Ab1 + Ab2 + Ab3;
    $('.part1_0').find('ul:first').append(totalLi);
  }
  tupu1()
  //1.个人知识图谱 模块；
  function part1() {
    //详解
    var pointGraspText = PersonReportData.personKnowledgeGraph.pointGraspText;
    var goodChapterName = pointGraspText.goodChapterName ,
      promoteChapterName = pointGraspText.promoteChapterName,
      goodSectionNameList = pointGraspText.goodSectionNameList,
      promoteSectionNameList = pointGraspText.promoteSectionNameList;
    var chapterMasterP1='',chapterMasterP2='',sectionMasterP1='',sectionMasterP2='';
    goodChapterName ? chapterMasterP1='从"章"这个层级看,你掌握得较好的知识模块是 \“' + '<span style="color:#5cb9f4;">' + goodChapterName + '</span> \” 等':'';
    goodSectionNameList.length>0?chapterMasterP2='提升空间较大的知识模块是 \“' + '<span style="color:#5cb9f4;">' + goodSectionNameList.toString() + '</span>\” 等':'';
    promoteChapterName ? sectionMasterP1='从"节"这个层级看,你掌握得较好的知识模块是 \“' + '<span style="color:#5cb9f4;">' + promoteChapterName + '</span> \” 等':'';
    promoteSectionNameList.length>0?sectionMasterP2='提升空间较大的知识模块是 \“' + '<span style="color:#5cb9f4;">' + promoteSectionNameList.toString() + '</span>\” 等':'';

    var chapterMasterP =chapterMasterP1+chapterMasterP2;
    var sectionMasterP =sectionMasterP1+sectionMasterP2;

    $('.knowledageMaster').append('<p style="text-indent:2rem">' + chapterMasterP + '</p>');
    $('.knowledageMaster').append('<p style="text-indent:2rem">' + sectionMasterP + '</p>');
    $('.knowledageMaster').append('<p style="text-indent:2rem">' + '详细数据请见下表：' + '</p>');
    //表格
    var unitList = PersonReportData.personKnowledgeGraph.pointGraspList;
    var thead = '<tr>' + '<th>知识模块名称</th>' + '<th>中考考频值</th>' + '<th>累计答题</th>' + '<th>你的得分率</th>' + '<th>班级平均得分率</th>' + '<th>年级平均得分率</th>' + '</tr>';
    $('.knowledageMasterTable').append(thead);
    //数组插入文本内容：
    unitList.forEach(function(item, index) {
      var zhang = '';
      zhang = '<tr>' + '<td><b>' + item.chapterName + '</b></td>' + '<td>' + Rounding(item.frequency, 2) + '</td>' + '<td>' + item.answerNum + '</td>' + '<td>' + RoundingRate(item.scoreRate, 2) + '%</td>' + '<td>' + RoundingRate(item.classScoreRate, 2) + '%</td>' + '<td>' + RoundingRate(item.gradeScoreRate, 2) + '%</td>' + '</tr>'
      $('.knowledageMasterTable').append(zhang);
      item.sectionList.forEach(function(item2, index2) {
        var jie = '';
        jie = '<tr>' + '<td style="padding-Left:40px;"><b>' + item2.sectionName + '</b></td>' + '<td>' + Rounding(item2.frequency, 2) + '</td>' + '<td>' + item2.answerNum + '</td>' + '<td>' + RoundingRate(item2.scoreRate, 2) + '%</td>' + '<td>' + RoundingRate(item2.classScoreRate, 2) + '%</td>' + '<td>' + RoundingRate(item2.gradeScoreRate, 2) + '%</td>' + '</tr>'
        $('.knowledageMasterTable').append(jie);
      })
    })
  }
  part1()
  //1.2 学科能力和思想方法图谱;
  function part2() {
    $('.subjectAbilityAndMind').find('p:first').html('通过本学期的学习，你在本学科的学科能力和思想方法上掌握情况如下图');
    var abilityAndThoughtway = PersonReportData.abilityAndThoughtway,
      tableList = abilityAndThoughtway.tableList,
      categories = [],
      dataPerson = [],
      dataPersonGrade = [];
    tableList.forEach(function(item, index) {
      if (item.answerNum > 0) {
        categories.push(item.name);
        dataPerson.push(Number(item.scoreRate.toFixed(1)));
        dataPersonGrade.push(Number(item.gradeScoreRate.toFixed(1)));
      }
    })
    // categories=["数据处理能力", "运算求解能力", "推理论证能力", "抽象概括能力", "空间想像能力", "应用意识", "创新意识"];
    series = [{
      data: dataPersonGrade,
      name: '平均能力',
      pointPlacement: 'on'
    }, {
      data: dataPerson,
      name: '个人能力',
      pointPlacement: 'on'
    }];
    //能力思想图谱
    $('#abilityMindMap').highcharts({
      chart: {
        polar: true,
        type: 'line',
        style: {
          fontSize: "1.8rem",
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
    var textObject = abilityAndThoughtway.textObject;
    var masterAbility = textObject.goodNameList;
    var improveAbility = textObject.promoteNameList;
    var masterAbility2 = [],
      improveAbility2 = [];
    masterAbility.forEach(function(item) {
      masterAbility2.push('“' + item + '”')
    })
    improveAbility.forEach(function(item) {
      improveAbility2.push('“' + item + '”')
    })
    var preTable = '其中，掌握较好的学科能力和思想方法有:' + masterAbility2.toString() + '等；提升空间较大的学科能力和思想方法有：' + improveAbility2.toString() + '等；'
    $('.subjectAbilityAndMind').find('p:eq(1)').html(preTable)
    $('.subjectAbilityAndMind').find('p:eq(2)').html('<p>具体数据请见下表：</p>')
    var thead = '<tr><th>学科能力名称</th><th>累计答题</th><th>你的得分率</th><th>班级平均得分率</th><th>年级平均得分率</th></tr>'
    $('.abilityMindTable').append(thead);
    tableList.forEach(function(item, index) {
      var tr = '<tr>' + '<td>' + item.name + '</td>' + '<td>' + item.answerNum + '</td>' + '<td>' + (item.scoreRate * 100).toFixed(0) + '%' + '</td>' + '<td>' + (item.classScoreRate * 100).toFixed(0) + '%' + '</td>' + '<td>' + (item.gradeScoreRate * 100).toFixed(0) + '%' + '</td></tr>';
      $('.abilityMindTable').append(tr);
    });
  }
  part2();
  //1.3 历史得分情况
  function part3() {
    var historySocreList = PersonReportData.historySocreList;
    var preChart = '我们收集到你本学期的考试共' + historySocreList.length + '次，考试成绩的变化曲线如下图：'
    $('.part1_3').find('p:first').html(preChart);
    var categories = [];
    var seriesPerson = [];
    var seriesClass = [];
    var seriesGrade = [];
    historySocreList.forEach(function(item) {
      categories.push(item.name);
      seriesPerson.push(item.score);
      seriesClass.push(Number((item.classAvgScore).toFixed(2)));
      seriesGrade.push(Number((item.gradeAvgScore).toFixed(2)));
    })
    series = [{
      data: seriesPerson,
      name: '个人得分'
    }, {
      data: seriesGrade,
      name: '年级平均分'
    }, {
      data: seriesClass,
      name: '班级平均分'
    }];
    $('#historyScore').highcharts({
      chart: {
        style: {
          marginRight: 'auto',
          marginLeft: 'auto'
        }
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
        text: ' ',
        x: -20 //center
      },
      labels: {
        style: {
          color: "black",

          fontSize: "1.8rem"
        }
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {

            fontSize: "1.8rem"
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
        labels: {
          style: {
            color: "black",

            fontSize: "1.8rem"
          }
        }
      },
      tooltip: {
        valueSuffix: '',
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
      series: series,
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }

    });
  }
  part3();
})();
//2.知识梳理与查漏补缺
(function knowledgeCarding() {
  var pointCardingList = PersonReportData.pointCardingList;
  //创建文档碎片
  var Fragment = document.createDocumentFragment();
  pointCardingList.forEach(function(item, index) {
    //外层div
    var divOuter = document.createElement('div');
    var h3PrePart = document.createElement('h3');
    //创建模块div
    var divPart1 = document.createElement('div');
    var divPart2 = document.createElement('div');
    var divPart3 = document.createElement('div');
    var divPart4 = document.createElement('div');
    h3PrePart.innerHTML = '<b><span>2.' + (index + 1) + '</span>' + '<span>' + item.chapterName + '</span></b>';
    h3PrePart.className = 'level2';
    //第一部分 考频解析
    var oh4Part1 = document.createElement('h4');
    var opPart1 = document.createElement('p');
    oh4Part1.innerHTML = '<b><span>2.' + (index + 1) + '.1</span>' + '<span>考频解析</span>' + '</b>';
    oh4Part1.className = 'level3'
    opPart1.innerHTML = '<p style="text-indent: 28px">' + item.frequencyAnalysis + '</p>';
    var otablePart1 = document.createElement('table');
    otablePart1.className = 'pointAnalysicTable';
    var optablePart1 = document.createElement('p');
    var oTbodyPart1 = document.createElement('tbody');
    optablePart1.innerHTML = '<p class="text-center" style="font-size:1.6rem;font-weight:bold;"><b>全国历年中考考频数据</b></p>';
    var opart1Trfirst = document.createElement('tr');
    opart1Trfirst.innerHTML = '<th style="width:140px;">年份</th><th style="width:180px;">考频</th><th>高频考点</th>';
    oTbodyPart1.appendChild(opart1Trfirst);
    var highPointStr = '';
    highPointStr = item.highPointNameList.join(",");
    item.yearFrequencyList.forEach(function(item1, index1) {
      var otr = document.createElement('tr');

      if (index1 > 0) {
        otr.innerHTML = '<td>' + item1.year + '</td>' + '<td>' + Rounding(item1.frequency, 2) + '</td>';
      } else {
        otr.innerHTML = '<td>' + item1.year + '</td>' + '<td>' + Rounding(item1.frequency, 2) + '</td>' + '<td  rowspan="' + item.yearFrequencyList.length + '">' + highPointStr + '</td>'
      }
      oTbodyPart1.appendChild(otr);
    })
    otablePart1.appendChild(oTbodyPart1);
    divPart1.appendChild(oh4Part1);
    divPart1.appendChild(optablePart1);
    divPart1.appendChild(otablePart1);
    //第二部分 知识点掌握情况
    var oh4Part2 = document.createElement('h4');
    oh4Part2.innerHTML = '<b><span>2.' + (index + 1) + '.2</span>' + '<span>知识点掌握情况</span>' + '</b>';
    oh4Part2.className = 'level3'
    var otablePart2 = document.createElement('table');
    otablePart2.className = 'commonTable';
    var oTbodyPart2 = document.createElement('tbody');
    var opart1Trfirst = document.createElement('tr');
    opart1Trfirst.innerHTML = '<th>知识点名称</th><th>中考考频值</th><th>累计答题</th><th>你的得分率</th><th>班级平均得分率</th><th>年级平均得分率</th>';
    oTbodyPart2.appendChild(opart1Trfirst);
    if (item.pointGraspList.length > 0) {
      item.pointGraspList.forEach(function(item2, index2) {
        var otr = document.createElement('tr');
        otr.innerHTML = '<td>' + item2.pointName + '</td>' + '<td>' + Rounding(item2.frequency, 2) + '</td>' + '<td>' + item2.answerNum + '</td>' + '<td>' + (item2.scoreRate * 10000 / 100).toFixed(0) + '%</td>' + '<td>' + (item2.classScoreRate * 10000 / 100).toFixed(0) + '%</td>' + '<td>' + (item2.gradeScoreRate * 10000 / 100).toFixed(0) + '%</td>'
        oTbodyPart2.appendChild(otr);
      })
    }
    otablePart2.appendChild(oTbodyPart2);
    divPart2.appendChild(oh4Part2);
    divPart2.appendChild(otablePart2);
    //第三部分 错题整理
    var oh4Part3 = document.createElement('h4'),
      opPart3 = document.createElement('p');
    oh4Part3.innerHTML = '<b><span>2.' + (index + 1) + '.3</span>' + '<span>错题整理</span>' + '</b>';
    opPart3.innerHTML = '这部分收集了你在本学期内测试中涉及本章内容的全部错题，请认真作答。';
    oh4Part3.className = 'level3'
    divPart3.appendChild(oh4Part3);
    divPart3.appendChild(opPart3);
    if (item.errorList.length > 0) {
      item.errorList.forEach(function(item3, index3) {
        var odivPart3_questions = document.createElement('div');
        var odivPart3_text = document.createElement('div');
        var odivPart3_answer = document.createElement('div');
        odivPart3_text.innerHTML = '<div style="float: left;margin-right:15px;">' + (index3 + 1) + " " + "." + " " + '</div>' + formatQuestionText1(item3.text);
        odivPart3_text.className = 'qustionList_Test'
        if (item3.type == 1 || item3.type == 2) {
          if (item3.selectList.length > 0) {
            item3.selectList.forEach(function(item3_1, index3_1) {
              var odivPart3_answer_select = document.createElement('div');
              odivPart3_answer_select.innerHTML = '<div style="float: left;padding-left:15px;">' + String.fromCharCode(65 + index3_1) + " " + "." + " " + '</div>' + formatQuestionText1(item3_1.answer);
              odivPart3_answer_select.style.overflow = 'hidden';
              odivPart3_answer.appendChild(odivPart3_answer_select);
            })
          }
        } else {
          //没有解答
          // odivPart3_answer.appendChild(odivPart3_answer_select);
        }
        odivPart3_answer.className += 'question_Option';
        odivPart3_questions.appendChild(odivPart3_text);
        odivPart3_questions.appendChild(odivPart3_answer);
        odivPart3_questions.className = 'questionList'
        divPart3.appendChild(odivPart3_questions);
      })
    } else {
      var oNoErr = document.createElement('p');
      oNoErr.innerHTML = '该章节无错题。'
      divPart3.appendChild(oNoErr)
    }
    //第四部分 查漏补缺强化练习
    var oh4Part4 = document.createElement('h4'),
      opPart4 = document.createElement('p');
    oh4Part4.innerHTML = '<b><span>2.' + (index + 1) + '.4</span>' + '<span>查漏补缺强化练习</span>' + '</b>';
    oh4Part4.className = 'level3'
    opPart4.innerHTML = '这部分收集了你在本学期内测试中涉及本章内容的全部错题，请认真作答。';
    divPart4.appendChild(oh4Part4);
    divPart4.appendChild(opPart4);
    if (item.strongList.length > 0 ) {
      item.strongList.forEach(function(item4, index4) {
        var odivPart4_questions = document.createElement('div');
        var odivPart4_text = document.createElement('div');
        var odivPart4_answer = document.createElement('div');
        odivPart4_text.innerHTML = '<div style="float: left;margin-right:15px;">' + (index4 + 1) + " " + "." + " " + '</div>' + formatQuestionText1(item4.text);
        odivPart4_text.className = 'qustionList_Test'
        if (item4.type == 1 || item4.type == 2) {
          if (item4.selectList.length > 0) {
            item4.selectList.forEach(function(item4_1, index4_1) {
              var odivPart4_answer_select = document.createElement('div');
              odivPart4_answer_select.innerHTML = '<div style="float: left;padding-left:15px;">' + String.fromCharCode(65 + index4_1) + " " + "." + " " + '</div>' + formatQuestionText1(item4_1.answer);
              odivPart4_answer_select.style.overflow = 'hidden';
              odivPart4_answer.appendChild(odivPart4_answer_select);
            })
          }
        } else {
          //没有解答
          // odivPart3_answer.appendChild(odivPart3_answer_select);
        }
        odivPart4_answer.className += 'question_Option';
        odivPart4_questions.appendChild(odivPart4_text);
        odivPart4_questions.appendChild(odivPart4_answer);
        odivPart4_questions.className = 'questionList'
        divPart4.appendChild(odivPart4_questions);
      })
    } else {
      var oNoErr = document.createElement('p');
      oNoErr.innerHTML = '该章节暂无相应强化练习。'
      divPart4.appendChild(oNoErr)
    }
    divOuter.appendChild(h3PrePart);
    divOuter.appendChild(divPart1);
    divOuter.appendChild(divPart2);
    divOuter.appendChild(divPart3);
    divOuter.appendChild(divPart4);
    divOuter.className = 'pointcardingOuter'
    Fragment.appendChild(divOuter);
  })
  $('.part_body_2').append(Fragment);
})();
//3.全面培优
(function ComprehensivCultivation() {
  //中考考频图谱
  var overallExcellent = PersonReportData.overallExcellent;
  //能力与方法项的中考考频图谱
  function part1() {
    var series = [],
      categories = [];
    var data = []
    var abilityFrequencyList = overallExcellent.abilityFrequencyList,
      thoughtwayFrequencyList = overallExcellent.thoughtwayFrequencyList;
    abilityFrequencyList.forEach(function(item, index) {
      if (item.frequency) {
        categories.push(item.name);
        data.push(item.frequency);
      }
    })
    thoughtwayFrequencyList.forEach(function(item, index) {
      if (item.frequency) {
        categories.push(item.name);
        data.push(item.frequency);
      }
    })
    series.push({
      name: '考频',
      data: data
    })
    $('#QuizFrequencyMap').highcharts({
      chart: {
        type: 'bar'
      },
      title: {
        text: '能力与方法项的中考考频图谱'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: categories,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '考频值',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' '
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }
      },
      legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#4E75C4',
        shadow: true
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: series
    });
  }
  part1();
  //3.2	全面培优强化练习
  function part2() {
    var strongList = overallExcellent.strongList;
    var Fragment = document.createDocumentFragment();
    var divOuter = document.createElement('div');
    divOuter.className = ''
    var starrySkyUrl = overallExcellent.graphUrl;
    console.log(`星图路径：${starrySkyUrl}`)
    $('#starrySky').attr('src', starrySkyUrl);
    if (strongList.length > 0) {
      strongList.forEach(function(item3, index3_1) {
        var o_questions = document.createElement('div');
        var o_text = document.createElement('div');
        var o_answer = document.createElement('div');
        var odivPart3_text = document.createElement('div');
        odivPart3_text.innerHTML = '<div style="float: left;margin-right:15px;">' + (index3_1 + 1) + " " + "." + " " + '</div>' + formatQuestionText1(item3.text);
        odivPart3_text.className = 'qustionList_Test'
        if (item3.type == 1 || item3.type == 2) {
          if (item3.selectList.length > 0) {
            item3.selectList.forEach(function(item3_1, index3_1) {
              var o_answer_select = document.createElement('div');
              o_answer_select.innerHTML = '<div style="float: left;padding-left:15px;">' + String.fromCharCode(65 + index3_1) + " " + "." + " " + '</div>' + formatQuestionText1(item3_1.answer);
              // o_select.style.overflow='hidden';
              o_answer.appendChild(o_answer_select);
            })
          }
        } else {
          //没有解答
          // odivPart3_answer.appendChild(odivPart3_answer_select);
        }
        o_answer.className += 'question_Option';
        o_questions.appendChild(odivPart3_text);
        o_questions.appendChild(o_answer);
        o_questions.className = 'questionList'
        Fragment.appendChild(o_questions);
      })
      divOuter.appendChild(Fragment);
    } else {
      divOuter.innerHTML = '你本次考试没有强化练习';
    }
    $('.part3_3').append(divOuter);
  }
  part2();
})();
//4.封面3
(function face3() {

})();
//5.附录:薄弱知识点讲解
(function appendix1() {
  var pointExplainList = PersonReportData.personKnowledgeGraph.pointExplainList;
  var Fragment = document.createDocumentFragment();
  pointExplainList.forEach(function(item, index) {
    var odiv = document.createElement('div');
    var oh3 = document.createElement('h3');
    odiv.className = 'knowledgeList'
    var odiv_son = document.createElement('div');
    oh3.innerHTML = '<b>' + item.pointName + '</b>';
    odiv_son.innerHTML = formatQuestionText1(item.explain);
    odiv.appendChild(oh3);
    odiv.appendChild(odiv_son);
    Fragment.appendChild(odiv);
  })
  $('.appendixBox')[0].appendChild(Fragment);
})();
//6.附录:错题解析
(function appendix2() {
  var pointCardingList = PersonReportData.pointCardingList;
  var Fragment = document.createDocumentFragment();
  pointCardingList.forEach(function(item, index) {
    //外层div
    var divOuter = document.createElement('div');
    var h3PrePart = document.createElement('h3');
    var divPart3 = document.createElement('div');
    var divPart4 = document.createElement('div');
    h3PrePart.innerHTML = '<b>2.' + (index + 1) + item.chapterName + '</b>';
    //第三部分 错题整理
    if (item.errorList.length > 0) {
      item.errorList.forEach(function(item3, index3) {
        var odivPart3_questions = document.createElement('div');
        var odivPart3_explain = document.createElement('div');
        var odivPart3_analysis = document.createElement('div');
        var odivPart3_comment = document.createElement('div');
        var odivPart3_num = document.createElement('div');
        odivPart3_num.innerHTML = '<div ><b>题' + (index3 + 1) + " " + '</div></b>';
        // 分析
        if (item3.analysis) {
          odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + formatQuestionText1(item3.analysis);
        } else {
          odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + '<div>暂无</div>';
        }
        // 解答
        if (item3.explain) {
          odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + formatQuestionText1(item3.explain);
        } else {
          odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + '<div>暂无</div>';
        }
        // 点评
        if (item3.comment) {
          odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + formatQuestionText1(item3.comment);
        } else {
          odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + '<div>暂无</div>';
        }
        odivPart3_analysis.className = 'paoxi_analysis paoxi';
        odivPart3_explain.className = 'paoxi_explain paoxi';
        odivPart3_comment.className = 'paoxi_comment paoxi';
        odivPart3_questions.appendChild(odivPart3_num);
        odivPart3_questions.appendChild(odivPart3_analysis);
        odivPart3_questions.appendChild(odivPart3_explain);
        odivPart3_questions.appendChild(odivPart3_comment);
        odivPart3_questions.className = 'questionList'
        divPart3.appendChild(odivPart3_questions);
      })
    } else {
      var oNoErr = document.createElement('p');
      oNoErr.innerHTML = '该章节无错题。'
      divPart3.appendChild(oNoErr)
    }
    divOuter.appendChild(h3PrePart);
    divOuter.appendChild(divPart3);
    divOuter.appendChild(divPart4);
    divOuter.className = 'pointcardingOuter'
    Fragment.appendChild(divOuter);
  })
  // $('.part_body_2').append(Fragment);
  $('.appendixBox')[1].appendChild(Fragment);
})();
//7.附录:强化练习解析
(function appendix3() {
  //查漏补缺强化练习

  var pointCardingList = PersonReportData.pointCardingList;
  var Fragment = document.createDocumentFragment();
  pointCardingList.forEach(function(item, index) {
    //外层div
    var divOuter = document.createElement('div');
    var h3PrePart = document.createElement('h3');
    var divPart3 = document.createElement('div');
    h3PrePart.innerHTML = '<b>2.' + (index + 1) + item.chapterName + '</b>';
    //第三部分 强化练习
    if (item.strongList.length > 0) {
      item.strongList.forEach(function(item3, index3) {
        var odivPart3_questions = document.createElement('div');
        var odivPart3_explain = document.createElement('div');
        var odivPart3_analysis = document.createElement('div');
        var odivPart3_comment = document.createElement('div');
        var odivPart3_num = document.createElement('div');
        odivPart3_num.innerHTML = '<div ><b>题' + (index3 + 1) + " " + " " + '</div></b>';
        // 分析
        if (item3.analysis) {
          odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + formatQuestionText1(item3.analysis);
        } else {
          odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + '<div>暂无</div>';
        }
        // 解答
        if (item3.explain) {
          odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + formatQuestionText1(item3.explain);
        } else {
          odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + '<div>暂无</div>';
        }
        // 点评
        if (item3.comment) {
          odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + formatQuestionText1(item3.comment);
        } else {
          odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + '<div>暂无</div>';
        }
        odivPart3_analysis.className = 'paoxi_analysis paoxi';
        odivPart3_explain.className = 'paoxi_explain paoxi';
        odivPart3_comment.className = 'paoxi_comment paoxi';
        odivPart3_questions.appendChild(odivPart3_num);
        odivPart3_questions.appendChild(odivPart3_analysis);
        odivPart3_questions.appendChild(odivPart3_explain);
        odivPart3_questions.appendChild(odivPart3_comment);
        odivPart3_questions.className = 'questionList'
        divPart3.appendChild(odivPart3_questions);
      })
    } else {
      var oNoErr = document.createElement('p');
      oNoErr.innerHTML = '该章节暂无相应强化练习。'
      divPart3.appendChild(oNoErr)
    }
    divOuter.appendChild(h3PrePart);
    divOuter.appendChild(divPart3);
    divOuter.className = 'pointcardingOuter'
    Fragment.appendChild(divOuter);
  })
  // $('.part_body_2').append(Fragment);
  var oh31 = document.createElement('h3');
  oh31.innerHTML = '<b>查漏补缺强化练习</b>';
  $('.appendixBox')[2].appendChild(oh31);
  $('.appendixBox')[2].appendChild(Fragment);

  //全面培优强化练习
  var overStrongList = PersonReportData.overallExcellent.strongList;
  var Fragment2 = document.createDocumentFragment();
  var oh32 = document.createElement('h3');
  var divPart4 = document.createElement('div');
  oh32.innerHTML = '<b>全面培优强化练习</b>';
  if (overStrongList.length > 0) {
    overStrongList.forEach(function(item3, index3) {
      var odivPart3_questions = document.createElement('div');
      var odivPart3_explain = document.createElement('div');
      var odivPart3_analysis = document.createElement('div');
      var odivPart3_comment = document.createElement('div');
      var odivPart3_num = document.createElement('div');
      odivPart3_num.innerHTML = '<div ><b>题' + (index3 + 1) + " " + " " + '</div></b>';
      // 分析
      if (item3.analysis) {
        odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + formatQuestionText1(item3.analysis);
      } else {
        odivPart3_analysis.innerHTML = '<div><b>分析：</b></div>' + '<div>暂无</div>';
      }
      // 解答
      if (item3.explain) {
        odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + formatQuestionText1(item3.explain);
      } else {
        odivPart3_explain.innerHTML = '<div><b>解答：</b></div>' + '<div>暂无</div>';
      }
      // 点评
      if (item3.comment) {
        odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + formatQuestionText1(item3.comment);
      } else {
        odivPart3_comment.innerHTML = '<div><b>点评：</b></div>' + '<div>暂无</div>';
      }
      odivPart3_analysis.className = 'paoxi_analysis paoxi';
      odivPart3_explain.className = 'paoxi_explain paoxi';
      odivPart3_comment.className = 'paoxi_comment paoxi';
      odivPart3_questions.appendChild(odivPart3_num);
      odivPart3_questions.appendChild(odivPart3_analysis);
      odivPart3_questions.appendChild(odivPart3_explain);
      odivPart3_questions.appendChild(odivPart3_comment);
      odivPart3_questions.className = 'questionList'
      divPart4.appendChild(odivPart3_questions);
    })
  } else {
    var oNoErr = document.createElement('p');
    oNoErr.innerHTML = '该章节暂无相应强化练习。'
    divPart4.appendChild(oNoErr)
  }
  Fragment2.appendChild(divPart4);
  $('.appendixBox')[2].appendChild(oh32);
  $('.appendixBox')[2].appendChild(Fragment2);
})();
// 根据 appendix 这个值判断 附录显示内容
(function appendixJuge(){
  var appendixStr = PersonReportData.cover.appendix;
  appendixAry=appendixStr.split(',');
      $('.part_appendix_1').hide();
      $('.part_appendix_2').hide();
      $('.part_appendix_3').hide();
  if(appendixAry.length>0){
    appendixAry.forEach(function(item,index){
      if(item==1){
        $('.part_appendix_1').show();
      }else if(item==2){
        $('.part_appendix_2').show();
      }else if(item==3){
        $('.part_appendix_3').show();
      }
    })
  }
})();
//页眉处理 目录处理
(function otherOpiton() {
  var infomation = PersonReportData.cover;
  var yemei = infomation.studentName + '同学学情周报--' + infomation.subjectSemester
  $('.yemei').html(yemei);

  // 生成目录
  var oh1 = document.createElement('h1');
  oh1.innerHTML = '目录';
  oh1.className += 'text-center';
  var aryLev1 = [],
    aryLev2 = [],
    aryLev3 = [];
  //章节
  for (var i = 0; i < $('.level1 span').length; i++) {
    if (i % 2) {
      aryLev1.forEach(function(item, index) {
        if (item.key == i) {
          item.name += '<span style="width:28px;display:inline-block"></span>' + $('.level1 span:nth(' + i + ')').text();
        }
      })
    } else {
      aryLev1.push({
        name: $('.level1 span:nth(' + i + ')').text(),
        key: i + 1,
        id: $('.level1 span:nth(' + i + ')').text()
      })
    }
  }
  for (var i = 0; i < $('.level2 span').length; i++) {
    if (i % 2) {
      aryLev2.forEach(function(item, index) {
        if (item.key == i) {
          item.name += '<span style="width:28px;display:inline-block"></span>' + $('.level2 span:nth(' + i + ')').text();
        }
      })
    } else {
      aryLev2.push({
        name: "" + $('.level2 span:nth(' + i + ')').text(),
        key: i + 1,
        id: $('.level2 span:nth(' + i + ')').text()
      })
    }
  }
  for (var i = 0; i < $('.level3 span').length; i++) {
    if (i % 2) {
      aryLev3.forEach(function(item, index) {
        if (item.key == i) {
          item.name += '<span style="width:28px;display:inline-block"></span>' + $('.level3 span:nth(' + i + ')').text();
        }
      })
    } else {
      aryLev3.push({
        name: "" + $('.level3 span:nth(' + i + ')').text(),
        key: i + 1,
        id: $('.level3 span:nth(' + i + ')').text()
      })
    }
  }

  var muluAry = [];
  aryLev1.forEach(function(item, index) {
    var obj = {};
    obj.name = item.name;
    obj.sonlist = [];
    aryLev2.forEach(function(item2, index2) {
      if (item2.id.substring(0, 2) == item.id) {
        obj.sonlist.push({
          name: item2.name,
          sonlist2: []
        });
      }
    })
    muluAry.push(obj)
  })
  console.log(muluAry)
  console.log(aryLev3)
  $('.part_body_0').append(oh1);
  muluAry.forEach(function(item, index) {
    $('.part_body_0').append('<p style="text-indent: 28px">' + item.name + '</p>');
    item.sonlist.forEach(function(item2, index2) {
      $('.part_body_0').append('<p style="text-indent: 56px">' + item2.name + '</p>');
      aryLev3.forEach(function(item3, index3) {
        if (item2.name.substring(0, 3) == item3.id.substring(0, 3)) {
          $('.part_body_0').append('<p style="text-indent: 84px">' + item3.name + '</p>');
          item2.sonlist2.push({
            name: item3.name
          });
        }
      })
    })
  })

  console.log($('.part_body_0')[0].getBoundingClientRect());


})()
//页面加载
$('#jiazai').css({
  'display': 'none'
});
$('#delay').css({
  'display': 'block'
});

var loadPdf = document.getElementById("loadPdf");

function bindUrlTOa() {
  var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 18 + "&key=id&value=" + reportId + "&filename=" + "RS" + reportId;

  loadPdf.href = pdfUrl;
  loadPdf.target = "_blank"
}
bindUrlTOa()
// console.log($('#jiazai'))
