<script>
    let { img_src, name } = $props();
</script>

<div class="result">
    <img class="result-img" src={img_src} />
    <span class="result-text">{name}</span>
</div>
