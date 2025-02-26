// components
import SideMenu from "@components/app/SideMenu";

const SIDE_MENU_WIDTH_PX = 180;

export default function Layout({ children }) {
  return (
    <main>
      <SideMenu width={SIDE_MENU_WIDTH_PX} />
      <section
        style={{
          marginLeft: `${SIDE_MENU_WIDTH_PX}px`,
        }}
      >
        {children}
      </section>
    </main>
  );
}
