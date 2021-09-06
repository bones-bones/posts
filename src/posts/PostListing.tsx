import React from 'react';
import { PostTheme } from './types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export interface Props {
    title: string;
    date: string;
    themes: PostTheme[];
    threads: string[];
}

export const PostListing = ({
    item: { title, date, themes, threads },
}: {
    item: Props;
}) => {
    return (
        <div key={title}>
            <Link to={'/post/' + date}>
                <h3>{title}</h3>
            </Link>
            <div>
                {' '}
                <span>themes:</span> {themes.toString()}
                <div></div>
            </div>
            {threads && (
                <div>
                    threads:{' '}
                    {threads.map((entry) => {
                        return (
                            <>
                                <ThreadSpan
                                    key={entry}
                                    entryThread={entry}
                                ></ThreadSpan>{' '}
                                {entry}
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const ThreadSpan = styled.div(
    ({ entryThread }: { entryThread: string }) => ({
        backgroundColor:
            '#' +
            parseInt(new TextEncoder().encode(entryThread + '12345').join(''))
                .toString(16)
                .slice(0, 6),
        height: 10,
        width: 10,
        display: 'inline-block',
    })
);
