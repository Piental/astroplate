import fs from "node:fs";

const JSON_FOLDER = "./.json";

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // Blog has been removed from this project
  // Creating empty JSON files to prevent build errors
  console.log("⚠️  Blog removed - creating empty search files");
  fs.writeFileSync(`${JSON_FOLDER}/posts.json`, JSON.stringify([]));
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify([]));
  console.log("✅ Empty search JSON files created");
} catch (err) {
  console.error(err);
}
