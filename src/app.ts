import CLI from './cli';


const cli = new CLI({});

(async () => {
    const genres = await cli.getBookGenres();
    await cli.readLine(genres);
})();
