import { Link } from "@nextui-org/react";

function Brand() {
  return (
    <Link href="/">
      <p className="font-sans text-xl md:text-2xl tracking-wide font-semibold text-white">
        <span className="text-brandColor text-2xl md:text-3xl font-bold">
          M
        </span>
        oviever
      </p>
    </Link>
  );
}

export default Brand;
