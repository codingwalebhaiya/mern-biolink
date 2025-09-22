import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";


const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]); // should be an array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useAuth();

  // const addLinks = async (linkData) => {
  //   try {
  //     setError(null);
  //     setLoading(true);
  //     const res = await API.post("/links", linkData);
  //     setLinks((prev) => [...prev, res.data.link]); // add new link to list
  //     return { success: true };
  //   } catch (err) {
  //     setError(err.response?.data?.error || "Failed to add link");
  //     toast.error(err.response?.data?.error || "Failed to add link");
  //     return { success: false, error: err.response?.data?.error };
  //   } finally {
  //     setLoading(false);
  //   }
  // };


   const addLinks = useCallback(async (linkData)=>{
    try {
      setError(null);
      setLoading(true);
      const res = await API.post("/links", linkData);
      setLinks((prev) => [...prev, res.data.link]); // add new link to list
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add link");
      toast.error(err.response?.data?.error || "Failed to add link");
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  }, [])

  const updateLinks = async (linkId, linkData) => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.put(`/links/${linkId}`, linkData);
      const updatedLink = res.data.link;
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link._id === linkId ? updatedLink : link))
      );
       toast.success("Link updated successfully");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update link");
      toast.error(err.response?.data?.error || "Failed to update link");
      return { success: false, error: err.response?.data?.error };
    }
  };

  const getLinks = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.get("/links");
      setLinks(res.data.links);
      return { success: true };
    } catch (err) {
     // toast.error(err.response?.data?.error || "Failed to fetch link");
      setError(err.response?.data?.error || "Failed to fetch link");
      return { success: false, error: err.response?.data?.error };
    }
  }, []);

  const deleteLinks = async (linkId) => {
    try {
      setError(null);
      setLoading(true);
      await API.delete(`/links/${linkId}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
      toast.success("Link deleted successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete link");
      toast.error(err.response?.data?.error || "Failed to delete link");
      return { success: false, error: err.response?.data?.error };
    }
  };

  useEffect(() => {
     // if token exists, fetch; else clear
    if (token) {
      getLinks();
    } else {
      setLinks([]); // clear links on logout/when no token
    }
  }, [token]); // added user to refetch links on user change

  const value = {
    links,
    addLinks,
    getLinks,
    updateLinks,
    deleteLinks,
    error,
    loading,
  };

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
};

export default LinkContext;
