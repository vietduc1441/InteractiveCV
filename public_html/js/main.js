function playCv(){
    showPeriod(cvData[0]);
    count=1;
    interval=window.setInterval(play, 3000, cvData);
};
var count=0;
var interval=0;
function play(cvData){
   if (count===cvData.length){
       console.log('stop!');
       window.clearInterval(interval);
       return null;
   }
   //console.log(cvData[count].getId());
    showPeriod(cvData[count]);
   count++;
}

$('.container .hero-unit h2').append("<br><button class='btn btn-primary' title='click me!' id='playCv'>Play</button>");
$('#playCv').tooltip({'placement':'right', 'trigger' : 'hover'});
$('#playCv').click(playCv);

////
var width = 960;
var height = 480;
//Map
var mapWidth = width / 4;
var mapHeight = mapWidth / 2;
var mapScale = mapWidth * 100 / 630;
var mapTranslate = [width - mapWidth / 2, height - mapHeight / 2];

var map = d3.select(".container .hero-unit #myInterativeCV").insert("svg")
        .attr('id', 'cvContent')
        .attr("width", width)
        .attr("height", height);
map.append('rect')
        .attr('class', 'cvBackground')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', height)
        .attr('width', width);
var projection = d3.geo.equirectangular()
        .scale(mapScale)
        .translate(mapTranslate);
var path = d3.geo.path()
        .projection(projection);
var mapGroup = map.append('g')
        .attr('class', 'countrypath')
        .attr('id', 'mapGroup');

//Experience
var exprerienceGroup = map.append('g')
        .attr('class', 'cvExperiences')
        .attr('id', 'experienceGroup')
        .attr('transform', 'translate('+(mapTranslate[0] - mapWidth / 2)+','+'0)')
//Layout experience
exprerienceGroup.append('rect')
        .attr('class', 'experBackground')
        .attr("x", 0)
        .attr('y', 0)
        .attr('width', mapWidth)
        .attr('height', height - mapHeight)
        .attr('rx', 3)
        .attr('ry', 3);
exprerienceGroup.append('text')
        .attr('class', 'defautText')
        .attr('x', 0)
        .attr('y', 18)
        .text('Experience cloud');
 updateExprienceToWordCloud(cvData);
//Time period
var periodBarOffsetX=5,
    periodBarOffsetY=5,
    periodBarHeight=10,
    periodBarWidth=width-mapWidth-periodBarOffsetX-periodBarOffsetY;
    
var periodBar=map.append('g')
        .attr('id','periodBar')
        .attr('class','periodBar');
var periodNameDomain=(function(data){
    var result=[];
    for (var i=0; i<data.length;i++){
        result.push(data[i].getId());
    }
    return result;
}(cvData));
var totalLong=(function(data){
    var result=0;
    for (var i=0; i<data.length;i++){
        result+=data[i].getDurationLong();
    }
    return result;
}(cvData));
var positionBar=periodBarOffsetX;
var periodToColorMapper= d3.scale.category20().domain(periodNameDomain);
periodBar.selectAll("rect")
    .data(cvData, function(d){return d.getId();}).enter()
    .append("rect")
    .attr('x',function(d){
                var currentPos=positionBar;
                positionBar+=d.getDurationLong()/totalLong*periodBarWidth;
                return currentPos;})
    .attr('y',periodBarOffsetY)
    .attr('height',periodBarHeight)
    .attr('width',function(d){return d.getDurationLong()/totalLong*periodBarWidth;})
    .style('fill',function(d){return periodToColorMapper(d.getId());})
    .on('click',showPeriod);
    
//TODO: showPeriod
var experienceBar= map.append('g')
        .attr('id', 'experienceBar')
        .attr('class', 'periodBar');
 function showPeriod(period){
    showExperience(period);
    showLocOnMap(period.getLocation());
    
   
    showTime(period);
};
function showTime(period){
    
};
var experienceBarOffsetX=5,
    experienceBarOffsetY=periodBarOffsetY+periodBarHeight+5;
    experienceBarHeight= height-experienceBarOffsetY-5;
    experienceBarWidth=50;
maincontent=map.append('g')
    .attr('id', 'mainContent');
    
mainContenBackgroud=maincontent.append('rect')
        .attr('class', 'MainContentBg')
        .attr('x', experienceBarOffsetX+experienceBarWidth+5)
        .attr('y', experienceBarOffsetY)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width',width-(experienceBarOffsetX+experienceBarWidth+5)-mapWidth-5)
        .attr('height', experienceBarHeight)
        .style('opacity', 0);
        
function showExperience(d){
    var correpondePerBar=periodBar.selectAll('rect')
            .filter(function(g, i){return g.getId()===d.getId();});
    
    var allrect=experienceBar.selectAll('rect')
            .data([d], function(d){return d.getId();});
    mainContenBackgroud.style('opacity',0);
    maincontent.selectAll('text').remove();
    experienceBar.selectAll('text').remove();
    var startX=correpondePerBar.attr('x');
    var startY=correpondePerBar.attr('y');
    var startW=correpondePerBar.attr('width');
    var startH=correpondePerBar.attr('height');
    allrect.enter().append('rect')
            .attr('x', startX)
            .attr('y', startY*1+10)
            .attr('height', startH)
            .attr('width', startW)
            .style('fill',function(d){return periodToColorMapper(d.getId());})
            .transition()
                .duration(750)
                .attr('x', experienceBarOffsetX)
                .attr('y', experienceBarOffsetY)
                .attr('height',experienceBarHeight )
                .attr('width', experienceBarWidth)
                .each('end', function(d){
                    experienceBar.append('text')
                        .attr('class', 'jobTitle')
                        .attr('x', 5+50-10)
                        .attr('y', height-10)
                        .attr('transform', 'rotate(270 '+ (5+50-10) +" "+(height-10)+')')
                        .text(d.getJobTitle());
                    showMainContent(d);
                }
            );
    allrect.exit().remove();
};

function showMainContent(period){
   mainContenBackgroud.style('opacity',1);
   maincontent.append('text')
        .attr('class', 'lead')
        .attr('x', mainContenBackgroud.attr('x')*1+5)
        .attr('y', mainContenBackgroud.attr('y')*1+18)
        .text(period.getExperience());

}
function showLocOnMap(location){
    
}
function updateExprienceToWordCloud(periods){
  var fill = d3.scale.category20();
  var experiences=[];
  for (var i=0; i<periods.length; i++){
      var exper=periods[i].getExperience().split(',');
      for (var j=0;j<exper.length;j++){
          experiences.push({"text":exper[j],  "size": 10 + Math.random() * 90});
      }
  }
  d3.layout.cloud().size([mapWidth, height - mapHeight])
      .words(experiences)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    exprerienceGroup    
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [mapWidth / 2 +d.x,(height - mapHeight)/2+ d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}
//Append map
d3.json("./js/vendor/world.json", function(countries) {
    mapGroup.append('rect')
            .attr('class', 'mapBackground')
            .attr('x', mapTranslate[0] - mapWidth / 2)
            .attr('y', mapTranslate[1] - mapHeight / 2)
            .attr('width', mapWidth)
            .attr('height', mapHeight);
    mapGroup.selectAll(".countrypath")
            .data(countries.features)
            .enter().append("path")
            .attr("d", path)
            .append("svg:title")
            .text(function(d) {
        return d.properties.name;
    });
});
