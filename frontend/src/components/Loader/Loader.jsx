import { useAtom } from "jotai";
import { isLoadingAtom } from "../../stateManager/atom";
import { SyncLoader } from "react-spinners";

export const Loader = () => {
  const [isLoading] = useAtom(isLoadingAtom);

  if (!isLoading) return null;

  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <SyncLoader color="#fc003e" size={15} />
        <p>Caricamento in corso</p>
      </div>
    </div>
  );
};
