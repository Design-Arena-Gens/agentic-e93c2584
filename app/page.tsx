import { CustomizerStoreProvider } from "@/lib/store-context";
import { Landing } from "@/components/landing";

export default function HomePage() {
  return (
    <CustomizerStoreProvider>
      <Landing />
    </CustomizerStoreProvider>
  );
}
