<script>
    let search = $state("");
    const search_verb = () => {
        search = "";
    };
</script>

<div id="search-bar-container">
    <input
        bind:value={search}
        type="text"
        id="search-bar"
        name="search-bar"
        placeholder="Write your search here (e.g Hiroshi)"
    />
    <input
        type="button"
        id="search-btn"
        name="search-btn"
        on:click={search_verb}
    />
</div>
