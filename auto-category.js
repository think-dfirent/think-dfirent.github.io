const fs = require('fs');
const path = require('path');


function formatLabel(folderName) {
    const words = folderName.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function generateCategories(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            const categoryPath = path.join(fullPath, '_category_.json');

            const label = formatLabel(file);
            let categoryData = {};
            let modified = false;

            if (fs.existsSync(categoryPath)) {
                try {
                    categoryData = JSON.parse(fs.readFileSync(categoryPath, 'utf8'));
                } catch (e) {
                    console.error(`[-] Error parsing ${categoryPath}`);
                }
            } else {
                modified = true;
            }

            if (!categoryData.label) {
                categoryData.label = label;
                modified = true;
            }

            if (!categoryData.link) {
                categoryData.link = {
                    type: "generated-index",
                    description: `All documentation for ${categoryData.label}`
                };
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2));
                console.log(`[+] Auto-generated/updated _category_.json for: ${fullPath}`);
            }
            generateCategories(fullPath);
        }
    });
}

generateCategories('./docs');