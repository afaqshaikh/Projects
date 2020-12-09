$(document).ready(function(){
    var url = 'https://hn.algolia.com/api/v1/search?query=javascript';
    $.getJSON(url, function(data){
        var currentQuotes = '';
        var quotes = data.hits; 
        $('.read').on('click',function(){
            currentQuotes = quotes[Math.floor(Math.random() * quotes.length)];
            console.log(currentQuotes);
            $('.quoteBody').hide();
            $('.quoteBodyLink').html(currentQuotes.title);
            $('quoteBodyLink').attr('href', currentQuotes.url);
            $('.quoteAuthor').html(currentQuotes.author);
            $('.tweetQuote').attr('href','https://twitter.com/intent/tweet?text= ' + currentQuotes.title + '-' + currentQuotes.auther)
            .attr('target','_blank').attr('disabled',false);
            $('.read').html('Show me one more');
        });
        console.log(quotes[0].title);
        console.log(data);

    });
});