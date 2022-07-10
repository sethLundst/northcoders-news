import "../styles/LoadingArticles.css";
import { VoteButtons } from ".";
import { DocumentIcon, MessageIcon } from "../icons";
import { useScreen } from "../contexts";

function LoadingArticles() {
  const { isGreaterThan992px } = useScreen();

  return isGreaterThan992px ? (
    <div className="arts-list">
      {[...Array(15)].map((_, index) => (
        <div className="arts-card" key={index}>
          <div className="arts-votes">
            <VoteButtons />
          </div>
          <div className="collapsible">
            <div className="clps-button">
              <DocumentIcon className="clps-icon"> </DocumentIcon>
            </div>
            <div className="animation"></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="arts-list">
      {[...Array(15)].map((_, index) => (
        <div className="arts-card" key={index}>
          <div className="arts-link ">
            <div className="animation" />
            <div className="animation"></div>
            <div className="arts-buttons">
              <div className="voting-box">
                <VoteButtons />
              </div>
              <div className="comment-box">
                <MessageIcon className="vote" />

                <div className="comment-count">
                  <div className="animation"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingArticles;
