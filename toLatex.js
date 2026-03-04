///////////////////////////////////////////////////////////////////////////////
// AI GENERATED SCRIPT FOR QUICK MARKDOWN EXTRACTION.
// IT IS NOT GUARANTEED THAT THE SCRIPT WILL WORK FOR EVERY CASE FROM DESMOS
// BUT I ONLY NEED APPROXIMATE CORRECTNESS.
///////////////////////////////////////////////////////////////////////////////
const fs = require("fs");
const path = require("path");

// Get file path from command line arguments
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node desmos2md.js <path-to-json-file>");
  process.exit(1);
}

try {
  const absolutePath = path.resolve(inputPath);
  const fileNameNoExt = path.basename(absolutePath, path.extname(absolutePath));
  const outputDir = path.dirname(absolutePath);

  // Output file matches input name: e.g., "matrix_logic.json" -> "matrix_logic.md"
  const outputPath = path.join(outputDir, `${fileNameNoExt}.md`);

  const data = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  const expressions = data.expressions.list;

  // Header matches the filename
  let markdownContent = `# ${fileNameNoExt}\n\n`;
  markdownContent += `> **Random Seed:** \`${data.randomSeed}\`\n\n`;

  expressions.forEach((item) => {
    if (item.type === "text") {
      markdownContent += `\n${item.text}\n\n`;
    } else if (item.type === "expression" && item.latex) {
      markdownContent += `$$\n${item.latex}\n$$\n`;

      if (item.label) {
        markdownContent += `*Label: ${item.label}*\n\n`;
      }
    }
  });

  fs.writeFileSync(outputPath, markdownContent);
  console.log(`Successfully created: ${outputPath}`);
} catch (err) {
  console.error("Error processing file:", err.message);
}
