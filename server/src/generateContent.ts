
import fs from 'fs';
import { formatPostEntry } from './formatPostEntry';
import { formatPostContent } from './formatPost';
import { headerFormatting } from './styles';

const textPosts = fs.readdirSync('textPosts').sort((a, b) => a > b ? -1 : 1);
console.log(textPosts)
const entries = []
const headline = `<h1>Postings</h1>`


for (const textPost of textPosts) {
    const fileContent = fs.readFileSync('textPosts/' + textPost, 'utf8');
    const splitContent = fileContent.split('\n');
    const title = splitContent.shift()!;
    const date = splitContent.shift()!;
    const themes = splitContent.shift()!.split(', ');
    const threads = splitContent.shift()!.split(', ');
    const content = splitContent.join('\n');
    const postEntryData = formatPostEntry({ title, themes, threads, content, date })

    entries.push(postEntryData)


    const postContentData = formatPostContent({ title, themes, threads, content, date });

    fs.writeFileSync('./dist/gend/post/' + date + '.html', `
    <html>
        ${ headerFormatting()}
        <body>
            <div>
                ${ headline}
                ${ postContentData}
            </div>
        </body>
    </html>`)
}

export interface Post {
    title: string,
    content: string,
    date: string,
    themes: string[],
    threads: string[]
}




fs.writeFileSync('./dist/gend/' + 'index.html', `
    <html>
        ${headerFormatting()}
        <body>
            <div>
                ${headline}
                ${entries.join('\n')}
            </div>
        </body>
    </html>`)
