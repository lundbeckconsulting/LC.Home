"use strict";

var LC = {
    PUB: {
        DateTime: {
            Current: {
                date: function date() {
                    return new Date();
                },
                time: function time() {
                    return LC.PUB.DateTime.Current.date().getTime();
                },
                long: function long() {
                    return LC.PUB.DateTime.toLongDate(LC.DateTime.date());
                },
                short: function short() {
                    return LC.PUB.DateTime.toShortDate(LC.DateTime.date());
                }
            },
            toLongDate: function toLongDate(date) {
                var result = LC.PUB.DateTime.toShortDate(date) + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + "." + date.getUTCSeconds();

                return result;
            },
            toShortDate: function toShortDate(date) {
                var result = date.getUTCDay() + "." + (date.getUTCMonth() + 1) + "." + date.getUTCFullYear();

                return result;
            },
            subtractDays: function subtractDays(days) {
                var result = LC.PUB.DateTime.Current.date;

                result.setDate(result.getDate() - days);

                return result;
            }
        },
        Common: {
            siteId: function siteId() {
                var result = $("#lc-common-site-id").val();

                return parseInt(result);
            },
            appId: function appId(callback) {
                if (LC.PUB.Common.siteId() > 0) {
                    LC.API.Ajax.Invoke(null, "Site", "GetSite", { "id": LC.PUB.Common.siteId() }, null, "GET", function (result) {
                        if (!LC.PUB.State.isEmpty(callback)) {
                            callback(result.id);
                        }
                    });
                }
            },
            isDevelopment: function isDevelopment() {
                var result = -1;
                var $elm = $("#lc-common-is-development");

                if (!LC.PUB.State.isEmpty($elm)) {
                    if ($.isNumeric($elm.val())) {
                        result = parseInt($elm.val());
                    }
                }

                return LC.PUB.Cast.toBool(result);
            },
            creds: function creds(callback) {
                var url = "/SECURE/creds.json";

                if (LC.PUB.Utility.fileExists(url)) {
                    LC.API.Ajax.GetJSON(url, success);
                } else {
                    LC.PUB.Utility.Console.error("creds.json doesn't exists. \"" + url + "\"");
                }

                function success(data) {
                    callback(data);
                }
            }
        },
        Utility: {
            fileExists: function fileExists(url) {
                var result = false;
                var xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, false);
                xhr.send();

                if (xhr.status !== 404) {
                    result = true;
                }

                xhr = null;

                return result;
            },
            Console: {
                basic: function basic(content) {
                    if (LC.PUB.Common.isDevelopment()) {
                        console.log(content);
                    }
                },
                error: function error(content) {
                    if (LC.PUB.Common.isDevelopment()) {
                        console.error(content);
                    }
                }
            },
            Log: {
                warning: function warning(content) {},
                dbLog: function dbLog(content) {}
            }
        },
        State: {
            isEmpty: function isEmpty(val) {
                var result = true;

                if (typeof val !== "undefined" && val !== null) {
                    result = val.length === 0;
                }

                return result;
            },
            isEqual: function isEqual(val1, val2) {
                return val1 === val2;
            },
            isEmail: function isEmail(email) {
                var result = false;
                var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (reg.test(email)) {
                    result = true;
                }

                return result;
            },
            isURL: function isURL(url) {
                var result = false;
                var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

                if (reg.test(url)) {
                    result = true;
                }

                return result;
            },
            isBool: function isBool(val) {
                var result = false;

                switch (val.toLowerCase()) {
                    case "true":
                    case "false":
                    case "1":
                    case "0":
                        result = true;
                        break;
                }

                return result;
            }
        },
        Math: {
            roundUp: function roundUp(val) {
                var result = this;
                var separator = undefined;

                if (!$.isNumeric(val)) {
                    LC.PUB.Utility.Console.error("RoundUp", "Supplied value \"" + val + "\" not numeric");
                } else {
                    if (val.indexOf(".") > 0) {
                        separator = ".";
                    } else if (val.indexOf(",") > 0) {
                        separator = ",";
                    }

                    if (!separator.IsNull()) {
                        var tmp1 = undefined,
                            tmp2 = undefined;

                        tmp1 = parseInt(val.substring(0, val.indexOf(separator)));
                        tmp2 = parseInt(val.substring(val.indexOf(separator)));

                        if (tmp >= 50) {
                            result = tmp1 + 1;
                        }
                    }
                }

                return result;
            }
        },
        Cast: {
            toBool: function toBool(val) {
                var result = false;

                switch (String(val).toLowerCase()) {
                    case "true":
                    case "1":
                        result = true;
                        break;
                }

                return result;
            },
            toCapitalCase: function toCapitalCase(val) {
                var result = undefined;

                if (!LC.PUB.State.isEmpty(val)) {
                    result = val.substring(0, 1).toUpperCase() + val.substring(1);
                }

                return result;
            },
            toCamelCase: function toCamelCase(val) {
                var result = undefined;
                var vals = val.Split(" ");
                var i = 0;

                $.each(vals, function (val) {
                    var word = LC.PUB.State.toCapitalCase(val);

                    result += i === 0 ? word : " " + word;

                    i++;
                });

                return result;
            },
            toCamelCaseMerged: function toCamelCaseMerged(val) {
                return LC.PUB.Cast.ToCamelCase(val).replace(" ", "");
            }
        },
        Cookie: {
            Get: function Get(name) {
                return Cookies.Get(name);
            },
            Set: function Set(name, value) {
                var expire = arguments.length <= 2 || arguments[2] === undefined ? 180 : arguments[2];

                Cookies.Set(name, value, { expires: expire, path: "" });
            },
            Delete: function Delete(name) {
                Cookies.Remove(name, { expires: -1, path: "" });
            },
            DeleteAll: function DeleteAll() {
                var cookies = [];

                var i = 1;

                $.each(Cookies.get(), function (cookie) {
                    var name = cookie.name;

                    LC.PUB.Utility.Console.basic("Processing " + name);

                    LC.PUB.Cookie.Delete(name);
                    result.push(name);

                    i++;
                });

                LC.PUB.Utility.Console.basic(i + " cookies deleted");
            }
        }
    },
    API: {
        CMS: {
            signIn: function signIn(user, pass, callback) {
                var body = { Username: user, Password: pass };

                LC.API.Ajax.Invoke(null, "CMS", "SignIn", {}, body, "POST", callback);
            }
        },
        Contact: {
            createEmail: function createEmail(appId, smtpProfileId, dateScheduled, sender, senderName, subject, content) {
                var recipients = arguments.length <= 7 || arguments[7] === undefined ? null : arguments[7];
                var templateId = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
                var templateValues = arguments.length <= 9 || arguments[9] === undefined ? null : arguments[9];
                var cc = arguments.length <= 10 || arguments[10] === undefined ? null : arguments[10];
                var bcc = arguments.length <= 11 || arguments[11] === undefined ? null : arguments[11];
                var attachments = arguments.length <= 12 || arguments[12] === undefined ? null : arguments[12];
                var callback = arguments.length <= 13 || arguments[13] === undefined ? null : arguments[13];

                var body = { appId: appId, dateScheduled: dateScheduled, emailTemplateId: templateId, templateValues: templateValues, smtpProfileId: smtpProfileId, subject: subject, senderAddress: sender, senderName: senderName, content: content, recipients: recipients, cc: cc, bcc: bcc, attachments: attachments };

                LC.PUB.Utility.Console.basic({ createEmail: "createEmail", body: body });

                LC.API.Ajax.Invoke(null, "Contact", "CreateEmail", {}, body, "POST", callback);
            },
            createEmailWithSiteId: function createEmailWithSiteId(siteId, smtpProfileId, dateScheduled, sender, senderName, subject, content) {
                var recipients = arguments.length <= 7 || arguments[7] === undefined ? null : arguments[7];
                var templateId = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
                var templateValues = arguments.length <= 9 || arguments[9] === undefined ? null : arguments[9];
                var cc = arguments.length <= 10 || arguments[10] === undefined ? null : arguments[10];
                var bcc = arguments.length <= 11 || arguments[11] === undefined ? null : arguments[11];
                var attachments = arguments.length <= 12 || arguments[12] === undefined ? null : arguments[12];
                var callback = arguments.length <= 13 || arguments[13] === undefined ? null : arguments[13];

                var body = { siteId: parseInt(siteId), dateScheduled: dateScheduled, emailTemplateId: templateId, templateValues: templateValues, smtpProfileId: smtpProfileId, subject: subject, senderAddress: sender, senderName: senderName, content: content, recipients: recipients, cc: cc, bcc: bcc, attachments: attachments };

                LC.PUB.Utility.Console.basic({ createEmail: "createEmailWithSiteId", body: body });

                LC.API.Ajax.Invoke(null, "Contact", "CreateEmailWithSiteId", {}, body, "POST", callback);
            },
            deleteEmail: function deleteEmail(id) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                var body = { id: id };

                LC.PUB.Utility.Console.basic({ deleteEmail: "deleteEmail", body: body });

                LC.API.Ajax.Invoke(null, "Contact", "Delete", {}, body, "DELETE", callback);
            },
            scheduleEmail: function scheduleEmail(id, date) {
                var callback = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

                var body = { id: id, date: date };

                LC.PUB.Utility.Console.basic({ scheduleEmail: "scheduleEmail", body: body });

                LC.API.Ajax.Invoke(null, "Contact", "Schedule", {}, body, "POST", callback);
            }
        },
        Ajax: {
            Invoke: function Invoke() {
                var host = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var controller = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var action = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var query = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
                var data = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
                var type = arguments.length <= 5 || arguments[5] === undefined ? "GET" : arguments[5];
                var callback = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

                var url = LC.API.Ajax.GetUrl(host, controller, action, query);
                var timeStart = new Date();

                LC.API.Ajax.apiHeader(headerSuccess);

                function headerSuccess(header) {
                    $.ajax({
                        type: type.toUpperCase(),
                        url: url,
                        headers: header,
                        data: JSON.stringify(data),
                        dataType: "JSON",
                        contentType: "application/json",
                        success: function success(result) {
                            LC.PUB.Utility.Console.basic({ duration: (new Date() - timeStart) / 1000, url: url, data: data });

                            if (!LC.PUB.State.isEmpty(callback)) {
                                callback(result);
                            }
                        },
                        error: function error(xhr, status, _error) {
                            LC.PUB.Utility.Console.error({ error: _error });
                            LC.PUB.Utility.Console.error({ status: status });
                            LC.PUB.Utility.Console.error({ xhr: xhr });
                        }
                    });
                }
            },
            GetJSON: function GetJSON(url, callback) {
                $.getJSON(url, success);

                function success(data) {
                    callback(data);
                }
            },
            GetUrl: function GetUrl() {
                var host = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var controller = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var action = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var query = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

                var result = LC.PUB.Common.isDevelopment() ? "https://localhost:44374/" : "http://api.lctools.lundbeckconsulting.no/";

                if (!LC.PUB.State.isEmpty(host)) {
                    result = host;
                }

                if (!LC.PUB.State.isEmpty(controller)) {
                    result += "/" + controller;
                }

                if (!LC.PUB.State.isEmpty(action)) {
                    result += "/" + action;
                }

                var tmp = undefined;
                var i = 0;

                $.each(query, function (key, value) {
                    if (i === 0) {
                        tmp = "?";
                    } else {
                        tmp += "&";
                    }

                    console.log({ tmp: tmp, key: key, value: value });

                    tmp += key + "=" + value;

                    i++;
                });

                if (!LC.PUB.State.isEmpty(tmp)) {
                    result += tmp;
                }

                return result.toLowerCase();
            },
            apiHeader: function apiHeader(callback) {
                LC.PUB.Common.creds(success);

                function success(data) {
                    var result = { LCAuth: data.Key + "/" + data.Password };

                    callback(result);
                }
            }
        }
    }
};

