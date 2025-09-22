import { useContext } from "react";
import LinkContext from "../context/LinkContext";

const useLink = () => useContext(LinkContext);

export default useLink;
