<script>
    import { get } from "svelte/store";
    import Result from "./Result.svelte";
    import { onMount } from "svelte";

    let { char_info, choose_func, cookie_guessed } = $props();
    let searchResults = null;
    let search = $state("");
    let disabled_var = $state(false);
    let container = null;
    let bar = null;
    let mouseOver = false;
    let resultList = $state([]);

    export const disable = () => {
        disabled_var = true;
        container.classList.add("search-disabled");
        bar.classList.add("search-disabled");
    };

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
        const urlPath = "https://Sabishi2.github.io/";
        let imageUrl;

        imageUrl = urlPath + imageName;

        return imageUrl;
    }

    async function fetch_image(img_src, index) {
        const response = await fetch(img_src);
        const bloby = await response.blob();

        return [index, URL.createObjectURL(bloby)];
    }

    function searchChange() {
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
                }
            }
            i++;
        });
        if (!eesyks) {
            searchResults.classList.add("inactive");
        }
    }
    for (let i = 0; i < char_info.length; i++) {
        // This is dumb as hell but since it's asynced just give the async func the index we want to append so it doesn't get mixed up in the then statement
        fetch_image(getImageUrl(char_info[i][0]), i).then((result) => {
            char_info[result[0]][0] = result[1];
        });
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
    bind:this={container}
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
            disabled={disabled_var}
            bind:this={bar}
        />
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
