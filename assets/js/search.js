(function ($, undefined) {
    $(function () {

        initElements();

        hideSearchResultPage();
        showHomepage();

        function showHomepage() {
            var itemsListSrc = $("#home_page-items-list-template").html();
            var itemsListTemplate = Handlebars.compile(itemsListSrc);
            var $homePageItemsList = $("#home-page-featured-products-list");
            var url = "assets/data/featured-products.json";

            populateElemWithJsonOnTemplate($homePageItemsList, itemsListTemplate, url);

            $("#home-page").show();
        }

        function hideHomepage() {
            $("#home-page").hide();
        }

        function showSearchResultPage() {
            var itemsListSrc = $("#search-items-list-template").html();
            var itemsListTemplate = Handlebars.compile(itemsListSrc);

            var $searchResultItemsList = $("#search-result-items-list");
            var url = "assets/data/search-results.json";

            populateElemWithJsonOnTemplate($searchResultItemsList, itemsListTemplate, url);
            $("#search-result-page").show();

            $("#search-form").hide();
            $("#search-form-input-query").val("");

        }

        function hideSearchResultPage() {
            $("#search-result-page").hide();
            $("#search-form").show();
        }

        function populateElemWithJsonOnTemplate(elem, template, jsonUrl) {

            $.getJSON(jsonUrl, function (data) {
                var evaluatedHtml = template(data);
                elem.html(evaluatedHtml);
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }

        function initElements() {
            $(".slider").slider({});
            $("#auction-close-date-input").datepicker({
                todayBtn: true,
                todayHighlight: true
            });
            $("#spin-edit-bids-number").TouchSpin({
                verticalbuttons: true
            });
            $("#auction-close-date-input").val($.format.date(new Date(), 'dd/MM/yyyy'));

            $("#search-button").on("click", function () {
                hideHomepage();
                showSearchResultPage();
                return false;
            });

            var setBreadcrumbsFunction = (function () {
                $("#breadcrumb_home_page").on("click", function () {
                    showHomepage();
                    hideSearchResultPage();
                    return false;
                });
                $("#breadcrumb_search_page").on("click", function () {
                    hideHomepage();
                    showSearchResultPage();
                    return false;
                })
            }());
        }


    });
})(jQuery);


