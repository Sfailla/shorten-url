
window.onload = function() {
    
    // lets get the value of the input
    var input = document.querySelector('#myInput');
    var shortButton = document.querySelector('#getShort');
    
    var output = document.querySelector('#output');

    
    shortButton.addEventListener('click', function() {

        axios.get('/short/' + input.value) 
            .then(function(response) {
                if (response.data.short_url === undefined) {
                    output.innerHTML = 'You have added ' + input.value + ' to the Database';
                    shortButton.textContent = 'Get ID';
                } else {
                output.innerHTML = response.data.short_url;
                shortButton.textContent = 'Add Link';
                console.log(response.data);
                }          
            })
            .catch(function(err) {
                if (err) throw err;
            });
        

    });

}
