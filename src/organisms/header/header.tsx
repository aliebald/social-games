import styles from "./header.module.css";
import HeaderLink from "@/atoms/headerLink/headerLink";
import Sheet from "@mui/joy/Sheet/Sheet";

export default function Header() {
  return (
    <Sheet
      variant="soft"
      color="neutral"
      component="nav"
      invertedColors
      sx={{ p: 2, width: "100%" }}
    >
      <ul className={styles.navList}>
        <li>
          <HeaderLink href="/" label="Home" />
        </li>
        <li className={styles.mlAuto}>
          <HeaderLink href="/login" label="Login" />
        </li>
      </ul>
    </Sheet>
  );
}
