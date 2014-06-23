var Period = function(title){
    var _title=title;
    var _fromTime;
    var _toTime;
    var _coordinate;
    var _experience;
    var _geoLoc;
    var _visitedCities=[];
    var _jobTitle;
    this.getTitle=function(){
        return _title;
    };
    this.getId= function(){
        return this.getTitle();
    };
    this.setExperience=function(experience){
        _experience=experience;
    };
    this.setCoordinate=function(lat, long){
        _coordinate={'lat': lat, 'lng':long};
    };
    this.setLoc=function(city, country){
        _geoLoc={'city': city, 'country': country};
    };
    this.getTime=function(){
        return [_fromTime, _toTime];
    };
    this.getDurationLong=function(){
        return _toTime-_fromTime;
    };
    this.getGeoCoordinate=function(){
        return _coordinate;
    };
    this.getExperience=function(){
        return _experience;
    };
    this.getLocation=function(){
        return _geoLoc;
    };
    this.setTime=function(period){
        _fromTime=period[0];
        _toTime=period[1];
    };
    this.addVisitedCity=function(city){
        _visitedCities.push(city);
    };
    this.jobTitle=function(jTitle){
        _jobTitle=jTitle;
    };
    this.getJobTitle=function(){
        return _jobTitle||'noTitle';
    };
};
var kinder=new Period('Kinder');
kinder.setTime([1985, 1992]);
kinder.setExperience('Run,Eat');
kinder.jobTitle("CEO of Kids Corp.");
kinder.setLoc('YenBai','Vietnam');
var primary= new Period('Primary');
primary.setTime([1992, 1997]);
primary.setExperience('Laziness');
primary.jobTitle('President of the imagined country');
primary.setLoc('YenBai','Vietnam');
var secondary=new Period('Secondary');
secondary.setTime([1997, 1999]);
secondary.setExperience('Algebra,Geometry');
secondary.jobTitle('To loooooooooooooooong to write');
secondary.setLoc('YenBai','Vietnam');
var highschool= new Period('Highschool');
highschool.setTime([1999, 2002]);
highschool.setExperience('Algebra,Geomery');
highschool.jobTitle('High school student');
highschool.setLoc('YenBai','Vietnam');
var university= new Period('University');
university.setTime([2002,2007]);
university.setExperience('Programming,C++,Data structure,C#,HTML,English,Windows');
university.jobTitle('Student - System of communication');
university.setLoc('YenBai','Vietnam');
var master1= new Period('Master AI');
master1.setTime([2007,2009]);
master1.setExperience('Image processing,French,Operational reseach,Network,Constrain programming');
master1.jobTitle("AI Master -Institut de la Francophonie pour l'Informatique");
master1.setLoc('YenBai','Vietnam');
var master2= new Period('Master BIT');
master2.setTime([2009,2011]);
master2.setExperience('Problem analysis, Design, Academic research');
master2.jobTitle('Business IT Master Student - University of Twente');
master1.setLoc('Enschede','Netherlands');
var cape= new Period('Cape');
cape.setTime([2011,2013]);
cape.setExperience('Mendix,Java,Javascript,Linux,JGraph,Dojo,D3,Bootstrap,JQuery');
cape.jobTitle('Architect - CapeGroep Enschede');
cape.setLoc('Enschede','Netherlands');

var cvData=[kinder, primary, secondary, highschool, university, master1, master2, cape];