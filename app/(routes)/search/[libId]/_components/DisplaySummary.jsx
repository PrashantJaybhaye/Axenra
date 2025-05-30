import React from "react";
import ReactMarkDown from "react-markdown";

function DisplaySummary({ aiResp }) {
  return (
    <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-full -ml-2 sm:-ml-6 mt-4">
      {!aiResp && (
        <div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-full h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-4"></div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-1/2 h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-2"></div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-[70%] h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-2"></div>
        </div>
      )}
      <ReactMarkDown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl sm:text-4xl font-bold text-orange-300 mb-4 leading-snug break-words"
              {...props}
            />
          ),

          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl sm:text-3xl font-semibold text-orange-200 mb-3 leading-snug break-words"
              {...props}
            />
          ),

          h3: ({ node, ...props }) => (
            <h3
              className="text-xl sm:text-2xl font-semibold text-orange-100 mt-4 mb-2 leading-tight break-words"
              {...props}
            />
          ),

          p: ({ node, ...props }) => (
            <p
              className="text-gray-200 leading-relaxed mb-4 break-words"
              {...props}
            />
          ),

          a: ({ node, ...props }) => (
            <a
              className="text-orange-400 underline hover:text-orange-200 transition-colors"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),

          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside space-y-2 leading-relaxed pl-3"
              {...props}
            />
          ),

          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-2 leading-relaxed pl-3"
              {...props}
            />
          ),

          li: ({ node, ...props }) => <li className="mb-1" {...props} />,

          blockquote: ({ node, ...props }) => (
            <blockquote
              className="bg-gray-800 border-l-4 border-orange-700 p-4 rounded-lg text-gray-200 leading-relaxed mb-6"
              {...props}
            />
          ),

          // Table Styling

          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="table-auto w-full text-sm text-gray-200 border-collapse border border-gray-700"
                {...props}
              />
            </div>
          ),

          th: ({ node, ...props }) => (
            <th
              className="border border-gray-700 px-4 py-2 bg-gray-800 text-left text-gray-100"
              {...props}
            />
          ),

          td: ({ node, ...props }) => (
            <td className="border border-gray-700 px-4 py-2" {...props} />
          ),

          // Code Block Styling with Syntax Highlighter

          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <div className="my-4 rounded-md overflow-auto bg-gray-900">
                <SyntaxHighlighter
                  style={okaidia}
                  language={match[1]}
                  PreTag="div"
                  className="!bg-transparent"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-800 text-pink-300 px-1.5 py-0.5 rounded-md font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {aiResp}
      </ReactMarkDown>
    </div>
  );
}

export default DisplaySummary;
