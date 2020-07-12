 //console.log('client side js');
// const weatherForm = document.querySelector('form');
// weatherForm.addEventListener('submit',(e) =>{
//     e.preventDefault();
//     console.log('submitted');
// })
$('form').submit((e)=>{
    e.preventDefault();
    if($('form').children('input').val() == ''){
        $('#location').empty();
        $('#forcast').empty();
        alert('Invalid!');
    }
    else
    {
        $('#location').text('Loading...');
        $('#forcast').empty();
        //http://localhost:3000
        const url = '/weather?address='+$('form').children('input').val();
        callService(url,(error,data)=>{
            if(error){
                $('#location').text(error);
            }
            else{
                $('#location').text(data.location);
                $('#forcast').text(data.forcast);
            }
        });
    }   
});

var callService = (url,callback) =>{
    $('#loadingDiv').show();
    fetch(url).then((response)=>{
        $('#loadingDiv').hide();
        response.json().then((data)=>{
            if(data.error)
                callback(data.error);
            else
                callback(null,data);
        });
    });
}