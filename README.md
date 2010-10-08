PlistParser
-----------

PlistParser accepts a Property List expressed as an XML string and transforms it into a JavaScript data structure. Structure signifiers (ARRAY, DICT, KEY) in the XML are discarded - their data is returned as JavaScript arrays and associative arrays. Currently the only output option is JSON.

PlistParser does not rely on any external libraries like jQuery or JSON.  It was written for use within the Appcelerator Titanium environment, but also works with modern browsers. Tested in Titanium, Firefox, IE, Safari, Chrome, and Opera.

Usage
-----

Include 'plist_parser.js' via an HTML script tag or Titanium.include().

    var jsonString = PlistParser.parse(xmlString);
