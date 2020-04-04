$( document ).ready(function() {
    console.log( "ready!" );
    
    //"https://api.nytimes.com/svc/search/v2/articlesearch.json?q=obama&facet_fields=source&facet=true&begin_date=20120101&end_date=20121231&api-key=2XLlGUjGpRaKTsIwpK3dy9f61afEQpf5"
    // q=obama&facet_fields=source&facet=true&begin_date=20120101&end_date=20121231
    //2XLlGUjGpRaKTsIwpK3dy9f61afEQpf5
    //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&api-key=yourkey
    //&facet_fields=source&facet=true
    
    //Get user data from form
    //register button click on the submit button and or enter
    //handle the clear button
    //handle the 1,5,10 results drop down
    //handle the start year and end year and make it optional
    //Assign data to the bottom fields

    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        let startDate = "20200101";
        let endDate = "20200404";
        let searchTerm = "trump";
        let userStartYear = $("#start-year").val();
        if(userStartYear === "") {
            startDate = "20200101"
        }
        let userEndYear = $("#end-year").val();
        if(userEndYear === "") {
            endDate = "20200404"
        }
        let searchTermEl = $("#search-term").val();
        if(searchTermEl === "") {
            searchTerm = "corona+virus";
        }
        let dropDown = $("#dropdown").val();
        let articlesEl = $("#top-articles");
        
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date="+ startDate + "&end_date=" + endDate + "&api-key=2XLlGUjGpRaKTsIwpK3dy9f61afEQpf5";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            
            for(let i = 0; i < dropDown; i++) {
                let newDiv = $("<div>");
                newDiv.attr("style", "border: solid black;")
                let newP = $("<p>");
                let secondP = $("<p>");
                newP.text("Headline: " + res.response.docs[i].headline.main);
                secondP.text("Abstract: " + res.response.docs[i].abstract);
                newDiv.append(newP);
                newDiv.append(secondP);
                $("#top-articles").append(newDiv);
                
            }
            console.log(res.response.docs[0].headline.main);
        })
    });

    $("#clearBtn").on("click", function(e) {
        // e.preventDefault();
        $("#top-articles").empty();
        $("#the-form").trigger("reset");
        $("#end-form").trigger("reset");
        // $("#search-term").reset();
        // $("#start-year").reset();
        // $("#end-year").reset();
        console.log("clear button clicked.");

    })

});