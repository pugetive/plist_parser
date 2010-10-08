/**
 PlistParser: a JavaScript utility to process Plist XML into JSON
 @author Todd Gehman (toddgehman@gmail.com)

 Usage:
   var jsonString = PlistParser.parse(xmlString);

*/

var PlistParser = {};

PlistParser.parse = function(plist_xml){
  // Special case XML munging if we're running in Appcelerator Titanium
  try{
    if (typeof Titanium.XML != 'undefined'){
      plist_xml = Titanium.XML.parseString(plist_xml);
    }
  } catch(e){
    // Okay if Titanium classes don't exist, then we're in a browser.
  }
    
  var result = this._xml_to_json(plist_xml.getElementsByTagName('plist').item(0));
  return result;
};

PlistParser._xml_to_json = function(xml_node) {
  var parser = this;
  var parent_node = xml_node;
  var parent_node_name = parent_node.nodeName;

  // console.log("Working on parent node: ");
  // console.log(parent_node);

  var child_nodes = [];
  for(var i = 0; i < parent_node.childNodes.length; ++i){
    var child = parent_node.childNodes.item(i);
    if (child.nodeName != '#text'){
      child_nodes.push(child);
    };
  };
  
  switch(parent_node_name){

    case 'plist':
      if (child_nodes.length > 1){
        // I'm not actually sure if it is legal to have multiple
        // top-level nodes just below <plist>.
        var plist_array = [];
        for(var i = 0; i < child_nodes.length; ++i){
           plist_array.push(parser._xml_to_json(child_nodes[i]));
        };
        // var plist_hash = {};
        // plist_hash['plist'] = plist_array;
        // return plist_hash;
        return plist_array;
      } else {
        return parser._xml_to_json(child_nodes[0]);
      }
      break;
    case 'dict':

      var dictionary = {};
      var key_name;
      var key_value;
      for(var i = 0; i < child_nodes.length; ++i){
        var child = child_nodes[i];
        if (child.nodeName == '#text'){
          // ignore empty text children
        } else if (child.nodeName == 'key'){
          key_name = PlistParser._textValue(child.firstChild);
        } else {
          key_value = parser._xml_to_json(child);
          dictionary[key_name] = key_value;
        }
      }

      return dictionary;

    case 'array':

      var standard_array = [];
      for(var i = 0; i < child_nodes.length; ++i){
        var child = child_nodes[i];
        standard_array.push(parser._xml_to_json(child));
      }
      return standard_array;

    case 'string':

      return PlistParser._textValue(parent_node);

    case 'date':

      var date = PlistParser._parseDate(PlistParser._textValue(parent_node));
      return date.toString();

    case 'integer':
    
      return parseInt(PlistParser._textValue(parent_node), 10);

    case 'real':
    
      return parseFloat(PlistParser._textValue(parent_node));

    case 'data':

      return PlistParser._textValue(parent_node);

    case 'true':

      return true;

    case 'false':
    
      return false;
      
    
    case '#text':

      break;
  };
};

// Lifted (slightly modified) from: 
// http://blog.stchur.com/2007/04/06/serializing-objects-in-javascript/
PlistParser.serialize = function(_obj) {
  // Let Gecko browsers do this the easy way
  if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined')
  {
    return _obj.toSource();
  }

  // Other browsers must do it the hard way
  switch (typeof _obj)
  {
    // numbers, booleans, and functions are trivial:
    // just return the object itself since its default .toString()
    // gives us exactly what we want
    case 'number':
    case 'boolean':
    case 'function':
      return _obj;

    // for JSON format, strings need to be wrapped in quotes
    case 'string':
      return '\'' + _obj + '\'';

    case 'object':
      var str;
      if (_obj.constructor === Array || typeof _obj.callee !== 'undefined')
      {
        str = '[';
        var i, len = _obj.length;
        for (i = 0; i < len-1; i++) { str += PlistParser.serialize(_obj[i]) + ','; }
        str += PlistParser.serialize(_obj[i]) + ']';
      }
      else
      {
        str = '{';
        var key;
        for (key in _obj) { 
          // "The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype."
          if (_obj.hasOwnProperty(key)) {
            str += key + ':' + PlistParser.serialize(_obj[key]) + ','; }
          }
        str = str.replace(/\,$/, '') + '}';
      }
      return str;

    default:
      return 'UNKNOWN';
  };
};

PlistParser._textValue = function(node) {
  if (node.text){
    return node.text;
  } else {
    return node.textContent;
  };
};

// Handle date parsing in non-FF browsers
// Thanks to http://www.west-wind.com/weblog/posts/729630.aspx
PlistParser._parseDate = function(date_string){
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  var matched_date = reISO.exec(date_string);
  if (matched_date){ 
    return new Date(Date.UTC(+matched_date[1], +matched_date[2] - 1, +matched_date[3], +matched_date[4], +matched_date[5], +matched_date[6]));
  };
};

