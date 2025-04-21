import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
    const url = 'https://official-joke-api.appspot.com/random_joke';

    const request = https.get(url, (response) => {
        let data = "";
        
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        response.on('end', () => {
            try {
                const joke = JSON.parse(data);
                console.log(`Here is a random ${joke.type} joke`);
                console.log(chalk.red.bgGreen.bold(`${joke.setup}`));
                console.log(chalk.blue.bgRed.bold(`${joke.punchline}`));
            } catch (err) {
                console.error(chalk.red('Error parsing joke data:'), err);
            }
        });
    });

    request.on('error', (err) => {
        console.error(chalk.red('Error fetching joke:'), err);
    });
}
getJoke();