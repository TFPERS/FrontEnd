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
      <a className="grid grid-cols-2 bg-primary-white rounded-3xl w-[37.5rem] h-[9.375rem] cursor-pointer overflow-hidden">
        <div className="col-span-1 justify-self-center">
          <Image src={image} alt={altImage} width={width} height={height} />
        </div>
        <div className="col-span-1 self-center">{htmlText}</div>
      </a>
    </Link>
  );
}
