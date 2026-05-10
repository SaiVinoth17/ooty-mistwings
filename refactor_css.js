const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('./src', function(filePath) {
    if (filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let newContent;
        if (filePath.endsWith('globals.css')) {
            // Replace @media (prefers-color-scheme: dark) { ... } with [data-theme="dark"] { ... }
            newContent = content.replace(/@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{([\s\S]*?)\n\}/g, '[data-theme="dark"] {$1\n}');
        } else {
            // Replace @media (prefers-color-scheme: dark) { .class { ... } } with :global([data-theme="dark"]) .class { ... }
            newContent = content.replace(/@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{\s*([\s\S]*?)\n\}/g, (match, innerContent) => {
                // innerContent is like: \n  .header.scrolled {\n    ... \n  }
                // we want to prepend :global([data-theme="dark"]) to every top-level selector in innerContent
                
                let lines = innerContent.split('\n');
                let replaced = [];
                for(let line of lines) {
                    if (line.match(/^\s*\.[a-zA-Z0-9_-]+/)) {
                        replaced.push(line.replace(/^\s*(\.[a-zA-Z0-9_-]+.*)\s*\{/, ':global([data-theme="dark"]) $1 {'));
                    } else {
                        replaced.push(line);
                    }
                }
                return replaced.join('\n');
            });
        }
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
