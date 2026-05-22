const { execSync } = require('child_process');
require('dotenv').config();

const token = process.env.NOTION_TOKEN;

if (!token) {
  console.error("Error: NOTION_TOKEN is not set in .env file. Please add it as NOTION_TOKEN=secret_...");
  process.exit(1);
}

const target = process.argv[2];

const commands = {
  homelab: `npx @sillsdev/docu-notion -n ${token} -r 33f7b0eb61a480f394f7df72c64733b1 -m ./docs/homelab`,
  writeups: `npx @sillsdev/docu-notion -n ${token} -r 3447b0eb61a480a9937bf0bb68dc7181 -m ./docs/writeups`,
  cheatsheets: `npx @sillsdev/docu-notion -n ${token} -r 3557b0eb61a480eaab70d8bb3f5d1247 -m ./docs/cheatsheets`,
  sec: `npx @sillsdev/docu-notion -n ${token} -r 27a7b0eb61a480379607d242bd723edd -m ./docs/others/CompTIA-Sec`,
};

try {
  if (target && commands[target]) {
    console.log(`Syncing ${target}...`);
    execSync(commands[target], { stdio: 'inherit' });
  } else if (!target) {
    console.log("No specific target provided, syncing all...");
    for (const [name, cmd] of Object.entries(commands)) {
      console.log(`Syncing ${name}...`);
      execSync(cmd, { stdio: 'inherit' });
    }
  } else {
    console.error(`Error: Unknown target '${target}'`);
    console.error(`Available targets: ${Object.keys(commands).join(', ')}`);
    process.exit(1);
  }

  console.log("Running post-sync optimization (categories and tags)...");
  execSync('node auto-category.js', { stdio: 'inherit' });
  execSync('node add-tags.js', { stdio: 'inherit' });

  console.log("Sync completed successfully!");
} catch (error) {
  console.error("Sync failed!");
  process.exit(1);
}
