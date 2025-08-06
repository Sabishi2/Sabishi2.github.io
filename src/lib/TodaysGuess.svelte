<script module>
    const generateHash = (string, amount) => {
        let hash = 0;
        for (const char of string) {
            hash = (hash << 5) - hash + char.charCodeAt(0);
            hash |= 0; // Constrain to 32bit integer
        }

        return hash;
    };

    export const getCharacter = (date, amount_of_chars) => {
        const daynames = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        let hashable =
            date.getYear().toString() +
            date.getMonth().toString() +
            daynames[date.getDay()];
        let final_hash = "";
        while (amount_of_chars * 2 > final_hash.length - 1) {
            console.log;
            final_hash = final_hash + hashable;
        }

        let hashed = generateHash(final_hash, amount_of_chars);
        hashed = hashed % amount_of_chars;
        if (hashed < 0) {
            return hashed * -1;
        }

        return hashed;
    };
</script>
