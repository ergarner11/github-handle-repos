function getRepos(handle){
    fetch('https://api.github.com/users/' + handle + '/repos')
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRepos(responseJson);
                })
                .catch(error => {
                    console.log("Something went wrong: " + error.message);
                    $('.repos').html(`<p>Something went wrong: ${error.message}</p>`);
                });
                
}

function displayRepos(responseJson){
    let htmlString = '';

    for( let i = 0; i < responseJson.length; i++){
        htmlString += `<li>
                            <p>${responseJson[i].name}</p>
                            <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a>
                        </li>`;
    }

    $('.repos').html(htmlString);
}


function handleFormSubmit(){
    $('form').submit(function(event){
        event.preventDefault();
        let handle = $('input[type=text]').val();

        getRepos(handle);
    });
}


function setup(){
    handleFormSubmit();
}

$(setup());