(function () {
    LC.PUB.Utility.Console.basic("init");
})();

(function ($) {
    $.fn.ToBool = function () {
        var result = LC.PUB.Cast.toBool(this.val());

        return result;
    };

    $.fn.IsNumeric = function () {
        return $.isNumeric(this.val());
    };

    $.fn.IsEqual = function (val) {
        return LC.PUB.State.isEqual(val, this.val());
    };

    $.fn.IsBool = function () {
        return LC.PUB.State.isBool(this.val());
    };

    $.fn.IsEmail = function () {
        return LC.PUB.State.isEmail(this.val());
    };

    $.fn.IsEmailAsInt = function () {
        var result = 0;

        if (this.IsEmail()) {
            result = 1;
        }

        return result;
    };

    $.fn.IsURL = function () {
        return LC.PUB.State.isURL(this.val());
    };

    $.fn.IsURLAsInt = function () {
        var result = 0;

        if (this.IsURL()) {
            result = 1;
        }

        return result;
    };

    $.fn.IsEmpty = function () {
        var result = LC.PUB.State.isEmpty(this.val());

        return result;
    };

    $.fn.ToCapitalCase = function () {
        return LC.Cast.toCapitalCase(this.val());
    };

    $.fn.ToCamelCase = function () {
        return LC.PUB.Cast.toCamelCase(this.val());
    };

    $.fn.ToCamelCaseMerged = function () {
        return LC.PUB.Cast.toCamelCaseMerged(this.val());
    };

    $.fn.StartsWith = function (str) {
        return this.val().startsWith(str);
    };

    $.fn.EndsWith = function (str) {
        return this.val().endsWith(str);
    };

    $.fn.SetCookie = function (name) {
        var expires = arguments.length <= 1 || arguments[1] === undefined ? 180 : arguments[1];

        LC.PUB.Cookie.Set(name, this.val(), expires);
    };
})(jQuery);

