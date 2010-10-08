PlistParser
-----------

PlistParser accepts a Property List expressed as an XML string and transforms it into a JavaScript data structure.  ARRAY and DICT wrapping classes are discarded - their data is returned as JavaScript arrays and associative arrays, respectively.  Currently the only output option is JSON.

PlistParser has been tested in modern browsers as well as in the Appcelerator Titanium environment.

Usage
-----

Include 'plist_parser.js' within an HTML page or javascript class.

    var jsonString = PlistParser.parse(xmlString);
