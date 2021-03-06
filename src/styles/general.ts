export const getStyle = () =>
    `<style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: larger;
        }
        html {
            scroll-behavior: smooth;
        }
    </style>`;

export const headerFormatting = (metadata: string, title: string) =>
    `<title>${title}</title>
    <head>
        ${getStyle()}
        ${metadata}
    </head>`;
