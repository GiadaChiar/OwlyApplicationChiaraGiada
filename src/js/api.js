//function for API calls

//standard response error
async function fetchJson(url){
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Error, fetch failed or book's id not found: ${response.status}`)
        }
        const data = await response.json();
        return data;
}


//fetch description title 
async function fetchBookData(titleId,row){
    //call another API 
        //don't usen encodeURIComponent bacause it trasform / in %
        const url =`https://openlibrary.org${titleId}.json`;
        console.log("Url request description:", url)
        console.log("print id:", titleId)
        try{
            const data = await fetchJson(url);
            console.log("Description API:", data.description);
                if (!row) 
                return;
            createDomBookDescription(data,row);
        }catch(error){
            console.error("Error to create or insert text to description section",error)
        }
        
}


// create fetch filter 
function createFilterFetch (categoryInput,authorInput,titleInput){
    const baseUrl= `https://openlibrary.org/search.json`
    const params = new URLSearchParams();
    //category
    if (categoryInput.value) {
    params.append("subject", categoryInput.value);
    }
    //author
    if(authorInput.value){
        params.append("author_name",authorInput.value);
    }
    //titleselectedLanguage
    if(titleInput.value){
        params.append("title",titleInput.value);
    }
    //limit 
    params.append("limit", "20");
    const url = `${baseUrl}?${params.toString()}`;
    return url;
}