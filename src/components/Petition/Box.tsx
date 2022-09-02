import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  altImage: string;
  width: number;
  height: number;
  htmlText: any;
  path?: string;
}

export default function PetitionBox({
  image,
  altImage,
  width,
  height,
  htmlText,
  path = "/petition",
}: Props) {
  return (
    <Link href={path}>
      <a className="grid grid-cols-2 bg-primary-white rounded-3xl h-[9.375rem] cursor-pointer overflow-hidden shadow-3xl hover:shadow-4xl active:shadow-3xl">
        <div className="col-span-1 justify-self-center items-center">
          <Image
            src={image}
            alt={altImage}
            width={width}
            height={height}
            objectFit="contain"
          />
        </div>
        <div className="col-span-1 self-center">{htmlText}</div>
      </a>
    </Link>
  );
}
