<script module>
    const generateHash = (string) => {
        let hash = 0;
        for (const char of string) {
            hash = (hash << 5) - hash + char.charCodeAt(0);
            hash |= 0; // Constrain to 32bit integer
        }
        return hash;
    };

    export const getCharacter = (date, amount_of_chars) => {
        let hashable = date.getYear() + date.getMonth() + date.getDay();
        let hashed = generateHash(hashable.toString());
        hashed = hashed % amount_of_chars;
        return hashed;
    };
</script>
