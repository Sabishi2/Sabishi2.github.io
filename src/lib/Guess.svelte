<script>
    import ColorBox from "./ColorBox.svelte";
    let { player_guess_info, right_guess_info } = $props();

    let pg_stats = player_guess_info["stats"];
    let rg_stats = right_guess_info["stats"];
    let keys = Object.keys(pg_stats);

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

    let src = $state("");
    fetch_image(getImageUrl(player_guess_info["img_path"]), 0).then(
        (result) => {
            src = result[1];
        },
    );
</script>

<div class="guess">
    <div class="char-image-container fade-in">
        <img class="char-image" {src} />
        <span class="char-text">{player_guess_info["name"]}</span>
    </div>

    {#each keys as key, i}
        <ColorBox pg_stat={pg_stats[key]} rg_stat={rg_stats[key]} {i} />
    {/each}

    <!--
    <div class="correct color-box">
        <span>{player_guess_info["gender"]}</span>
    </div>
    <div class="incorrect color-box">
        <span>{age}</span>
    </div>
    <div class="partial color-box">
        <span>{species}</span>
    </div>
    <div class="partial color-box">
        <span>{versions}</span>
    </div>
    <div class="incorrect color-box">
        <span>▲ Mansion on the outskirts of town arc</span>
    </div>-->
</div>
