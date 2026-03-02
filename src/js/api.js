//function for API calls

// Standard JSON fetch with error handling
export async function fetchJson(url){
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Error, fetch failed or book's id not found: ${response.status}`)
    }
    const data = await response.json();
    return data;
}


// Fetch detailed book data by OpenLibrary work ID
export async function fetchBookData(titleId){
    const url = `https://openlibrary.org${titleId}.json`;
    return await fetchJson(url);
}


// Build a search URL based on user inputs (filters)
export function createFilterFetch (categoryInput,authorInput,titleInput){
    const baseUrl= `https://openlibrary.org/search.json`
    const params = new URLSearchParams();
    //category
    if (categoryInput.value) {
    params.append("subject", categoryInput.value);
    }
    //author
    if(authorInput.value){
        params.append("author", authorInput.value);
    }
    //title
    if(titleInput.value){
        params.append("title",titleInput.value);
    }
    //limit 
    params.append("limit", "20");
    const url = `${baseUrl}?${params.toString()}`;
    return url;
}