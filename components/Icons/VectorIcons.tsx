// @ts-ignore
import Construction from "@/assets/icons/vectors/construction";

enum IconType {
  construction = "construction",
}

export default function VectorIcons({
  size,
  icon,
}: {
  size: number;
  icon: string;
}) {
  if (icon === IconType.construction) {
    return <Construction width={size} height={size} />;
  }
}
