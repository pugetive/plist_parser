var PlistParser = function() {
  // In theory this library could be extended to output other formats.
  this.outputFormat = 'json';
};

PlistParser.parse = function(plist_xml){
  // Special case this  if we're running in Appcelerator Titanium
  try{
    if (typeof Ti.XML != 'undefined'){
      plist_xml = Ti.XML.parseString(plist_xml);
    }
  } catch(e){
    // Okay if Titanium classes don't exist, then we're in a browser.
  }
    
  var result = this._xml_to_json(plist_xml.getElementsByTagName('plist').item(0));
  return result;
}

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
    }
  };

  // console.log("working on " + parent_node_name)
  
  switch(parent_node_name){

    case 'plist':
     
      if (child_nodes.length > 0){
        var plist_array = [];
        for(var i = 0; i < child_nodes.length; ++i){
           plist_array.push(parser._xml_to_json(child_nodes[i]));
        };
        var plist_hash = {};
        plist_hash['plist'] = plist_array;
        return plist_hash;
      } else {
        return {plist: parser._xml_to_json(child_nodes.first)};
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
          if (child.firstChild.text){
            key_name = child.firstChild.text;
          } else {
            key_name = child.firstChild.textContent;
          }
        } else {
          key_value = parser._xml_to_json(child);
          dictionary[key_name] = key_value;
        }
      }

      return dictionary;
      break;

    case 'array':

      var standard_array = [];
      for(var i = 0; i < child_nodes.length; ++i){
        var child = child_nodes[i];
        standard_array.push(parser._xml_to_json(child));
      }
      return standard_array;
      break;

    case 'string':

      if (parent_node.text){
        return parent_node.text;
      } else {
        return parent_node.textContent;
      }
      break;

    case '#text':

      break;
  }
}
