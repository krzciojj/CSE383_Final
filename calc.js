var URL1 = 'https://api.clearllc.com/api/v2/math/';
var URL2 = '?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=';
$(document).ready(function () {
    $("#form").submit((event) => {
        event.preventDefault();
        getMath();
    })
})

function getMath() {
        // splits it into a array based on spaces
        var operator = $("#operator").val();
        var n1 = $("#n1").val();
        var n2 = $("#n2").val();
        // joins the whole array with + inbetween each
        console.log(operator);
        console.log(n1);
        console.log(n2);
        var URL = URL1 + operator + URL2 + n1 + '&n2=' + n2;
        console.log(URL);
        $.ajax({
                url: URL,
                method: "GET"
        }).done(function(data) {
                console.log(data);
                var ret = data;
                document.getElementById("result").innerHTML = ret.result;
        }).fail(function(err) {
                document.getElementById("result").innerHTML = 'Can not divide by 0';
                console.log(err);
        });
}
