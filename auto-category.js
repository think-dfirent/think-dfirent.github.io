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


            if (!fs.existsSync(categoryPath)) {
                const label = formatLabel(file);

                const categoryData = {
                    label: label,
                    link: {
                        type: "generated-index",
                        description: `All documentation for ${label}`
                    }
                };

                fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2));
                console.log(`[+] Auto-generated _category_.json for: ${fullPath}`);
            }

            generateCategories(fullPath);
        }
    });
}

generateCategories('./docs');