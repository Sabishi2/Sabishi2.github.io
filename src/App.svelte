<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Searchbar from "./lib/Searchbar.svelte";

  let version = "1.1";
</script>

<main>
  <div id="center-container">
    <img id="logo" src="./src/assets/logo_real.png" />

    <Searchbar />

    <div id="guesses-container">
      <div id="filters">
        <span class="filter">Character</span>
        <span class="filter">Gender</span>
        <span class="filter">Age</span>
        <span class="filter">Species</span>
        <span class="filter">Versions</span>
        <span class="filter">First appearance</span>
      </div>
      <hr />

      <div class="guess">
        <div class="char-image-container">
          <img class="char-image" src="./src/assets/ueki.png" />
          <span class="char-text">Ueki</span>
        </div>
        <div class="correct color-box">
          <span>Male</span>
        </div>
        <div class="incorrect color-box">
          <span>14</span>
        </div>
        <div class="partial color-box">
          <span>Human</span>
        </div>
        <div class="partial color-box">
          <span>{version}</span>
        </div>
        <div class="incorrect color-box">
          <span>▲ Mansion on the outskirts of town arc</span>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
