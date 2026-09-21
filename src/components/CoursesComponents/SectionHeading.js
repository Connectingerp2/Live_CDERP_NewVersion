export default function SectionHeading({ title, description, titleHtml }) {
  return (
    <div className="text-center mb-4 sm:mb-14 md:mb-16">
      <div className="relative z-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
          {titleHtml ? (
            <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
          ) : (
            title
          )}
        </h2>
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
        {description ? (
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
