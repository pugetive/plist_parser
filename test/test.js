var sourceXML = 'portfolio.plist.xml'

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
alert(result);
// $.ajax({  
//    type: 'GET',  
//    url: 'portfolio.plist.xml',  
//    // url: 'todd.xml',
//    dataType: 'xml',  
//    success: function(xml_list) {
//      // console.log(xml_list)
//      var result = PlistParser.parse(xml_list);
//      alert(result.toSource())
//    }
// });  

// 
// $.get('portfolio.plist.xml', function(data) {
// 
//   processPlist(data)
//   // $('.result').html(data);
//   // alert('Load was performed.');
// });
