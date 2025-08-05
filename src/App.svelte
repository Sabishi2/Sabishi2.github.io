<script>
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Searchbar from "./lib/Searchbar.svelte";
  import Guess from "./lib/Guess.svelte";
  import { getCharacter } from "./lib/TodaysGuess.svelte";
  import winImage from "./assets/win.png";
  import logo from "./assets/logo_real.png";
  import json from "./info.json";

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  let time_until_next_character = $state();

  let cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("guessed="))
    ?.split("=")[1];

  let array = [];
  if (cookieValue != undefined) {
    array = cookieValue.split(",").map(Number);
  }
  async function time_loop() {
    await sleep(1000);
    time_loop();
    let time_right_now = new Date();
    let hours = (23 - time_right_now.getHours()).toString();
    let minutes = (59 - time_right_now.getMinutes()).toString();
    let seconds = (59 - time_right_now.getSeconds()).toString();
    if (hours.length == 1) {
      hours = "0" + hours;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    time_until_next_character = hours + ":" + minutes + ":" + seconds;
  }

  let mouseOverWin = false;
  let winContainer = null;
  const hideWin = () => {
    if (!mouseOverWin) {
      winContainer.classList.add("fade-out");
    }
    console.log(mouseOverWin);
  };

  async function correct_guess() {
    await sleep(2000);
    winContainer.classList.add("fade-in");
  }

  time_loop();
  let right_guess_info = {};

  let player_guess_infos = $state([]);

  function chooseFunc(name, id) {
    character_dump.forEach((char) => {
      if (char["id"] == id) {
        player_guess_infos.unshift(char);
      }
    });

    let cookieStr = "";
    player_guess_infos.forEach((guess) => {
      cookieStr = cookieStr + "," + guess["id"];
    });
    cookieStr = cookieStr.substring(1);

    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0);
    let dateStr = date.toUTCString();
    dateStr = dateStr.replace("GMT", "UTC");
    console.log(dateStr);
    document.cookie =
      "guessed=" + cookieStr + "; expires=" + dateStr + "; path=/";
    if (id == right_guess_info["id"]) {
      correct_guess();
    }
  }

  let info_for_searchbar = [];
  let character_dump = [];

  character_dump = json["characters"];
  character_dump.forEach((character) => {
    info_for_searchbar.push([
      character["img_path"],
      character["name"],
      character["id"],
    ]);
  });

  let right_char_index = getCharacter(new Date(), character_dump.length);
  right_guess_info = character_dump[right_char_index];

  array.forEach((id) => {
    player_guess_infos.push(character_dump[id]);
  });
</script>

<main id="main">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    id="win-container"
    onclick={() => {
      hideWin();
    }}
    bind:this={winContainer}
  >
    <div
      id="win-screen"
      onmouseenter={() => {
        mouseOverWin = true;
      }}
      onmouseleave={() => {
        mouseOverWin = false;
      }}
    >
      <img id="win-img" src={winImage} alt="You're winner :)" />
      <h1>Seuraava hahmo in {time_until_next_character}</h1>
      <br /><br /><br />
      <h1>näin voimme jatkaa</h1>
    </div>
  </div>
  <div id="center-container">
    <img id="logo" src={logo} />
    <Searchbar
      char_info={info_for_searchbar}
      choose_func={chooseFunc}
      cookie_guessed={array}
    />
    <div id="guesses-container">
      <div id="filters">
        <span class="filter">Portrait</span>
        <span class="filter">Name</span>
        <span class="filter">Gender</span>
        <span class="filter">Age</span>
        <span class="filter">Species</span>
        <span class="filter">Versions</span>
        <span class="filter">First appearance</span>
      </div>
      <hr />
      {#each player_guess_infos as pg_info (pg_info["id"])}
        <Guess player_guess_info={pg_info} {right_guess_info} />
      {/each}
    </div>
  </div>
</main>
