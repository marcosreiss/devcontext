// src/components/markdown-viewer.tsx
"use client";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
    content: string;
}

export function MarkdownViewer({
    content,
}: Props) {
    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const {
                            children,
                            className,
                        } = props;

                        const match =
                            /language-(\w+)/.exec(
                                className || ""
                            );

                        return match ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(
                                    /\n$/,
                                    ""
                                )}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}