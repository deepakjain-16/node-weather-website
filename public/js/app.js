// console.log('client side js');
// const weatherForm = document.querySelector('form');
// weatherForm.addEventListener('submit',(e) =>{
//     e.preventDefault();
//     console.log('submitted');
// })
$('form').submit((e)=>{
    e.preventDefault();
    if($('form').children('input').val() == '')
        alert('Invalid!');
    else
    {
        $('#forcast').text('Loading...');
        $('#location').empty();
        const url = 'http://localhost:3000/weather?address='+$('form').children('input').val();
        callService(url,(error,data)=>{
            if(error){
                $('#forcast').text(error);
            }
            else{
                $('#forcast').text(data.forcast);
                $('#location').text(data.location);
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