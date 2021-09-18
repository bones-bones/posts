import { Post } from './types';
import { TextEncoder } from 'util';

export const formatPostEntry = ({ title, date, themes, threads }: Post) => {
    let postEntry = `<a href="./post/${date}.html"><h3>${title}</h3></a>`;
    if (themes.length > 0) {
        const themeLine = `<div>themes: ${themes.join(', ')}</div>`;
        postEntry += themeLine;
    }

    if (threads.length > 0 && threads[0] !== '') {
        const threadLine = `<div>threads: ${threads
            .map((entry) => {
                const threadColor = parseInt(
                    new TextEncoder().encode(entry + '12345').join('')
                )
                    .toString(16)
                    .slice(0, 6);

                return `
            <div style="height:10px; width:10px; background-color:#${threadColor}; display:inline-block;"></div> ${entry}
            `;
            })
            .join(', ')}</div>`;

        postEntry += threadLine;
    }

    return postEntry;
};
