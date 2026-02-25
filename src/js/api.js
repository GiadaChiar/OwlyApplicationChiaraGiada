//function for API calls


//standard response error
export async function fetchJson(url){
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Error, fetch failed or book's id not found: ${response.status}`)
        }
        const data = await response.json();
        return data;
}


export async function fetchBookData(titleId){
    const url = `https://openlibrary.org${titleId}.json`;
    return await fetchJson(url);
}


// create fetch filter 
export function createFilterFetch (categoryInput,authorInput,titleInput){
    const baseUrl= `https://openlibrary.org/search.json`
    const params = new URLSearchParams();
    //category
    if (categoryInput.value) {
    params.append("subject", categoryInput.value);
    }
    //author
    if(authorInput.value){
        params.append("author_name", authorInput.value);
        console.log("nome autore",authorInput.value)
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