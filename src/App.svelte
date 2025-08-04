<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Searchbar from "./lib/Searchbar.svelte";
  import Guess from "./lib/Guess.svelte";

  let right_guess_info = {
    img_path: "/src/assets/ueki.png",
    name: "Ueki",
    stats: {
      gender: "Male",
      age: 14,
      species: ["Human"],
      versions: [1.1],
      arc: {
        val: 4,
        name: "Silent old building arc",
      },
    },
  };
  let player_guess_info = {
    img_path: "/src/assets/ueki.png",
    name: "Ueki",
    stats: {
      gender: "Male",
      age: 14,
      species: ["Human"],
      versions: [1.1],
      arc: {
        val: 4,
        name: "Silent old building arc",
      },
    },
  };

  let info_for_searchbar = [];
  let character_dump = [];
  let loading = fetch("./src/info.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      character_dump = data["characters"];
      character_dump.forEach((character) => {
        info_for_searchbar.push([character["img_path"], character["name"]]);
      });
    })
    .catch((error) => console.error("Failed to fetch data:", error));
</script>

<main>
  {#await loading}
    <div></div>
  {:then}
    <div id="center-container">
      <img id="logo" src="/src/assets/logo_real.png" />
      <Searchbar char_info={info_for_searchbar} />
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
      </div>
    </div>
  {/await}
</main>
