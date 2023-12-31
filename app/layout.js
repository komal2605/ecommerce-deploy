import ThemeRegistry from "@/Theme/ThemeRegistry";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "@/GlobalRedux/provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
