PlistParser
-----------

PlistParser accepts a Property List expressed as an XML string and transforms it into a JavaScript data structure.  ARRAY and DICT wrapping tags are discarded - their data is returned as JavaScript arrays and associative arrays, respectively.  Currently the only output option is JSON.

PlistParser was built for use within the Appcelerator Titanium environment, but should also work with most modern browsers.  At the very least, it works in Firefox.

Usage
-----

Include 'plist_parser.js' within an HTML page or javascript class.

    var jsonString = PlistParser.parse(xmlString);
