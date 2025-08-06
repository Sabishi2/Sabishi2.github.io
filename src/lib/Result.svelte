<script>
    import { onMount } from "svelte";
    let { img_src, name, id, choose_func } = $props();
    function getImageUrl(imageName) {
        const urlPath = "https://Sabishi2.github.io/assets/";
        let imageUrl;

        imageUrl = urlPath + imageName;

        return imageUrl;
    }

    /*async function fetch_photo(url, index) {
        let src = getImageUrl(img_src);
        
        const response = await fetch(src);
    }*/

    let src = getImageUrl(img_src);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->

<div
    class="result"
    on:click={() => {
        choose_func(name, id);
    }}
>
    <img class="result-img" {src} />
    <span class="result-text">{name}</span>
</div>
