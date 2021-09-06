import styled from '@emotion/styled';
import React from 'react';

export const ContentRenderer = ({
    content,
    postId,
}: {
    content: string;
    postId: string;
}) => {
    const splitString = content
        .split(/(!!)|(\^\^)|(\n)/g)
        .filter((entry) => entry !== undefined);
    const renderPieces = [];
    const footNotes = [];
    let i = 0;
    let footnoteCount = 0;
    while (i < splitString.length) {
        switch (splitString[i]) {
            case '!!': {
                renderPieces.push(
                    <a
                        target="_blank"
                        href={splitString[i + 3]}
                        rel="noreferrer"
                    >
                        {splitString[i + 1]}
                    </a>
                );
                i += 5;
                break;
            }
            case '\n': {
                renderPieces.push(
                    <>
                        <br />
                        <br />
                    </>
                );
                i++;
                break;
            }
            case '^^': {
                const footNoteSymbol = getFootnoteSymbol(footnoteCount);
                renderPieces.push(
                    <FootnoteAnchorTag
                        id={footNoteSymbol + postId + '-back'}
                        href={'#' + footNoteSymbol + postId + '-there'}
                    >
                        {footNoteSymbol}
                    </FootnoteAnchorTag>
                );
                footNotes.push(
                    <div id={footNoteSymbol + postId}>
                        <FootnoteAnchorTag
                            id={footNoteSymbol + postId + '-there'}
                            href={'#' + footNoteSymbol + postId + '-back'}
                        >
                            {footNoteSymbol}
                        </FootnoteAnchorTag>
                        <span> {splitString[i + 1]}</span>
                    </div>
                );
                footnoteCount++;
                i += 3;
                break;
            }
            default: {
                renderPieces.push(<span>{splitString[i]}</span>);
                i++;
            }
        }
    }

    return (
        <>
            {...renderPieces}
            <br />
            <br />
            <br />
            <br />
            <br />
            {...footNotes}
        </>
    );
};

const FootnoteAnchorTag = styled.a({
    textDecoration: 'none',
    fontWeight: 'bold',
});

const getFootnoteSymbol = (numberOfFootnotes: number) => {
    const mappings = {
        '0': '*',
        '1': '†',
        '2': '‡',
        '3': '§',
        '4': '¶',
        '5': '#',
        '6': '♠',
        '7': '♥',
        '8': '♦',
        '9': '♣',
    };
    return ('' + numberOfFootnotes)
        .split('')
        .map((entry) => (mappings as any)[entry])
        .join('');
};

//<ContentRenderer key={'hello wirld'} postId={'hello world'} content={`Firstly, !!archive.org!!https://archive.org!! is an absolute treasure. The modern day Library of Alexandria, except filled with absolute garbage^^Err, I did some reading and apparently the library of alexandria wasn't that discering either. But at least there wasn't hentai in it^^. Because of it's obsessive copying I was actually able to trawl back and find the website at the relavent point in time. And to learn that I actually didn't know what I was talking about. \n Humor is one of natures greatest achievements. Somehow our squishy lizard brains got wired in a way that being surprised can sometimes release dopamine and sometimes cortisol/adrenaline. Now I'm not an expert but Jerry Suls probably is. See also: !!The psychology of humor; theoretical perspectives and empirical issues!!https://archive.org/details/psychologyofhumo0000unse/page/n327/mode/2up!! His model of humor is the inconcruity model: humor exists when the mental model you have for something is different than the actual occurance. ie when you are surprised. Surrealist humor in particular relies on this surprise. The contrain nature or total aversion to the truth let's people get away with some very uh 'interesting' jokes. But it also leads to this absolute gem. Before I show you how it actually went, I'm going to tell my version of it. \n\n \tOkay, so there is this website called pidgeons and planes and while it now has headlines like \"André 3000 Releases Statement on Drake Leaking Kanye West Collab “Life of the Party”, it used to be a great music blog for tracks before they got big and featured incredible mixes. This was all great, but to me the best part of the site was the navigation boasting Home, About, Contact, Contests, Games, Mixes, Shirts, and Subscribe. They mostly do what they said on the box, except Games. When you clicked on it, you were taken to a page that said only \"We don't play no games here\". The setup, the double meaning of games, the unexpectedness of a joke in web design all solidified it as one of the most humorous things all ever see. \n\nSo I went back in the wayback machine and !!found it!!https: //web.archive.org/web/20110401225519/http://pigeonsandplanes.com!!. Turns out the menu item was actually Jokes and the page said \"Just kidding – we don’t do jokes here.\", which is also very, very good. But I like the way I remember it more. \n Side note: if anyone still has a copy of Pigeon and Planes' \"Awake In The Night\" they could send to bones.bones@skeleton.club, I would be eternally greatful, that mix was amazing.`} /
