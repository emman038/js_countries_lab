const form = document.querySelector("#country-searchbar");

const getCountryByName = async (countryName)=>{
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        // console.log(response);

        if (!response.ok){
            throw new Error(`Error while fetching ${countryName}: ${response.status}`);
        }

        const data = await response.json();

        // console.log(data);

        const lineBreakTag = document.createElement("hr");

        const sectionTag = document.createElement("section");

        const titleTag = document.createElement("h2");
        titleTag.innerText = "Country information:"
        sectionTag.appendChild(titleTag);

        form.insertAdjacentElement("afterend", lineBreakTag);

        lineBreakTag.insertAdjacentElement("afterend", sectionTag);

        const commonName = document.createElement("p");
        commonName.innerHTML = `<strong> Common Name:</strong> ${data[0].name.common}`;
        const officialName = document.createElement("p");
        officialName.innerHTML = `<strong> Official Name:</strong> ${data[0].name.official}`;

        const capital = document.createElement("p");
        capital.innerHTML = `<strong>Capital:</strong>  ${data[0].capital}`;

        const population = document.createElement("p");
        population.innerHTML = `<strong>Population:</strong> ${data[0].population}`;

        const languages = document.createElement("p");
        languages.innerHTML = "<strong>Languages:</strong> "; 

        sectionTag.appendChild(commonName);
        sectionTag.appendChild(officialName);
        sectionTag.appendChild(capital);

        // console.log(data[0].languages);
        // console.log(Object.values(data[0].languages));
        // console.log(Object.values(data[0].languages).length);

        const languagesValues = Object.values(data[0].languages);

        if (languagesValues.length === 1) {
            const languageName = document.createElement("span");
            languageName.innerText = languagesValues[0];
            languages.appendChild(languageName);
        } else {
            languagesValues.forEach((language, index) => {
                const languageName = document.createElement("span");
        
                if (index === 0) {
                    languageName.innerText = language;
                } else if (index === languagesValues.length - 1) {
                    languageName.innerText = `, and ${language}.`;
                } else {
                    languageName.innerText = `, ${language}`;
                }
        
                languages.appendChild(languageName);
            });
        };

        sectionTag.appendChild(languages);

        sectionTag.appendChild(population);

        // console.log(commonName);
        // console.log(officialName);
        // console.log(capital);
        // console.log(population);
        
    } catch (error){
        alert('Error during fetch', error);
    }
};

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const countryName = e.target["country-name"].value;
    getCountryByName(countryName);
});