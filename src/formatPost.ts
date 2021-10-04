import { Post } from './types';
import { getFootnoteSymbol } from './footnotes';

export const formatPostContent = ({
    title,
    date,
    themes,
    threads,
    content,
}: Post) => {
    let postEntry = `<h3>${title}</h3>`;
    postEntry += `<div>
    `;

    let transformedContent = content.replace(/\n/g, '<br></br>');
    transformedContent = transformedContent.replace(
        /!!(.+?)!!((https|mailto):.+?)!!/g,
        '<a href="$2" target="_blank">$1</a>'
    );

    transformedContent = transformedContent.replace(
        /__(.+?)__/g,
        '<i>$1</i>'
    );

    transformedContent = transformedContent.replace(
        /^# (.*)$/g,
        '<h2>$1</ih2>'
    );

    const footnoteProcessingParts = [
        ...transformedContent.matchAll(/\^\^(.+?)\^\^/g),
    ];
    const trackedFootNotes = [];

    if (footnoteProcessingParts.length > 0) {
        for (let i = 0; i < footnoteProcessingParts.length; i++) {
            const linkId = `fn-link-${i}`;
            const footnoteId = `fn-${i}`;
            const footnoteSymbol = getFootnoteSymbol(
                i
            )

            transformedContent = transformedContent.replace(
                footnoteProcessingParts[i][0],
                `<a href="#${footnoteId}" id="${linkId}">${footnoteSymbol}</a>`
            );
            trackedFootNotes.push(footnoteProcessingParts[i][1]);
        }
    }

    postEntry +=
        transformedContent +
        `
    </div>`;

    if (trackedFootNotes.length > 0) {
        const footnoteSection = `
        <br></br>
        <br></br>
        <h4>Footnotes</h4>
        <div>
            ${trackedFootNotes
                .map((entry, index) => {
                    const linkId = `fn-link-${index}`;
                    const footnoteId = `fn-${index}`;

                    return `
                    <div>
                        <a href="#${linkId}" id="${footnoteId}">${getFootnoteSymbol(
                        index
                    )}</a> ${entry}
                    </div>`;
                })
                .join('<br></br>')}
        </div>`;

        postEntry += footnoteSection;
    }

    return postEntry;
};
