<script>
    import ColorBox from "./ColorBox.svelte";
    let { player_guess_info, right_guess_info } = $props();

    let pg_stats = player_guess_info["stats"];
    let rg_stats = right_guess_info["stats"];
    let keys = Object.keys(pg_stats);

    function getImageUrl(imageName) {
        var imageUrl;
        const modules = import.meta.glob("/src/assets/*", { eager: true });
        for (const path in modules) {
            console.log(path);
            if (path.includes(imageName)) {
                imageUrl = path;
                break;
            }
        }
        return imageUrl;
    }
    let img_arr = player_guess_info["img_path"].split("/");
    let img_str = img_arr[img_arr.length - 1];
    let src = getImageUrl(img_str);
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
