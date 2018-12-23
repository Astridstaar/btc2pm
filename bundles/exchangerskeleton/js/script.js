$(document).ready(function () {
    $('.tabs-block').each(function () {
        $(this).find('.tab').each(function (i) {
            $(this).click(function () {
                $(this).addClass('active semibold').siblings().removeClass('active semibold')
                    .closest('.wrapper').find('form').removeClass('visible').eq(i).addClass('visible');
            });
        });
    });


    /*    chose-list      */

    var _from = "", _to = "";
    var _submBtn = $("#go-submit");

    var fromPlaceholder = $("#from-placeholder");
    var toPlaceholder = $("#to-placeholder");

    var selectedFrom = $("#select-from");
    var selectedTo = $("#select-to");

    var link = "";

    $(".select-menu").click(function () {
        if ($(this).attr("id") == "select-from") {
            var menu = $("#select-from-menu");

            menu.children("span").each(function () {
                $(this).click(function () {
                    if ($(this).hasClass("disabled"))
                        return false;

                    _from = $(this).attr("id");
                    fromPlaceholder.text("Из " + $(this).attr("alt"));
                    menu.hide();
                    link = makeLink(_submBtn.parent(), _from, _to);

                    validate(true);

                    if (_to != "")
                        _submBtn.removeAttr("disabled");

                    return false;
                });
            });

            menu.slideToggle(200);
        }
        else if ($(this).attr("id") == "select-to") {
            var menu = $("#select-to-menu");

            menu.children("span").each(function () {
                $(this).click(function () {
                    if ($(this).hasClass("disabled"))
                        return false;

                    _to = $(this).attr("id");
                    toPlaceholder.text("В " + $(this).attr("alt"));
                    menu.hide();
                    link = makeLink(_submBtn.parent(), _from, _to);

                    validate(false);

                    if (_from != "")
                        _submBtn.removeAttr("disabled");

                    return false;
                });
            });

            menu.slideToggle(200);
        }
    });

    _submBtn.click(function () {
        window.location.href = link;
    });

    function makeLink(a, f, t) {
        var link = "http://" + f + "2" + t + ".me";

        return link;
    }

    function validate(b) {
        var f = $("#select-from-menu");
        var t = $("#select-to-menu");

        if (b) {
            t.children("span").each(function () {
                $(this).show();
            });

            if (_from == "btc")
                t.find("#btc-e").addClass("disabled");
            else if (_from == "btc-e")
                t.find("#btc").addClass("disabled");

            t.find("#" + _from).addClass("disabled");
        }
        else {
            {
                f.children("span").each(function () {
                    $(this).show();
                });

                if (_to == "btc")
                    f.find("#btc-e").addClass("disabled");
                else if (_to == "btc-e")
                    f.find("#btc").addClass("disabled");

                f.find("#" + _to).addClass("disabled");
            }
        }
    }

    $(document).find('*[data-dynamic-link]').on('click', function (e) {
        e.preventDefault();
        window.location.href = $(this).data('dynamic-link');
    });
});
