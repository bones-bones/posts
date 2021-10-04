import { wrapInSiteMapStructure } from './wrapInSiteMapStructure';

export const generateSiteMap = (root: string, pages: string[]) =>
    wrapInSiteMapStructure(
        pages
            .map((entry) => root + '/' + entry)
            .map(
                (entry) =>
                    `
        <url>
            <loc>${entry}</loc>
        </url>`
            )
            .join('\n')
    );
