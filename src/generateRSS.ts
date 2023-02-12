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
    </item>`;
};

export const getFeed = (val: string, channel: ChannelDefinition) => {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>${channel.title}</title>
        <link>${channel.link}</link>
        <description>${channel.description}</description>
        <lastBuildDate>${channel.lastBuildDate}</lastBuildDate>
        ${val}
    </channel>
</rss>
`;
};
