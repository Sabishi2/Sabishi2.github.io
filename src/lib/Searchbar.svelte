<script>
    import Result from "./Result.svelte";

    let { char_info, choose_func, cookie_guessed } = $props();
    let searchResults = null;
    let search = $state("");
    let mouseOver = false;
    let resultList = $state([]);

    let guessed_chars = cookie_guessed;
    const choose = (name, id) => {
        guessed_chars.push(id);
        searchChange();
        searchResults.classList.add("inactive");
        choose_func(name, id);
    };

    const onFocus = () => {
        if (resultList.length != 0) {
            searchResults.classList.remove("inactive");
        }
    };
    const onFocusOut = () => {
        if (!mouseOver) {
            searchResults.classList.add("inactive");
        }
    };

    function getImageUrl(imageName) {
        var imageUrl;
        const modules = import.meta.glob("./src/assets/*", { eager: true });
        for (const path in modules) {
            console.log(path);
            if (path.includes(imageName)) {
                imageUrl = path;
                break;
            }
        }
        return imageUrl;
    }

    async function fetch_photo(img_src, index) {
        let img_arr = img_src.split("/");
        let img_str = img_arr[img_arr.length - 1];
        let src = getImageUrl(img_str);

        resultList[index][0] = src;
    }

    async function searchChange() {
        let eesyks = false;
        resultList = [];
        if (search.replace(/\s/g, "").length == 0) {
            searchResults.classList.add("inactive");
            return;
        }
        let i = 0;
        char_info.forEach((char) => {
            if (char[1].toLowerCase().includes(search.toLowerCase())) {
                if (!guessed_chars.includes(char[2])) {
                    resultList.push(char);
                    searchResults.classList.remove("inactive");
                    eesyks = true;
                    fetch_photo(char[0], i);
                    i++;
                }
            }
        });
        if (!eesyks) {
            searchResults.classList.add("inactive");
        }
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    id="search-bar-container"
    onmouseenter={() => {
        mouseOver = true;
    }}
    onmouseleave={() => {
        mouseOver = false;
    }}
>
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
        <!--
        <input
            type="button"
            id="search-btn"
            name="search-btn"
            onclick={search_for}
        />-->
    </div>

    <div id="search-results" class="inactive" bind:this={searchResults}>
        {#each resultList as result}
            <Result
                img_src={result[0]}
                name={result[1]}
                id={result[2]}
                choose_func={choose}
            />
        {/each}
    </div>
</div>
