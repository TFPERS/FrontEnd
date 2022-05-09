import Link from "next/link";

interface Props {
  text: string;
  color: string;
  path: string;
}

function Button({ text, color, path }: Props) {
  return (
    <>
      <Link href={path}>
        <a
          className={`${color} w-[11.875rem] h-[5rem] shadow-3xl flex items-center justify-center rounded-lg text-primary-white text-4xl font-black hover:shadow-4xl active:shadow-3xl`}
        >
          {text}
        </a>
      </Link>
    </>
  );
}

export default Button;
