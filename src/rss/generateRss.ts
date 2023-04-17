export type ChannelDefinition = {
    description: string;
    image?: string;
    lastBuildDate: string;
    link: string; // self ref
    title: string;
};

export type ItemDefinition = {
    category: string;
    description: string;
    enclosure?: unknown;
    guid?: string;
    link: string;
    pubDate: string;
    title: string;
};

export const getItem = (data: ItemDefinition) => {
    return `<item>
        <title>${data.title}</title>
        <category>${data.category}</category>
        <link>${data.link}</link>
        <pubDate>${data.pubDate}</pubDate>
        <description>${data.description.slice(0, 250)}</description>
        <guid>${data.guid}</guid>
    </item>`;
};

export const getFeed = (val: string, channel: ChannelDefinition) => {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${channel.title}</title>
        <link>${channel.link}</link>
        <description>${channel.description}</description>
        <lastBuildDate>${channel.lastBuildDate}</lastBuildDate>
        <atom:link href="${channel.link}/feed.xml" rel="self" type="application/rss+xml" />
        ${val}
    </channel>
</rss>
`;
};

export const generateRss = (
    posts: ItemDefinition[],
    channel: ChannelDefinition
) => {
    const postContent = posts.map(getItem).join(`
    `);
    return getFeed(postContent, channel);
};
