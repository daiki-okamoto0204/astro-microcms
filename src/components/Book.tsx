interface Image {
    url: string;
    height: number;
    width: number;
}

interface Props {
    id: string;
    title: string;
    image: Image;
}
  
export const Book = ({ id, title, image }: Props) => (
    <a href={`/book/detail/${id}`} className="group">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
            src={image.url ?? ''}
            alt="Hand holding black machined steel mechanical pencil with brass tip and top."
            className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
        </p>
    </a>
);