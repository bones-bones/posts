import { Post } from './types';

export const postTextToObject = (value: string) => {
    const splitContent = value.split('\n');

    const title = splitContent.shift()!;
    const date = splitContent.shift()!;
    const themes = splitContent
        .shift()!
        .split(', ')
        .filter((entry) => entry !== '');

    const content = splitContent.join('\n');

    return { title, date, themes, content } as Post;
};
