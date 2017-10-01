export let loadClock = (name) =>
    fetch(`/faces/${name}.json`)
        .then(r => r.json())