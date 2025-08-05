<script>
    import { onMount } from "svelte";
    let { img_src, name, id, choose_func } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
}
<div
    class="result"
    on:click={() => {
        choose_func(name, id);
    }}
>
    <img class="result-img" src={img_src} />
    <span class="result-text">{name}</span>
</div>
