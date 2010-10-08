var sourceXML = 'example.plist.xml'
// var sourceXML = 'portfolio.plist.xml'


if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET", sourceXML, false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;


var result = PlistParser.parse(xmlDoc);

document.getElementById('result').innerHTML = PlistParser.serialize(result);
document.getElementsByTagName('h1')[0].innerHTML += ': <span>' + sourceXML + '</span>';


