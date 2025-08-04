<script>
    import Result from "./Result.svelte";

    let { char_info } = $props();
    console.log(char_info);
    let searchResults = null;
    let search = $state("");
    let resultList = $state([]);

    const search_for = () => {};

    const onFocus = () => {
        if (resultList.length != 0) {
            searchResults.classList.remove("inactive");
        }
    };
    const onFocusOut = () => {
        searchResults.classList.add("inactive");
    };

    const searchChange = () => {
        let eesyks = false;
        resultList = [];
        if (search.replace(/\s/g, "").length == 0) {
            searchResults.classList.add("inactive");
            return;
        }
        char_info.forEach((char) => {
            if (char[1].toLowerCase().includes(search.toLowerCase())) {
                resultList.push(char);
                searchResults.classList.remove("inactive");
                eesyks = true;
            }
        });
        if (!eesyks) {
            searchResults.classList.add("inactive");
        }
    };
</script>

<div id="search-bar-container">
    <div id="search-bar-container-inner">
        <input
            onfocus={onFocus}
            onfocusout={onFocusOut}
            bind:value={search}
            oninput={searchChange}
            type="text"
            id="search-bar"
            name="search-bar"
            placeholder="Write your search here (e.g Hiroshi)"
        />
        <input
            type="button"
            id="search-btn"
            name="search-btn"
            onclick={search_for}
        />
    </div>

    <div id="search-results" class="inactive" bind:this={searchResults}>
        {#each resultList as result}
            <Result img_src={result[0]} name={result[1]} />
        {/each}
    </div>
</div>
