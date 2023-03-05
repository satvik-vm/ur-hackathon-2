const deploy = require("./deposit");

async function main() {
    const acc = await deploy.main();
    console.log(acc);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// module.exports = main;