import fs from 'fs';
import { formatPostEntry } from './formatPostEntry';
import { formatPostContent } from './formatPost';
import { headerFormatting } from './styles';
import { POST_OUTPUT_PATH, OUTPUT_PATH } from './constants';
import { generateSiteMap } from './siteMap';
import { config } from 'dotenv';
import { JSDOM } from 'jsdom';
import { Post } from './types';

config();
const textPosts = fs.readdirSync('textPosts').sort((a, b) => (a > b ? -1 : 1));

fs.mkdirSync(POST_OUTPUT_PATH, { recursive: true });

const entries = [];
const headline = `<a style="color:black;" href="${process.env.ROOT_URL}">Home</a> // <h1 style="display: inline;"><a href="${process.env.ROOT_URL}/posts" style="color:black;">Posts</a></h1>`;

const postTextToObject = (value: string) => {
    const splitContent = value.split('\n');

    const title = splitContent.shift()!;
    const date = splitContent.shift()!;
    const themes = splitContent
        .shift()!
        .split(', ')
        .filter((entry) => entry !== '');
    const threads = splitContent
        .shift()!
        .split(', ')
        .filter((entry) => entry !== '');
    const content = splitContent.join('\n');

    return { title, date, themes, threads, content } as Post;
};

for (const textPost of textPosts) {
    const fileContent = fs.readFileSync('textPosts/' + textPost, 'utf8');
    const { title, themes, threads, content, date } =
        postTextToObject(fileContent);
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

    const plainTextDescription =
        new JSDOM('<!DOCTYPE html>' + postContentData).window.document.body
            .textContent || '';

    fs.writeFileSync(
        POST_OUTPUT_PATH + '/' + date + '.html',
        `
    <html>
        ${headerFormatting(
            `
        <meta property="og:title" content="${title}" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:description" content="${
            threads.length > 0 ? 'threads: ' + threads.join(', ') + '.' : ''
        }${
                themes.length > 0 ? 'themes: ' + themes.join(', ') : ''
            } -  ${plainTextDescription.substring(0, 200)}..." />
        <meta property="og:image" content="${
            process.env.ROOT_URL
        }/posts/posts.png" />
        <meta name="twitter:image" content="${
            process.env.ROOT_URL
        }/posts/posts.png"/>
        <link rel="icon" type="image/png" href="${
            process.env.ROOT_URL
        }/Favicon.ico"></link>
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
    OUTPUT_PATH + '/index.html',
    `
    <html>
        ${headerFormatting(
            `<link rel="icon" type="image/png" href="${process.env.ROOT_URL}/Favicon.ico" />
            <meta property="og:title" content="${process.env.SITE_TITLE}" />
            <meta property="og:type" content="website" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta property="og:description" content="A blog????." />
            <meta property="og:image" content="${process.env.ROOT_URL}/logo192.png" />`,
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
        `${process.env.ROOT_URL}/posts/post`,
        textPosts.map((entry) => entry.split(' ')[0] + '.html')
    )
);
