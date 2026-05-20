interface RightPictureArticleProps {
  header?: string
  paragraph: string
  src: string
}

export const RightPictureArticle = ({ header, paragraph, src }: RightPictureArticleProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center">
        {header && <h3 className="text-2xl font-medium text-center sm:text-start">{header}</h3>}
        <p className="text-xl text-center sm:text-start">{paragraph}</p>
      </div>
      <div className="sm:hidden my-3" />
      <div className="flex justify-center items-center px-10">
        <img src={src} alt="" width={300} />
      </div>
    </div>
  )
}
