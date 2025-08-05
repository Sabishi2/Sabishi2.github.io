<script>
    import { onMount } from "svelte";
    const str_comparison = (pg_value, rg_value) => {
        return pg_value == rg_value;
    };
    const list_comparison = (pg_value, rg_value) => {
        // return val: 0, 1 or 2, 0=red, 1=yellow, 2=green

        let green = true;
        let return_int = 0;

        pg_value.forEach((pg_element) => {
            if (rg_value.includes(pg_element)) {
                return_int = 1;
            } else {
                green = false;
                if (return_int == 1) {
                    return return_int;
                }
            }
        });
        if (green && rg_value.length == pg_value.length) {
            return_int = 2;
        }
        return return_int;
    };

    const num_comparison = (pg_value, rg_value) => {
        // return val: 0, 1, 2, 0=pg smaller, 1=pg bigger, 2=correct
        if (pg_value < rg_value) {
            return 0;
        } else if (pg_value > rg_value) {
            return 1;
        } else {
            return 2;
        }
    };

    // name is a string specifically if you want to display a string for a numeric value (such as arc)
    // leave it empty if you want to display the number
    const get_class_and_text = (type, pg_value, rg_value, name = "") => {
        let box_class, box_text;
        if (type == "str") {
            box_class = str_comparison(pg_value, rg_value)
                ? "correct"
                : "incorrect";
            box_text = pg_value;
        } else if (type == "list") {
            let compare_val = list_comparison(pg_value, rg_value);
            if (compare_val == 0) {
                box_class = "incorrect";
            } else if (compare_val == 1) {
                box_class = "partial";
            } else {
                box_class = "correct";
            }
            box_text = pg_value.join(", ");
        } else {
            let compare_val = num_comparison(pg_value, rg_value);
            box_class = "incorrect";
            if (name == "") {
                box_text = pg_value;
            } else {
                box_text = name;
            }

            if (compare_val == 0) {
                box_text = "▲ " + box_text;
            } else if (compare_val == 1) {
                box_text = "▼ " + box_text;
            } else {
                box_class = "correct";
            }
        }

        return [box_class, box_text];
    };
    //types are string, list and num
    let box_text = "";
    let box_class = "";

    let { pg_stat, rg_stat, i } = $props();

    let arr = [];

    if (typeof pg_stat == "number") {
        if (typeof rg_stat != "number") {
            arr = ["incorrect", pg_stat];
        } else {
            arr = get_class_and_text("num", pg_stat, rg_stat);
        }
    } else if (typeof pg_stat == "string") {
        arr = get_class_and_text("str", pg_stat, rg_stat);
    } else if (Array.isArray(pg_stat)) {
        arr = get_class_and_text("list", pg_stat, rg_stat);
    } else {
        arr = get_class_and_text(
            "num",
            pg_stat["val"],
            rg_stat["val"],
            pg_stat["name"],
        );
    }

    if (pg_stat) box_class = arr[0];
    box_text = arr[1];

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

    async function juh(i) {
        return await sleep(i * 250 + 250);
    }
    let loading = juh(i);
</script>

{#await loading}
    <div></div>
{:then}
    <div class="{box_class} color-box fade-in">
        <span class="color-box-text">{box_text}</span>
    </div>
{/await}
