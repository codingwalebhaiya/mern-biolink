import { useState } from "react";
import useLink from "../hooks/useLink";
import AddLinkForm from "../components/links/AddLinkForm";
import LinkItem from "../components/links/LinkItem";


const Links = () => {
  const { links } = useLink();
  const [isAdding, setIsAdding] = useState(false);

  if (!links) return <div>No links are available ...</div>;

  return (
    <div className="links-container">
      <div className="links-header">
        <h2>Your Links</h2>
        <div className="links-actions">
          <button onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? "Cancel" : "Add Link"}
          </button>
        </div>
      </div>

      {isAdding && <AddLinkForm onCancel={() => setIsAdding(false)} />}

       <div className="links-list">
        {!links || links.length === 0 ? (
          <div className="no-links">You haven't added any links yet</div>
        ) : (
          links.map((link) => (
            <LinkItem key={link._id || link.id  } link={link} />
          ))
        )}
      </div>  
    </div>
  );
};

export default Links;
