interface LeftPictureArticleProps {
  paragraph: string
  src: string
}

export const LeftPictureArticle = ({ paragraph, src }: LeftPictureArticleProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="hidden sm:flex justify-center items-center">
        <img src={src} alt="" width={300} />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xl text-center sm:text-start">{paragraph}</p>
      </div>
      <div className="sm:hidden my-3" />
      <div className="sm:hidden flex justify-center items-center px-10">
        <img src={src} alt="" width={300} />
      </div>
    </div>
  )
}
