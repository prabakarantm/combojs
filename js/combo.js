/*
The MIT License (MIT)

Copyright (c) 2016 Walter M. Soto Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function ($) {

    var elem = function (attr) {

        if (attr.hasOwnProperty("tag")) {
            var d = document.createElement(attr.tag);
            if (attr.hasOwnProperty("className")) {
                $(d).addClass(attr.className);
            }
            if (attr.hasOwnProperty("type")) {
                $(d).attr("type", attr.type);
            }
            if (attr.hasOwnProperty("val")) {
                $(d).val(attr.val);
            }
            if (attr.hasOwnProperty("text")) {
                $(d).text(attr.text);
            }
            if (attr.hasOwnProperty("id")) {
                $(d).attr("id", attr.id);
            }
            if (attr.hasOwnProperty("name")) {
                $(d).attr("name", attr.name);
            }
            return d;
        }
        return null;
    };

    var elemItem = function (data) {
        var row = elem({ tag: "div", className: "combojs-row" });
        var item = elem({ tag: "div", text: data.label });
        $(row).attr("value", data.value);
        $(row).append(item);
        return row;
    };

    var trackr = {};

    var o = function (id) {
        this.items = (typeof trackr[id].data === "undefined")
                     ? [] : trackr[id].data;
        this.getSelected = trackr[id].selected;
        this.setSelected = function (value, label) {

            trackr[id].selected = {
                value: value,
                label: label
            };

            $("#" + trackr[id].editId).val(label);
            $("#" + id).val(value);
        };
        this.add = function (data) {
            if (typeof trackr[id].data === "undefined") {
                trackr[id].data = [];
            }

            for (var i = 0; i < data.length; i++) {
                $("#" + trackr[id].listId).append(elemItem(data[i]));
                trackr[id].data.push($.trim(data[i]));
            }
        };
        this.clear = function () {
            trackr[id].data = [];
            trackr[id].selected = "";
            $("#" + trackr[id].listId).remove("div.combojs-row");
        }
    };

    var fn = function (id) {
        return new o(id);
    }

    var processCombo = function () {

        $(document).mouseup(function (e) {

            var box = $(".combojs");

            if (!box.is(e.target)
                && box.has(e.target).length === 0) {
                $(".combojs-list").hide();
            }
        });

        $("select[combojs]").each(function (n) {

            var id = $(this).attr("combojs");
            var defaultValue = $(this).attr("combojs-value") || "";
            var defaultLabel = $(this).attr("combojs-label") || "";
            var listId = "list_area_autoid_" + id;
            var editId = "edit_area_autoid_" + id;

            var data = [];
            var selected = {
                label: defaultLabel,
                value: defaultValue
            };
            var hasCustom = $.trim(selected.value).length > 0;
            var dataItems = $(this).children("option");

            trackr[id] = {
                data: data,
                selected: selected,
                listId: listId,
                editId: editId
            };

            $(dataItems).each(function () {
                if (this.selected && !hasCustom) {
                    selected = {
                        label: $.trim(this.label),
                        value: $.trim(this.value)
                    };
                }
                data.push({
                    label: $.trim(this.label),
                    value: $.trim(this.value)
                });
            });
             
            var top = elem({
                tag: "div",
                className: "combojs"
            });

            var txtArea = elem({
                tag: "div",
                className: "combojs-edit"
            });

            var listArea = elem({
                tag: "div",
                className: "combojs-list"
            });

            $(txtArea).click(function () {
                if ($(listArea).css("display") === "none") {
                    $(listArea).show();
                } else {
                    $(listArea).hide();
                }
            });

            var hidden = elem({
                tag: "input",
                type: "hidden",
                val: selected.value,
                id: id,
                name: id
            });

            var txt = elem({
                tag: "input",
                type: "text",
                val: selected.label,
                id: editId,
                name: editId
            });

            $(txtArea).append(txt);

            var list = elem({ tag: "div", id: listId });

            for (var i = 0; i < data.length; i++) {
                $(list).append(elemItem(data[i]));
            }

            $(listArea).append(list);
            $(top).append(hidden);
            $(top).append(txtArea);
            $(top).append(listArea);

            $(this).replaceWith(top);

            $(txt).on("keyup", function (e) {
                if (!$.isNumeric($(this).val())) {
                    e.preventDefault();
                } else {
                    $(hidden).val($.trim($(this).val()));
                } 
            });

            $(listArea).delegate("div.combojs-row", "click", function () {
                var label = (this.firstChild)
                    ? $.trim(this.firstChild.innerHTML) :
                    $.trim($(this).attr("value"));

                $(txt).val($.trim(label));
                $(hidden).val($.trim($(this).attr("value")));

                trackr[id].selected = {
                    label: $.trim(label),
                    value: $.trim($(this).attr("value"))
                };

                $(listArea).hide();
            });

        });

    };

    $(document).ready(processCombo);

    if (!window.$combo) {
        window.$combo = fn;
    }

})(jQuery);