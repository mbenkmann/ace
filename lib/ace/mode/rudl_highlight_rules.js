define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var RudlHighlightRules = function() {

    var directives = ["unique","keep","reuse","extern","first","override","polymorph",
    "context","max","tuple","random","select","shuffle","daisy","call","type"
    ];
    
    var directivesRe = "";
    for (var i = 0; i < directives.length; i++) {
        if (directivesRe.length !== 0) directivesRe += "|";
        directivesRe += "(?:" + directives[i] + ")";
    }

    var integer = "(?:\\d+)";

    var stringEscape =  "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "string",           // " string
            regex : '"(?=.)',
            next : "qqstring"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : "identifier.variable",
            regex : "[A-Z][a-zA-Z0-9_]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\/|%|&&|\\|\\||<|>|<=|=>|==|!=|=|!|and\\b|or\\b|not\\b"
        }, {
            token : "keyword.directive",
            regex : "add\\b|del\\b|query\\b"
        }, {
            token : "identifier",
            regex : "[a-z][a-zA-Z0-9_]*\\b"
        }, {
            token : "keyword.directive",
            regex : "(?:\\.(?:" + directivesRe + ")\\b)"
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "qqstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : '"|$',
            next  : "start"
        }, {
            defaultToken: "string"
        }]
    };
};

oop.inherits(RudlHighlightRules, TextHighlightRules);

exports.RudlHighlightRules = RudlHighlightRules;
});
