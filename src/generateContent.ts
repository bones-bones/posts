import fs from 'fs';
import { formatPostEntry } from './formatPostEntry';
import { formatPostContent } from './formatPost';
import { headerFormatting } from './styles';
import { POST_OUTPUT_PATH, OUTPUT_PATH } from './constants';
import { generateSiteMap } from './siteMap';

const textPosts = fs.readdirSync('textPosts').sort((a, b) => (a > b ? -1 : 1));

fs.mkdirSync(POST_OUTPUT_PATH, { recursive: true });

console.log(textPosts);
const entries = [];
const headline = `<h1><a href="https://skeleton.club/posts" style="color:black;">Postings</a></h1>`;

for (const textPost of textPosts) {
    const fileContent = fs.readFileSync('textPosts/' + textPost, 'utf8');
    const splitContent = fileContent.split('\n');
    const title = splitContent.shift()!;
    const date = splitContent.shift()!;
    const themes = splitContent.shift()!.split(', ').filter(entry => entry !== '');
    const threads = splitContent.shift()!.split(', ').filter(entry => entry !== '');
    const content = splitContent.join('\n');
    const postEntryData = formatPostEntry({
        title,
        themes,
        threads,
        content,
        date,
    });

    entries.push(postEntryData);

    const postContentData = formatPostContent({
        title,
        themes,
        threads,
        content,
        date,
    });

    console.log(threads)
    fs.writeFileSync(
        POST_OUTPUT_PATH + '/' + date + '.html',
        `
    <html>
        ${headerFormatting(
            `
        <meta property="og:title" content="${title}" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="${threads.length > 0 ? 'threads: ' + threads.join(', ') + '.' : ''
            }${themes.length > 0 ? 'themes: ' + themes.join(', ') : ''}" />
        <meta property="og:image" content="https://skeleton.club/logo192.png" />
        <link rel="icon" type="image/png" href="https://skeleton.club/Favicon.ico"></link>
        `,
            title
        )}
        <body>
            ${headline}
            <div style="display: flex; justify-content: center;">
                <div style="width: 90vw;">
                    ${postContentData}
                </div>
            </div>
        </body>
    </html>`
    );
}

fs.writeFileSync(
    OUTPUT_PATH + '/' + 'index.html',
    `
    <html>
        ${headerFormatting(
        `<link rel="icon" type="image/png" href="https://skeleton.club/Favicon.ico" />
            <meta property="og:title" content="Skeleton Club - Posts" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="A blog????." />
            <meta property="og:image" content="https://skeleton.club/logo192.png" />`,
        'Posts'
    )}
        <body>
            ${headline}
            <div style="display: flex; justify-content: center;">
                <div style="width: 90vw;">
                    ${entries.join('\n')}
                </div>
            </div>
        </body>
    </html>`
);

fs.writeFileSync(
    OUTPUT_PATH + '/' + 'siteMap.xml',
    generateSiteMap(
        'https://skeleton.club/posts/post',
        textPosts.map((entry) => entry.split(' ')[0] + '.html')
    )
);
