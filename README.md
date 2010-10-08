plist2json
----------

plist2json provides a parser which accepts a Property List expressed as an XML string, and outputs JSON.  ARRAY and DICT wrapping classes are discarded - their data is resturned as JavaScript arrays and associative arrays, respectively.